import sys
import asyncio
import re
import json
import os
import logging
import ast
from typing import Callable
from types import SimpleNamespace

from fastapi import FastAPI, Request, Depends, Form
from fastapi.responses import HTMLResponse, JSONResponse, StreamingResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi_babel import Babel, BabelConfigs, BabelMiddleware
from starlette.middleware.base import BaseHTTPMiddleware

from babel.support import Translations

# Import custom functions
from tools.generate_loading import (
    generate_thinking_process_prompts_read,
    generate_thinking_process_prompts_verify,
    generate_thinking_process_prompts_search,
    ThoughtProcessResponse
)

# ============================
# 1. Configure Event Loop Policy
# ============================

if sys.platform == 'win32':
    asyncio.set_event_loop_policy(asyncio.WindowsProactorEventLoopPolicy())

# ============================
# 2. Configure Logging
# ============================

# Create a custom logger
logger = logging.getLogger("fastapi_app")
logger.setLevel(logging.DEBUG)  # Set to DEBUG to capture all levels of log messages

# Create handlers
console_handler = logging.StreamHandler(sys.stdout)
console_handler.setLevel(logging.DEBUG)

# Ensure the 'logs' directory exists
os.makedirs('logs', exist_ok=True)

file_handler = logging.FileHandler('logs/app.log')
file_handler.setLevel(logging.DEBUG)

# Create formatter and add it to handlers
formatter = logging.Formatter(
    "%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S"
)
console_handler.setFormatter(formatter)
file_handler.setFormatter(formatter)

# Add handlers to the logger
logger.addHandler(console_handler)
logger.addHandler(file_handler)

# Log that logging is configured
logger.debug("Logging is configured and ready.")

# ============================
# 3. Initialize FastAPI App
# ============================

app = FastAPI()

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")
logger.debug("Mounted static files at '/static'.")

# Configure templates
templates = Jinja2Templates(directory="templates")
logger.debug("Configured Jinja2 templates.")

# ============================
# 4. Configure FastAPI-Babel
# ============================
# Adjust ROOT_DIR to ricertai folder
ROOT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'ricertai')

babel_configs = BabelConfigs(
    ROOT_DIR=ROOT_DIR,
    BABEL_DEFAULT_LOCALE='en',  # Default language
    BABEL_TRANSLATION_DIRECTORY='translations',  # Directory for translation files
    BABEL_DOMAIN='messages'  # Domain for translation files
)

# Add Babel middleware
app.add_middleware(BabelMiddleware, babel_configs=babel_configs)
logger.debug("Added BabelMiddleware.")

babel = Babel(babel_configs)
logger.debug("Initialized Babel.")

# ============================
# 5. Translation Functions
# ============================

def get_locale(request: Request) -> str:
    """
    Function to select the language based on the 'language' cookie.
    Returns 'en' if the cookie is not set.
    """
    locale = request.cookies.get('language', babel_configs.BABEL_DEFAULT_LOCALE)
    logger.debug(f"Detected locale: {locale}")
    return locale

def get_translations(request: Request) -> Translations:
    """
    Loads translations based on the selected locale.
    """
    locale = get_locale(request)
    translations = Translations.load(
        babel_configs.BABEL_TRANSLATION_DIRECTORY,  # Base directory for translations
        [locale]  # List of languages
    )
    logger.debug(f"Loaded translations for locale: {locale}")
    return translations

def _(text: str, request: Request) -> str:
    """
    Function to translate text.
    """
    translations = get_translations(request)
    translated_text = translations.gettext(text)
    logger.debug(f"Translating text: '{text}' -> '{translated_text}'")
    return translated_text

def _l(text: str, request: Request) -> Callable[[], str]:
    """
    Lazy translation function.
    """
    translations = get_translations(request)
    translated_text = translations.gettext(text)
    logger.debug(f"Lazy translating text: '{text}' -> '{translated_text}'")
    return lambda: translated_text

# ============================
# 6. Middleware to Set Locale in Request State
# ============================

class LocaleMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        # Set `get_locale` in request state
        request.state.get_locale = lambda: get_locale(request)
        logger.debug(f"LocaleMiddleware: Set locale for request to '{get_locale(request)}'")
        response = await call_next(request)
        return response

# Add LocaleMiddleware to the app
app.add_middleware(LocaleMiddleware)
logger.debug("Added LocaleMiddleware.")

# ============================
# 7. Route to Set Language
# ============================

@app.post('/set_language', response_class=HTMLResponse)
async def set_language(request: Request):
    """
    Route to set the user's preferred language.
    """
    logger.debug("Received POST request to '/set_language'.")
    try:
        form = await request.form()
        language = form.get('language', babel_configs.BABEL_DEFAULT_LOCALE)
        logger.debug(f"Language selected by user: {language}")
    except Exception as e:
        logger.error(f"Error processing form data: {e}")
        language = babel_configs.BABEL_DEFAULT_LOCALE
        logger.debug(f"Falling back to default language: {language}")

    # Retrieve the referer header
    referer = request.headers.get('referer')
    logger.debug(f"Referer header: {referer}")

    # Determine the redirect URL
    if referer:
        redirect_url = referer
        logger.debug(f"Redirecting to referer: {redirect_url}")
    else:
        redirect_url = '/'
        logger.debug("Referer not found. Redirecting to '/'.")

    # Create the RedirectResponse with status_code=303 to ensure GET method
    try:
        response = RedirectResponse(url=redirect_url, status_code=303)
        response.set_cookie('language', language)
        logger.debug(f"Set 'language' cookie to '{language}'. Redirecting with 303 status.")
        return response
    except Exception as e:
        logger.error(f"Error creating RedirectResponse: {e}")
        return JSONResponse(status_code=500, content={"detail": "Internal Server Error"})

# ============================
# 8. Helper Functions
# ============================

def remove_ansi_codes(text: str) -> str:
    """
    Removes ANSI codes from a string.
    """
    ansi_escape = re.compile(r'\x1B\[[0-9;]*[mGKH]')
    return ansi_escape.sub('', text)

def safe_parse_json(text: str):
    """
    Attempts to safely parse JSON.
    """
    try:
        return json.loads(text)
    except json.JSONDecodeError as e:
        logger.debug(f"Initial JSON parsing failed: {e}")
        json_start = text.find('{')
        if json_start != -1:
            text = text[json_start:]
            logger.debug("Removed initial characters before JSON object.")
        sanitized_text = text.replace('\n', ' ').replace('\r', ' ')
        logger.debug(f"Sanitized JSON text: {sanitized_text}")
        try:
            return json.loads(sanitized_text)
        except json.JSONDecodeError as e2:
            logger.debug(f"Sanitized JSON parsing failed: {e2}")
            try:
                return ast.literal_eval(sanitized_text)
            except (ValueError, SyntaxError) as e3:
                logger.debug(f"Literal eval parsing failed: {e3}")
                return None

# ============================
# 9. Include Custom Routes
# ============================

# Assuming you have routers defined in separate files
# Make sure to handle import errors if the routes do not exist

try:
    from routes.verify import router as verify_router
    app.include_router(verify_router)
    logger.debug("Included 'verify' router.")
except ImportError as e:
    logger.error(f"Failed to include 'verify' router: {e}")

try:
    from routes.topic_research import router as topic_research_router
    app.include_router(topic_research_router)
    logger.debug("Included 'topic_research' router.")
except ImportError as e:
    logger.error(f"Failed to include 'topic_research' router: {e}")

try:
    from routes.website_navigation import router as website_navigation_router
    app.include_router(website_navigation_router)
    logger.debug("Included 'website_navigation' router.")
except ImportError as e:
    logger.error(f"Failed to include 'website_navigation' router: {e}")

# ============================
# 10. Home Route
# ============================

@app.get("/", response_class=HTMLResponse)
async def get_home(request: Request):
    """
    Home route that renders the main page.
    Passes translation functions to the template.
    """
    try:
        locale = get_locale(request)
        logger.debug(f"Rendering home page with locale '{locale}'.")
        return templates.TemplateResponse("base.html", {
            "request": request,
            "_": lambda text: _(text, request),
            "_l": lambda text: _l(text, request),
            "locale": locale
        })
    except Exception as e:
        logger.error(f"Error rendering home page: {e}")
        return JSONResponse(status_code=500, content={"detail": "Internal Server Error"})

# ============================
# 11. Error Handlers
# ============================

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """
    Global exception handler to catch unhandled exceptions and log them.
    """
    logger.error(f"Unhandled exception: {exc}", exc_info=True)
    return JSONResponse(status_code=500, content={"detail": "Internal Server Error"})

