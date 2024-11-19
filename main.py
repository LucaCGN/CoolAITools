import sys
import asyncio

# ============================
# 1. Set Event Loop Policy
# ============================

if sys.platform == 'win32':
    asyncio.set_event_loop_policy(asyncio.WindowsProactorEventLoopPolicy())

# ============================
# 2. Import Modules
# ============================

import re
import json
import os
import logging
import ast
from typing import AsyncGenerator

from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, JSONResponse, StreamingResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

# Import the generate_thinking_process_prompts_verify function
from tools.generate_loading import (
    generate_thinking_process_prompts_read,
    generate_thinking_process_prompts_verify,
    generate_thinking_process_prompts_search,
    ThoughtProcessResponse
)

# ============================
# 3. Configure Logging
# ============================

# Set up logging with detailed format
logging.basicConfig(
    level=logging.DEBUG,  # Set to DEBUG for more detailed logs
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    handlers=[
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger("fastapi_app")

# ============================
# 4. Initialize FastAPI App
# ============================

app = FastAPI()

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# Set up templates
templates = Jinja2Templates(directory="templates")

# ============================
# 5. Helper Functions
# ============================

# Utility function to remove ANSI color codes
def remove_ansi_codes(text):
    ansi_escape = re.compile(r'\x1B\[[0-9;]*[mGKH]')
    return ansi_escape.sub('', text)

# Helper function to safely parse JSON with sanitization
def safe_parse_json(text):
    try:
        return json.loads(text)
    except json.JSONDecodeError as e:
        logger.debug(f"Initial JSON parsing failed: {e}")
        # Find the first '{' and extract JSON from there to remove leading characters like ':'
        json_start = text.find('{')
        if json_start != -1:
            text = text[json_start:]
            logger.debug("Stripped leading characters before JSON object.")
        # Replace unescaped newlines and carriage returns with space
        sanitized_text = text.replace('\n', ' ').replace('\r', ' ')
        logger.debug(f"Sanitized JSON text: {sanitized_text}")
        try:
            return json.loads(sanitized_text)
        except json.JSONDecodeError as e2:
            logger.debug(f"Sanitized JSON parsing failed: {e2}")
            # As a last resort, use ast.literal_eval
            try:
                return ast.literal_eval(sanitized_text)
            except (ValueError, SyntaxError) as e3:
                logger.debug(f"Literal eval parsing failed: {e3}")
                return None

# ============================
# 6. Include Routes
# ============================

from routes.verify import router as verify_router
from routes.topic_research import router as topic_research_router
from routes.website_navigation import router as website_navigation_router

app.include_router(verify_router)
app.include_router(topic_research_router)
app.include_router(website_navigation_router)

# ============================
# 7. Home Route
# ============================

@app.get("/", response_class=HTMLResponse)
async def get_home(request: Request):
    return templates.TemplateResponse("base.html", {"request": request})

