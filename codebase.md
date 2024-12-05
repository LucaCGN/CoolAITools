## base.html
```python
<!DOCTYPE html>


<html lang="{{ locale }}">
<head>
    <meta charset="UTF-8">
    <title>{{ _('🤖 Cool AI Tools - Simple AI for Everyone 🚀') }}</title>
    <script>
        window.translations = {
            "preparing_crew": "{{ _('Preparing crew...')|tojson }}",
            "error_empty_claim": "{{ _('Please enter a claim to verify.')|tojson }}",
            "error_preparing_crew": "{{ _('An error occurred while preparing the crew.')|tojson }}",
            "error_preparing_report": "{{ _('An error occurred while preparing the report.')|tojson }}",
            "preparing_report": "{{ _('Preparing report...')|tojson }}",
            "factuality_score": "{{ _('Factuality Score:')|tojson }}",
            "factuality_score_tooltip": "{{ _('A score that represents the strength of evidence supporting the claim.')|tojson }}",
            "strongly_supported": "{{ _('Strongly Supported')|tojson }}",
            "supported": "{{ _('Supported')|tojson }}",
            "neutral": "{{ _('Neutral')|tojson }}",
            "not_supported": "{{ _('Not Supported')|tojson }}",
            "reason": "{{ _('Reason')|tojson }}",
            "conclusion": "{{ _('Conclusion')|tojson }}",
            "references": "{{ _('References')|tojson }}",
            "all": "{{ _('All')|tojson }}",
            "supportive": "{{ _('Supportive')|tojson }}",
            "non_supportive": "{{ _('Non-Supportive')|tojson }}",
            "read_source": "{{ _('Read Source')|tojson }}",
            "download_report": "{{ _('Download Report')|tojson }}",
            "copy_to_clipboard": "{{ _('Copy to Clipboard')|tojson }}"
        };
    </script>
    <!-- Include Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&family=Raleway:wght@400;500;700&family=Montserrat:wght@700&display=swap" rel="stylesheet">

    <!-- Modular CSS Files -->
    <link rel="stylesheet" href="{{ url_for('static', path='css/general.css') }}">
    <link rel="stylesheet" href="{{ url_for('static', path='css/header_web.css') }}">
    <link rel="stylesheet" href="{{ url_for('static', path='css/header_mobile.css') }}">
    <link rel="stylesheet" href="{{ url_for('static', path='css/header_shared.css') }}">
    <link rel="stylesheet" href="{{ url_for('static', path='css/container.css') }}">
    <link rel="stylesheet" href="{{ url_for('static', path='css/footer.css') }}">

    <!-- Loading Styles -->
    <link rel="stylesheet" href="{{ url_for('static', path='css/loading.css') }}">
    <!-- Page-Specific Styles -->
    <link rel="stylesheet" href="{{ url_for('static', path='css/verify.css') }}">
    <link rel="stylesheet" href="{{ url_for('static', path='css/topic_research.css') }}">
    <link rel="stylesheet" href="{{ url_for('static', path='css/website_navigation.css') }}">
</head>
<body>

    <!-- Background Video -->
    <video id="background-video" class="video-background" autoplay loop muted playsinline>
        <source src="{{ url_for('static', path='background_light.mp4') }}" type="video/mp4">
        {{ _('Your browser does not support the video tag.') }}
    </video>

    <!-- Mobile Header -->
    <header class="header mobile-header">
        <div class="header-container">
            <!-- Single Row: Logo + Title + Buttons -->
            <div class="header-row">
                <!-- Logo Container -->
                <div class="logo-container">
                    <!-- Outer Gear (Spins Anticlockwise) -->
                    <img src="{{ url_for('static', path='logos/cait_logo_outer.png') }}" alt="{{ _('Outer Gear Logo') }}" class="logo outer-logo">
                    
                    <!-- Inner Gear (Spins Clockwise) -->
                    <img src="{{ url_for('static', path='logos/cait_logo_inner.png') }}" alt="{{ _('Inner Gear Logo') }}" class="logo inner-logo">
                </div>
                <!-- Title Container -->
                <div class="title-container">
                    <h1 class="title">{{ _('Cool AI Tools') }}</h1>
                </div>
                <!-- Buttons -->
                <div class="button-container">
                    <!-- Language Toggle -->
                    <form action="/set_language" method="post" class="language-form">
                        <input type="hidden" name="language" value="{% if request.cookies.get('language', 'en') == 'en' %}pt{% else %}en{% endif %}">
                        <button type="submit" class="button-language">
                            {% if request.cookies.get('language', 'en') == 'en' %}
                                PT
                            {% else %}
                                EN
                            {% endif %}
                        </button>
                    </form>
                    
                
                    <!-- Theme Toggle -->
                    <button class="button-theme-toggle" id="toggle-day-night">☀️</button>

                    <!-- Credits -->
                    <button class="button-credits">
                        {{ _('Credits') }}: <span class="badge">0</span>
                    </button>

                    <!-- Learn More -->
                    <button class="button-learn-more">{{ _('Learn More') }}</button>
                </div>
            </div>
        </div>
    </header>

    <!-- Desktop Header -->
    <header class="header desktop-header">
        <div class="container header-container">
            <!-- Logo Container -->
            <div class="logo-container">
                <!-- Outer Gear (Spins Anticlockwise) -->
                <img src="{{ url_for('static', path='logos/cait_logo_outer.png') }}" alt="{{ _('Outer Gear Logo') }}" class="logo outer-logo">
                
                <!-- Inner Gear (Spins Clockwise) -->
                <img src="{{ url_for('static', path='logos/cait_logo_inner.png') }}" alt="{{ _('Inner Gear Logo') }}" class="logo inner-logo">
            </div>

            <!-- Info Container -->
            <div class="info-container">
                <div class="title">{{ _('Cool AI Tools') }}</div>
                <p class="message">{{ _('Simple AI Tools for everyone.') }}</p>
                <p class="message">{{ _('A step in the open-sourcing mission.') }}</p>
            </div>

            <!-- Menu Container -->
            <div class="menu-container">
                <div class="menu-buttons">
                    <div class="top-buttons">
                        <form action="/set_language" method="post" class="language-form">
                            <input type="hidden" name="language" value="{% if request.cookies.get('language', 'en') == 'en' %}pt{% else %}en{% endif %}">
                            <button type="submit" class="button-language">
                                {% if request.cookies.get('language', 'en') == 'en' %}
                                    PT
                                {% else %}
                                    EN
                                {% endif %}
                            </button>
                        </form>                        
                        <button class="button-theme-toggle" id="toggle-day-night">☀️</button>
                    </div>
                    <button class="button-credits">
                        {{ _('Credits') }}: <span class="badge">0</span>
                    </button>
                    <button class="button-learn-more">{{ _('Learn More') }}</button>
                </div>
            </div>
        </div>
    </header>

    <!-- Flex Container Wrapper -->
    <div class="flex-container">
        <!-- Main Content Wrapper -->
        <main class="wrapper">
            <div class="container">
                <!-- Tabs for Different Functionalities -->
                <div class="tabs">
                    <div class="tab active" id="fact_check_tab" data-page="fact_check_content">
                        🧐 {{ _('Fact Checking') }}
                    </div>
                    <div class="tab" id="topic_research_tab" data-page="topic_research_content">
                        📚 {{ _('Topic Research') }}
                    </div>
                    <div class="tab" id="website_navigation_tab" data-page="website_navigation_content">
                        🧙 {{ _('Website Navigation') }}
                    </div>
                </div>

                <!-- Content Areas -->
                <!-- Fact Checking Content -->
                <div class="content-area" id="fact_check_content">
                    <h2 class="section-header">{{ _('Fact Checking') }}</h2>

                    <!-- Example Buttons -->
                    <div class="example-grid">
                        <div id="example1_fact_check" class="example-button" 
                            data-fact_check_input="{{ _('Health benefits of intermittent fasting') | e }}">
                            {{ _('Health benefits of intermittent fasting') }}
                        </div>
                        <div id="example2_fact_check" class="example-button" 
                            data-fact_check_input="{{ _('Impact of social media on mental health') | e }}">
                            {{ _('Impact of social media on mental health') }}
                        </div>
                        <div id="example3_fact_check" class="example-button" 
                            data-fact_check_input="{{ _('Is electric car adoption growing rapidly?') | e }}">
                            {{ _('Is electric car adoption growing rapidly?') }}
                        </div>
                        <div id="example4_fact_check" class="example-button" 
                            data-fact_check_input="{{ _('Do video games improve cognitive skills?') | e }}">
                            {{ _('Do video games improve cognitive skills?') }}
                        </div>
                    </div>

                    <!-- Input Group -->
                    <div class="input-group">
                        <input type="text" id="fact_check_input" placeholder="{{ _('🖊 Enter a claim you need to verify') | e }}" required>
                        <button type="button" id="fact_run_button" class="toggle-button">
                            {{ _('🚀 Run Specialized AI Team 🚀') }}
                        </button>
                    </div>

                    <!-- Output Container -->
                    <div id="fact_output_container"></div>
                </div>


                <!-- Topic Research Content -->
                <div class="content-area" id="topic_research_content" style="display: none;">
                    <h2 class="section-header">{{ _('Topic Research') }}</h2>

                    <!-- Example Buttons -->
                    <div class="example-grid">
                        <div id="example1_topic_research" class="example-button" 
                            data-topic_research_input="{{ _('Machine Learning') | e }}" 
                            data-topic_research_focus="">
                            {{ _('Learn about Machine Learning') }}
                        </div>
                        <div id="example2_topic_research" class="example-button" 
                            data-topic_research_input="{{ _('Renewable Energy') | e }}" 
                            data-topic_research_focus="{{ _('Latest trends') | e }}">
                            {{ _('Latest trends in Renewable Energy') }}
                        </div>
                        <div id="example3_topic_research" class="example-button" 
                            data-topic_research_input="{{ _('Meditation') | e }}" 
                            data-topic_research_focus="{{ _('Beginner\'s guide') | e }}">
                            {{ _("Beginner's guide to Meditation") }}
                        </div>
                        <div id="example4_topic_research" class="example-button" 
                            data-topic_research_input="{{ _('Space Exploration') | e }}" 
                            data-topic_research_focus="{{ _('Advancements') | e }}">
                            {{ _('Advancements in Space Exploration') }}
                        </div>
                    </div>

                    <!-- Input Group -->
                    <div class="input-group">
                        <input type="text" id="topic_research_input" placeholder="{{ _('📚 Enter your topic of research') | e }}" required>
                        <input type="text" id="topic_research_focus" placeholder="{{ _('🎯 Focus Area (Optional)') | e }}" style="margin-top: 10px;">
                        <button type="button" id="topic_run_button" class="toggle-button">
                            {{ _('🚀 Run Specialized AI Team 🚀') }}
                        </button>
                    </div>

                    <!-- Output Container -->
                    <div id="topic_output_container"></div>
                </div>


                <!-- Website Navigation Content -->
                <div class="content-area" id="website_navigation_content" style="display: none;">
                    <h2 class="section-header">{{ _('Website Navigation') }}</h2>

                    <!-- Example Buttons -->
                    <div class="example-grid">
                        <div id="example1_website_navigation" class="example-button" 
                            data-website_navigation_url="https://www.theverge.com" 
                            data-website_navigation_focus="{{ _('Latest Tech News') | e }}">
                            {{ _('Latest Tech News on The Verge') }}
                        </div>
                        <div id="example2_website_navigation" class="example-button" 
                            data-website_navigation_url="https://www.foodnetwork.com" 
                            data-website_navigation_focus="{{ _('Healthy Recipes') | e }}">
                            {{ _('Healthy Recipes on Food Network') }}
                        </div>
                        <div id="example3_website_navigation" class="example-button" 
                            data-website_navigation_url="https://www.lonelyplanet.com" 
                            data-website_navigation_focus="{{ _('Travel Guides') | e }}">
                            {{ _('Travel Guides on Lonely Planet') }}
                        </div>
                        <div id="example4_website_navigation" class="example-button" 
                            data-website_navigation_url="https://www.investopedia.com" 
                            data-website_navigation_focus="{{ _('Investment Tips') | e }}">
                            {{ _('Investment Tips on Investopedia') }}
                        </div>
                    </div>

                    <!-- Input Group -->
                    <div class="input-group">
                        <input type="text" id="website_navigation_url" placeholder="{{ _('🌐 URL or Domain to Navigate') | e }}" required>
                        <input type="text" id="website_navigation_focus" placeholder="{{ _('🎯 Topic of Focus (Optional)') | e }}" style="margin-top: 10px;">
                        <button type="button" id="website_run_button" class="toggle-button">
                            {{ _('🚀 Run Specialized AI Team 🚀') }}
                        </button>
                    </div>

                    <!-- Output Container -->
                    <div id="website_output_container"></div>
                </div>
            </div>
        </main>

        <!-- Footer -->
        <footer class="footer">
            <div class="footer-container">
                 <!-- Branding Section -->
                 <div class="footer-section branding">
                    <p>&copy; 2024 Cool AI Tools. All rights reserved.</p>
                </div>               
                <!-- Logos Section -->
                <div class="footer-section logos">
                    <!-- Five logos with links -->
                    <a href="https://github.com/crewAIInc/crewAI" target="_blank" rel="noopener noreferrer" aria-label="CrewAI">
                        <img src="{{ url_for('static', path='logos/crewai_logo.png') }}" alt="CrewAI Logo">
                    </a>
                    <a href="https://jina.ai" target="_blank" rel="noopener noreferrer" aria-label="Jina AI">
                        <img src="{{ url_for('static', path='logos/jina_ai_logo.png') }}" alt="Jina AI Logo">
                    </a>
                    <a href="mailto:your_email@example.com" aria-label="Send us an Email">
                        <img src="{{ url_for('static', path='logos/email_logo.png') }}" alt="Email Logo">
                    </a>
                    <a href="https://www.linkedin.com/in/luca-nonino-72196893" target="_blank" rel="noopener noreferrer" aria-label="Follow us on LinkedIn">
                        <img src="{{ url_for('static', path='logos/linkedin_logo.png') }}" alt="LinkedIn Logo">
                    </a>
                    <a href="https://github.com/LucaCGN/CoolAITools" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <img src="{{ url_for('static', path='logos/github_logo.png') }}" alt="GitHub Logo">
                    </a>
                </div>
            </div>
        </footer>
    </div> <!-- End of Flex Container Wrapper -->

    <!-- Include External JavaScript -->
    <script src="{{ url_for('static', path='js/loading_cards.js') }}"></script>
    <script src="{{ url_for('static', path='js/scripts.js') }}"></script>

    <!-- Functionality Scripts -->
    <!-- Fact Checking Scripts -->
    <script src="{{ url_for('static', path='js/verify_display.js') }}"></script>
    <script src="{{ url_for('static', path='js/verify_download.js') }}"></script>

    <!-- Topic Research Scripts -->
    <script src="{{ url_for('static', path='js/topic_research_display.js') }}"></script>
    <script src="{{ url_for('static', path='js/topic_research_download.js') }}"></script>

    <!-- Website Navigation Scripts -->
    <script src="{{ url_for('static', path='js/website_navigation_display.js') }}"></script>
    <script src="{{ url_for('static', path='js/website_navigation_download.js') }}"></script>
</body>
</html>

```

## scripts.js
```python
// static/js/scripts.js

document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab');
    const sections = {
        'fact_check_content': document.getElementById('fact_check_content'),
        'topic_research_content': document.getElementById('topic_research_content'),
        'website_navigation_content': document.getElementById('website_navigation_content')
    };

    // Function to hide all sections
    function hideAllSections() {
        Object.values(sections).forEach(section => {
            if (section) {
                section.style.display = 'none';
            }
        });
    }

    // Function to show the target section and update active tab
    function showSection(targetSectionId) {
        hideAllSections();
        if (sections[targetSectionId]) {
            sections[targetSectionId].style.display = 'block';
        }

        // Update active tabs
        tabs.forEach(tab => tab.classList.toggle('active', tab.getAttribute('data-page') === targetSectionId));
    }

    // Initially, hide all sections except the one with 'active' tab
    const activeTab = document.querySelector('.tab.active');
    const activeSectionId = activeTab ? activeTab.getAttribute('data-page') : 'fact_check_content';
    showSection(activeSectionId);

    // Add click event listeners to tabs
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetSectionId = tab.getAttribute('data-page');
            showSection(targetSectionId);
        });
    });

    // Add listeners for example buttons for each functionality
    addExampleButtonListeners();

    // Updated Selector (Correct)
    const dayNightButtons = document.querySelectorAll('.button-theme-toggle');

    /**
     * Function to set the theme and update the video source accordingly.
     * @param {boolean} isNight - True if night mode should be activated.
     */
    function setTheme(isNight) {
        document.body.classList.toggle('night-mode', isNight);
        dayNightButtons.forEach(btn => btn.textContent = isNight ? '🌙' : '☀️');
        setBackgroundVideo(isNight ? 'background_dark.mp4' : 'background_light.mp4');
        localStorage.setItem('theme', isNight ? 'night' : 'day');
    }

    /**
     * Function to update the background video source.
     * @param {string} videoFileName - The filename of the video to load.
     */
    function setBackgroundVideo(videoFileName) {
        const videoElement = document.getElementById('background-video');
        if (videoElement) {
            const sourceElement = videoElement.querySelector('source');
            if (sourceElement) {
                if (sourceElement.getAttribute('src') !== `/static/${videoFileName}`) {
                    sourceElement.setAttribute('src', `/static/${videoFileName}`);
                    videoElement.load(); // Reload the video with the new source
                }
            } else {
                console.error('Source element not found within the video element.');
            }
        } else {
            console.error('Background video element not found.');
        }
    }

    // Function to initialize theme based on localStorage
    function initializeTheme() {
        const savedTheme = localStorage.getItem('theme');
        setTheme(savedTheme === 'night');
    }

    // Initialize theme on page load
    initializeTheme();

    // Add click event listeners to all theme toggle buttons
    dayNightButtons.forEach(button => {
        button.addEventListener('click', () => {
            const isNight = !document.body.classList.contains('night-mode');
            setTheme(isNight);
        });
    });
});

/**
 * Function to add event listeners to example buttons.
 * Populates corresponding input fields with values from data attributes.
 */
function addExampleButtonListeners() {
    const exampleMappings = [
        {
            buttonSelector: '.example-button[data-fact_check_input]',
            inputSelectors: ['#fact_check_input'],
            attributeNames: ['data-fact_check_input']
        },
        {
            buttonSelector: '.example-button[data-topic_research_input]',
            inputSelectors: ['#topic_research_input', '#topic_research_focus'],
            attributeNames: ['data-topic_research_input', 'data-topic_research_focus']
        },
        {
            buttonSelector: '.example-button[data-website_navigation_url]',
            inputSelectors: ['#website_navigation_url', '#website_navigation_focus'],
            attributeNames: ['data-website_navigation_url', 'data-website_navigation_focus']
        }
    ];

    exampleMappings.forEach(mapping => {
        const buttons = document.querySelectorAll(mapping.buttonSelector);
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                try {
                    mapping.inputSelectors.forEach((selector, index) => {
                        const inputElement = document.querySelector(selector);
                        if (inputElement) {
                            let value = button.getAttribute(mapping.attributeNames[index]);

                            if (value) {
                                inputElement.value = value;
                                console.debug(`Set value of '${selector}' to '${value}'`);
                            } else {
                                console.warn(`Attribute '${mapping.attributeNames[index]}' is empty for button ID '${button.id}'`);
                            }
                        } else {
                            console.error(`Input element '${selector}' not found for button ID '${button.id}'`);
                        }
                    });
                } catch (error) {
                    console.error(`Error processing click event for button ID '${button.id}':`, error);
                }
            });
        });
    });
}

// scripts.js

/**
 * Utility function to get a cookie value by name.
 * @param {string} name - The name of the cookie.
 * @returns {string|null} - The value of the cookie or null if not found.
 */
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

/**
 * Function to retrieve the current language code.
 * Maps 'pt_BR' to 'pt', 'en_US' to 'en', etc.
 * Defaults to 'en' if not found or unsupported.
 * @returns {string} - The language code ('en', 'pt', 'es').
 */
function getCurrentLanguage() {
    const languageCookie = getCookie('language');
    if (!languageCookie) return 'en'; // Default to English

    // Mapping full language names or variants to supported codes
    const languageMap = {
        'en': 'en',
        'en_us': 'en',
        'pt': 'pt',
        'pt_br': 'pt',
        'es': 'es',
        'es_es': 'es',
        // Add more mappings if necessary
    };

    const langKey = languageCookie.toLowerCase();
    return languageMap[langKey] || 'en'; // Default to English if unsupported
}

// Expose the functions globally if needed
window.getCurrentLanguage = getCurrentLanguage;

```

## main.py
```python
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

# Create handlers with UTF-8 encoding
console_handler = logging.StreamHandler(sys.stdout)
console_handler.setLevel(logging.DEBUG)

# Ensure the 'logs' directory exists
os.makedirs('logs', exist_ok=True)

file_handler = logging.FileHandler('logs/app.log', encoding='utf-8')
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

def get_locale_from_request(request: Request) -> str:
    """
    Function to select the language based on the 'language' cookie.
    Returns 'en' if the cookie is not set.
    """
    locale = request.cookies.get('language', babel_configs.BABEL_DEFAULT_LOCALE).lower()
    logger.debug(f"Detected locale from cookie: {locale}")
    return locale

def get_translations(locale: str) -> Translations:
    """
    Loads translations based on the selected locale.
    Maps frontend locale codes to Babel locale codes if necessary.
    """
    # Mapping frontend locales to Babel locales
    locale_mapping = {
        'pt': 'pt',  # Map 'pt' to 'pt'
        'es': 'es',
        'en': 'en',
    }
    
    # Use the mapped locale if it exists; otherwise, use the original locale
    babel_locale = locale_mapping.get(locale, locale)
    
    translations = Translations.load(
        dirname=babel_configs.BABEL_TRANSLATION_DIRECTORY,  # Base directory for translations
        locales=[babel_locale],  # List of languages
        domain=babel_configs.BABEL_DOMAIN  # Specify the domain
    )
    logger.debug(f"Loaded translations for locale: '{babel_locale}' (mapped from '{locale}')")
    return translations


def _(text: str, translations: Translations) -> str:
    """
    Function to translate text.
    """
    translated_text = translations.gettext(text)
    logger.debug(f"Translating text: '{text}' -> '{translated_text}'")
    return translated_text

def _l(text: str, translations: Translations) -> Callable[[], str]:
    """
    Lazy translation function.
    """
    translated_text = translations.gettext(text)
    logger.debug(f"Lazy translating text: '{text}' -> '{translated_text}'")
    return lambda: translated_text

# ============================
# 6. Middleware to Set Locale in Request State
# ============================

class LocaleMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        # Set `locale` in request state
        locale = get_locale_from_request(request)
        request.state.locale = locale
        logger.debug(f"LocaleMiddleware: Set locale for request to '{locale}'")
        response = await call_next(request)
        return response

# Add LocaleMiddleware to the app
app.add_middleware(LocaleMiddleware)
logger.debug("Added LocaleMiddleware.")

# ============================
# 7. Route to Set Language
# ============================

# routes/set_language.py (assuming this is part of main.py)

@app.post('/set_language', response_class=HTMLResponse)
async def set_language(request: Request):
    """
    Route to set the user's preferred language.
    """
    logger.debug("Received POST request to '/set_language'.")
    try:
        form = await request.form()
        language = form.get('language', babel_configs.BABEL_DEFAULT_LOCALE).lower()
        logger.debug(f"Language selected by user: {language}")
    except Exception as e:
        logger.error(f"Error processing form data: {e}")
        language = babel_configs.BABEL_DEFAULT_LOCALE
        logger.debug(f"Falling back to default language: {language}")

    # Validate the selected language
    supported_languages = ['en', 'pt', 'es']
    if language not in supported_languages:
        language = babel_configs.BABEL_DEFAULT_LOCALE
        logger.debug(f"Unsupported language selected. Falling back to '{language}'.")

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
        response.set_cookie(
            key='language',
            value=language,
            max_age=30*24*60*60,
            httponly=False,  # Changed from True to False
            path='/'
        )
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
        locale = request.state.locale
        logger.debug(f"Rendering home page with locale '{locale}'.")
        translations = get_translations(locale)
        return templates.TemplateResponse("base.html", {
            "request": request,
            "_": lambda text: _(text, translations),
            "_l": lambda text: _l(text, translations),
            "locale": locale  # Pass locale to the template
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

```

## verify_display.js
```python
// static/js/verify_display.js

const VerifyDisplayModule = (function() {
    // Define States
    const STATES = {
        IDLE: 'idle',
        PREPARING_CREW: 'preparingCrew',
        LOADING_CARDS: 'loadingCards',
        PREPARING_REPORT: 'preparingReport',
        REPORT_READY: 'reportReady',
        ERROR: 'error'
    };

    let currentState = STATES.IDLE;
    const factRunButton = document.getElementById('fact_run_button');
    const outputContainer = document.getElementById('fact_output_container');

    // State variable to store JSON data
    window.verifyReportData = null;

    factRunButton.addEventListener('click', handleRunButtonClick);

    function handleRunButtonClick() {
        // Clear output and reset state
        outputContainer.innerHTML = '';
        currentState = STATES.IDLE;

        let claimInput = document.getElementById('fact_check_input').value.trim();
        if (!claimInput) {
            alert(window.translations.error_empty_claim || "Please enter a claim to verify.");
            return;
        }

        transitionState(STATES.PREPARING_CREW);
        showSpinner(window.translations.preparing_crew || "Preparing crew...");

        const language = getCurrentLanguage(); // Get current language

        // Fetch planning texts from the backend
        fetch('/verify/planning', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ claim: claimInput, language: language }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                transitionState(STATES.ERROR, data.error);
                return;
            }

            transitionState(STATES.LOADING_CARDS);
            hideSpinner();
            startLoadingCards(data.thought_process);
        })
        .catch(error => {
            console.error('Error:', error);
            transitionState(STATES.ERROR, window.translations.error_preparing_crew || "An error occurred while preparing the crew.");
        });
    }

    function transitionState(newState, errorMessage = '') {
        currentState = newState;
        if (newState === STATES.ERROR) {
            showError(errorMessage);
        }
    }

    function showSpinner(message) {
        outputContainer.innerHTML = `
            <div class="spinner-container">
                <div class="spinner"></div>
                <div class="spinner-text">${message}</div>
            </div>
        `;
    }

    function hideSpinner() {
        outputContainer.innerHTML = '';
    }

    function startLoadingCards(planningTexts) {
        const loadingCardsContainer = document.createElement('div');
        loadingCardsContainer.classList.add('loading-cards-container');
        outputContainer.appendChild(loadingCardsContainer);

        let index = 0;
        let previousCurrentCard = null;

        function addNextCard() {
            if (index >= planningTexts.length) {
                // All cards added, prepare report
                transitionState(STATES.PREPARING_REPORT);
                showSpinner(window.translations.preparing_report || "Preparing report...");
                setTimeout(() => {
                    fetchReport();
                }, 3000);
                return;
            }

            // Update the previous current-step card to stacked
            if (previousCurrentCard) {
                previousCurrentCard.classList.remove('current-step');
                previousCurrentCard.classList.add('stacked');
            }

            const cardText = planningTexts[index];
            const card = createLoadingCard(cardText, true);
            loadingCardsContainer.appendChild(card);

            // Update the reference to the current card
            previousCurrentCard = card;

            index++;
            setTimeout(addNextCard, 3000);
        }

        addNextCard();
    }

    function createLoadingCard(text, isCurrentStep) {
        const card = document.createElement('div');
        card.classList.add('loading-card');
        card.classList.add(isCurrentStep ? 'current-step' : 'stacked');

        const cardContent = document.createElement('div');
        cardContent.classList.add('card-content');
        cardContent.textContent = text;

        card.appendChild(cardContent);
        return card;
    }

    function fetchReport() {
        const claimInput = document.getElementById('fact_check_input').value.trim();
        const language = getCurrentLanguage(); // Get current language

        fetch('/verify/report', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ claim: claimInput, language: language }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                transitionState(STATES.ERROR, data.error);
                return;
            }
            // Assign the JSON object directly without parsing
            window.verifyReportData = data;

            transitionState(STATES.REPORT_READY);
            hideSpinner();
            displayReport(window.verifyReportData);
        })
        .catch(error => {
            console.error('Error:', error);
            transitionState(STATES.ERROR, window.translations.error_preparing_report || "An error occurred while preparing the report.");
        });
    }

    function displayReport(data) {
        // Clear the output container
        outputContainer.innerHTML = '';

        // Create a wrapper div to hold the report content
        const reportWrapper = document.createElement('div');
        reportWrapper.id = 'report-wrapper';

        // Render header with claim and verification result
        const reportHeader = document.createElement('div');
        reportHeader.classList.add('report-header');

        const reportTitle = document.createElement('div');
        reportTitle.classList.add('report-title');
        reportTitle.innerHTML = `<span class="claim-icon">🧐</span>${data.claim}`;

        const verificationBadge = document.createElement('div');
        verificationBadge.classList.add('badge');
        verificationBadge.classList.add(data.details.result ? 'true' : 'false');
        verificationBadge.textContent = data.details.result ? 'True' : 'False';

        reportHeader.appendChild(reportTitle);
        reportHeader.appendChild(verificationBadge);

        // Factuality Score
        const factualitySection = document.createElement('div');
        factualitySection.classList.add('factuality-score');

        const factualityLabel = document.createElement('span');
        factualityLabel.textContent = window.translations.factuality_score || "Factuality Score:";
        factualityLabel.classList.add('tooltip');
        factualityLabel.innerHTML += `<span class="tooltiptext">${window.translations.factuality_score_tooltip || "A score that represents the strength of evidence supporting the claim."}</span>`;

        const progressBarContainer = document.createElement('div');
        progressBarContainer.classList.add('progress-bar-container');

        const progressBar = document.createElement('div');
        progressBar.classList.add('progress-bar');

        // Set progress bar width and color based on factuality score
        const score = data.details.factuality;
        progressBar.style.width = `${score * 100}%`;

        if (score >= 0.75) {
            progressBar.classList.add('score-strongly-supported');
        } else if (score >= 0.5) {
            progressBar.classList.add('score-supported');
        } else if (score >= 0.25) {
            progressBar.classList.add('score-neutral');
        } else {
            progressBar.classList.add('score-not-supported');
        }

        progressBarContainer.appendChild(progressBar);

        const scoreLabel = document.createElement('span');
        scoreLabel.classList.add('score-label');
        if (score >= 0.75) {
            scoreLabel.textContent = window.translations.strongly_supported || "Strongly Supported";
        } else if (score >= 0.5) {
            scoreLabel.textContent = window.translations.supported || "Supported";
        } else if (score >= 0.25) {
            scoreLabel.textContent = window.translations.neutral || "Neutral";
        } else {
            scoreLabel.textContent = window.translations.not_supported || "Not Supported";
        }

        factualitySection.appendChild(factualityLabel);
        factualitySection.appendChild(progressBarContainer);
        factualitySection.appendChild(scoreLabel);

        // Reason Section (Collapsible)
        const reasonSection = createCollapsibleSection(window.translations.reason || "Reason", data.details.reason);

        // Conclusion Section (Collapsible)
        const conclusionSection = createCollapsibleSection(window.translations.conclusion || "Conclusion", data.conclusion);

        // References Section
        const referencesSection = createReferencesSection(data.details.references);

        // **Define reportCard**
        const reportCard = document.createElement('div');
        reportCard.classList.add('report-card');

        // Assemble Report Card
        reportCard.appendChild(reportHeader);
        reportCard.appendChild(factualitySection);
        reportCard.appendChild(reasonSection);
        reportCard.appendChild(conclusionSection);
        reportCard.appendChild(referencesSection);

        // Append Report Header and Report Card to Report Wrapper
        reportWrapper.appendChild(reportHeader);
        reportWrapper.appendChild(reportCard);

        // Append the report wrapper to the output container
        outputContainer.appendChild(reportWrapper);

        // Create Download and Copy Buttons
        const actionButtonsContainer = document.createElement('div');
        actionButtonsContainer.classList.add('action-buttons');

        const downloadButton = document.createElement('button');
        downloadButton.classList.add('download-button');
        downloadButton.textContent = window.translations.download_report || 'Download Report';
        downloadButton.addEventListener('click', () => {
            if (typeof downloadVerifyReport === 'function') {
                downloadVerifyReport();
            } else {
                console.error('Download function not found.');
            }
        });

        const copyButton = document.createElement('button');
        copyButton.classList.add('copy-button');
        copyButton.textContent = window.translations.copy_to_clipboard || 'Copy to Clipboard';
        copyButton.addEventListener('click', () => {
            if (typeof copyVerifyReport === 'function') {
                copyVerifyReport();
            } else {
                console.error('Copy function not found.');
            }
        });

        actionButtonsContainer.appendChild(downloadButton);
        actionButtonsContainer.appendChild(copyButton);

        // Append action buttons to the output container
        outputContainer.appendChild(actionButtonsContainer);

        // Initialize Collapsible Sections
        initializeCollapsibleSections();
    }

    function createCollapsibleSection(title, content) {
        const section = document.createElement('div');
        section.classList.add('collapsible-section');

        const header = document.createElement('div');
        header.classList.add('collapsible-header');
        header.innerHTML = `<h3>${title}</h3><span class="toggle-icon">➕</span>`;

        const body = document.createElement('div');
        body.classList.add('collapsible-content');

        const paragraph = document.createElement('p');
        paragraph.innerHTML = content;

        body.appendChild(paragraph);

        section.appendChild(header);
        section.appendChild(body);

        return section;
    }

    function createReferencesSection(references) {
        // Group references by supportiveness
        const supportiveRefs = references.filter(ref => ref.isSupportive);
        const nonSupportiveRefs = references.filter(ref => !ref.isSupportive);

        const section = document.createElement('div');
        section.classList.add('references-section');

        const header = document.createElement('div');
        header.classList.add('references-header');

        const title = document.createElement('h2');
        title.textContent = window.translations.references || "References";

        const filterOptions = document.createElement('div');
        filterOptions.classList.add('filter-options');

        const allFilter = document.createElement('button');
        allFilter.classList.add('filter-button', 'active');
        allFilter.textContent = window.translations.all || "All";
        allFilter.addEventListener('click', () => filterReferences('all'));

        const supportiveFilter = document.createElement('button');
        supportiveFilter.classList.add('filter-button');
        supportiveFilter.textContent = window.translations.supportive || "Supportive";
        supportiveFilter.addEventListener('click', () => filterReferences('supportive'));

        const nonSupportiveFilter = document.createElement('button');
        nonSupportiveFilter.classList.add('filter-button');
        nonSupportiveFilter.textContent = window.translations.non_supportive || "Non-Supportive";
        nonSupportiveFilter.addEventListener('click', () => filterReferences('non-supportive'));

        filterOptions.appendChild(allFilter);
        filterOptions.appendChild(supportiveFilter);
        filterOptions.appendChild(nonSupportiveFilter);

        header.appendChild(title);
        header.appendChild(filterOptions);

        const referencesContainer = document.createElement('div');
        referencesContainer.classList.add('references-container');

        // Function to render references based on filter
        function renderReferences(filteredRefs) {
            referencesContainer.innerHTML = '';
            filteredRefs.forEach(ref => {
                const refCard = createReferenceCard(ref);
                referencesContainer.appendChild(refCard);
            });
        }

        // Initial render with all references
        renderReferences(references);

        section.appendChild(header);
        section.appendChild(referencesContainer);

        return section;

        function filterReferences(filter) {
            const allFilters = header.querySelectorAll('.filter-button');
            allFilters.forEach(btn => btn.classList.remove('active'));

            let selectedFilter;
            if (filter === 'all') {
                selectedFilter = allFilter;
            } else if (filter === 'supportive') {
                selectedFilter = supportiveFilter;
            } else if (filter === 'non-supportive') {
                selectedFilter = nonSupportiveFilter;
            }

            if (selectedFilter) {
                selectedFilter.classList.add('active');
            }

            let filteredRefs;
            if (filter === 'all') {
                filteredRefs = references;
            } else if (filter === 'supportive') {
                filteredRefs = supportiveRefs;
            } else if (filter === 'non-supportive') {
                filteredRefs = nonSupportiveRefs;
            }

            renderReferences(filteredRefs);
        }
    }

    function createReferenceCard(ref) {
        const card = document.createElement('div');
        card.classList.add('reference-card');
        if (!ref.isSupportive) {
            card.classList.add('non-supportive');
        } else {
            card.classList.add('supportive');
        }

        const title = document.createElement('div');
        title.classList.add('reference-title');
        // Extract page title from URL if possible
        const pageTitle = ref.title || ref.url;
        title.textContent = pageTitle;

        const quote = document.createElement('div');
        quote.classList.add('key-quote');
        quote.textContent = `"${ref.keyQuote}"`;

        const actions = document.createElement('div');
        actions.classList.add('reference-actions');

        const supportIcon = document.createElement('span');
        supportIcon.classList.add('support-icon');
        supportIcon.innerHTML = ref.isSupportive ? "✔️ Supportive" : "❌ Not Supportive";

        const readSource = document.createElement('a');
        readSource.classList.add('read-source-button');
        readSource.href = ref.url;
        readSource.target = "_blank";
        readSource.rel = "noopener noreferrer";
        readSource.textContent = window.translations.read_source || "Read Source";

        actions.appendChild(supportIcon);
        actions.appendChild(readSource);

        card.appendChild(title);
        card.appendChild(quote);
        card.appendChild(actions);

        return card;
    }

    function showError(message) {
        outputContainer.innerHTML = `<div class="error-message">${message}</div>`;
    }

    function initializeCollapsibleSections() {
        const headers = outputContainer.querySelectorAll('.collapsible-header');
        headers.forEach(header => {
            header.addEventListener('click', () => {
                const content = header.nextElementSibling;
                const toggleIcon = header.querySelector('.toggle-icon');

                if (content.style.maxHeight) {
                    // Collapse
                    content.style.maxHeight = null;
                    toggleIcon.textContent = "➕";
                } else {
                    // Expand
                    content.style.maxHeight = content.scrollHeight + "px";
                    toggleIcon.textContent = "➖";
                }
            });
        });
    }

    return {
        // Expose functions or variables if needed
    };
})();

```

## messages.po
```python
# Portuguese (Brazil) translations for PROJECT.
# Copyright (C) 2024 ORGANIZATION
# This file is distributed under the same license as the PROJECT project.
# FIRST AUTHOR <EMAIL@ADDRESS>, 2024.
#
msgid ""
msgstr ""
"Project-Id-Version: PROJECT VERSION\n"
"Report-Msgid-Bugs-To: EMAIL@ADDRESS\n"
"POT-Creation-Date: 2024-11-29 23:28-0300\n"
"PO-Revision-Date: 2024-11-29 23:28-0300\n"
"Last-Translator: FULL NAME <EMAIL@ADDRESS>\n"
"Language: pt_BR\n"
"Language-Team: pt_BR <LL@li.org>\n"
"Plural-Forms: nplurals=2; plural=(n > 1);\n"
"MIME-Version: 1.0\n"
"Content-Type: text/plain; charset=utf-8\n"
"Content-Transfer-Encoding: 8bit\n"
"Generated-By: Babel 2.16.0\n"

#: templates/base.html:5
msgid "🤖 Cool AI Tools - Simple AI for Everyone 🚀"
msgstr "🤖 Cool AI Tools - IA Simples para Todos 🚀"

#: templates/base.html:24
msgid "Your browser does not support the video tag."
msgstr "Seu navegador não suporta a tag de vídeo."

#: templates/base.html:32
msgid "Logo"
msgstr "Logo"

#: templates/base.html:35
msgid "Cool AI Tools"
msgstr "Cool AI Tools"

#: templates/base.html:37
msgid "Simple AI Tools for everyone."
msgstr "Democratizando o Acesso a Inteligência Artificial."

#: templates/base.html:38
msgid "A step in the open-sourcing mission."
msgstr ""Morte ao Conceito Falho de Propriedade Intelectual""

#: templates/base.html:50
msgid "Credits:"
msgstr "Créditos:"

#: templates/base.html:51
msgid "Learn More"
msgstr "Saiba Mais"

#: templates/base.html:57
msgid "🧐 Fact Checking"
msgstr "🧐 Verificação de Fatos"

#: templates/base.html:58
msgid "📚 Topic Research"
msgstr "📚 Pesquisa de Tópicos"

#: templates/base.html:59
msgid "🧙 Website Navigation"
msgstr "🧙 Navegação no Site"

#: templates/base.html:65
msgid "Fact Checking"
msgstr "Verificação de Fatos"

#: templates/base.html:70 templates/base.html:71
msgid "Health benefits of intermittent fasting"
msgstr "Quais os Benefícios para a saúde do jejum intermitente?"

#: templates/base.html:74 templates/base.html:75
msgid "Impact of social media on mental health"
msgstr "Impacto das redes sociais na saúde mental é negativo e mensurável?"

#: templates/base.html:78 templates/base.html:79
msgid "Is electric car adoption growing rapidly?"
msgstr "A adoção de carros elétricos está crescendo rapidamente?"

#: templates/base.html:82 templates/base.html:83
msgid "Do video games improve cognitive skills?"
msgstr "Os videogames melhoram as habilidades cognitivas?"

#: templates/base.html:89
msgid "🖊 Enter a claim you need to verify"
msgstr "🖊 Insira uma afirmação que você precisa verificar"

#: templates/base.html:91 templates/base.html:132 templates/base.html:173
msgid "🚀 Run Specialized AI Team 🚀"
msgstr "🚀 Executar Agente Autônomo Especializado 🚀"

#: templates/base.html:101
msgid "Topic Research"
msgstr "Pesquisa de Tópicos"

#: templates/base.html:106
msgid "Machine Learning"
msgstr "Aprendizado de Máquina"

#: templates/base.html:108
msgid "Learn about Machine Learning"
msgstr "Aprenda sobre Aprendizado de Máquina"

#: templates/base.html:111
msgid "Renewable Energy"
msgstr "Energia Renovável"

#: templates/base.html:112
msgid "Latest trends"
msgstr "Últimas tendências"

#: templates/base.html:113
msgid "Latest trends in Renewable Energy"
msgstr "Últimas tendências em Energia Renovável"

#: templates/base.html:116
msgid "Meditation"
msgstr "Meditação"

#: templates/base.html:117
msgid "Beginner's guide"
msgstr "Guia para iniciantes"

#: templates/base.html:118
msgid "Beginner's guide to Meditation"
msgstr "Guia para iniciantes em Meditação"

#: templates/base.html:121
msgid "Space Exploration"
msgstr "Exploração Espacial"

#: templates/base.html:122
msgid "Advancements"
msgstr "Avanços"

#: templates/base.html:123
msgid "Advancements in Space Exploration"
msgstr "Avanços na Exploração Espacial"

#: templates/base.html:129
msgid "📚 Enter your topic of research"
msgstr "📚 Insira seu tópico de pesquisa"

#: templates/base.html:130
msgid "🎯 Focus Area (Optional)"
msgstr "🎯 Área de Foco (Opcional)"

#: templates/base.html:142
msgid "Website Navigation"
msgstr "Navegação no Site"

#: templates/base.html:148
msgid "Latest Tech News"
msgstr "Últimas Notícias de Tecnologia"

#: templates/base.html:149
msgid "Latest Tech News on The Verge"
msgstr "Últimas Notícias de Tecnologia no The Verge"

#: templates/base.html:153
msgid "Healthy Recipes"
msgstr "Receitas Saudáveis"

#: templates/base.html:154
msgid "Healthy Recipes on Food Network"
msgstr "Receitas Saudáveis no Food Network"

#: templates/base.html:158
msgid "Travel Guides"
msgstr "Guias de Viagem"

#: templates/base.html:159
msgid "Travel Guides on Lonely Planet"
msgstr "Guias de Viagem no Lonely Planet"

#: templates/base.html:163
msgid "Investment Tips"
msgstr "Dicas de Investimento"

#: templates/base.html:164
msgid "Investment Tips on Investopedia"
msgstr "Dicas de Investimento no Investopedia"

#: templates/base.html:170
msgid "🌐 URL or Domain to Navigate"
msgstr "🌐 URL ou Domínio para Navegar"

#: templates/base.html:171
msgid "🎯 Topic of Focus (Optional)"
msgstr "🎯 Tópico de Foco (Opcional)"

#: templates/base.html:188
msgid "CrewAI"
msgstr "CrewAI"

#: templates/base.html:189
msgid "CrewAI Logo"
msgstr "Logotipo da CrewAI"

#: templates/base.html:191
msgid "Jina AI"
msgstr "Jina AI"

#: templates/base.html:192
msgid "Jina AI Logo"
msgstr "Logotipo da Jina AI"

#: templates/base.html:194
msgid "Send us an Email"
msgstr "Envie-nos um Email"

#: templates/base.html:195
msgid "Email Logo"
msgstr "Logotipo do Email"

#: templates/base.html:197
msgid "Follow us on LinkedIn"
msgstr "Siga-nos no LinkedIn"

#: templates/base.html:198
msgid "LinkedIn Logo"
msgstr "Logotipo do LinkedIn"

#: templates/base.html:200
msgid "GitHub"
msgstr "GitHub"

#: templates/base.html:201
msgid "GitHub Logo"
msgstr "Logotipo do GitHub"

#: templates/base.html:207
msgid "© 2024 Cool AI Tools. All rights reserved."
msgstr "© 2024 Cool AI Tools. Todos os direitos reservados."

#: templates/base.html: (other lines)
msgid "Download Report"
msgstr "Baixar Relatório"

#: templates/base.html: (other lines)
msgid "Copy to Clipboard"
msgstr "Copiar para a Área de Transferência"

#: templates/base.html: (other lines)
msgid "Factuality Score:"
msgstr "Pontuação de Factualidade:"

#: templates/base.html: (other lines)
msgid "Strongly Supported"
msgstr "Fortemente Suportado"

#: templates/base.html: (other lines)
msgid "Supported"
msgstr "Suportado"

#: templates/base.html: (other lines)
msgid "Neutral"
msgstr "Neutro"

#: templates/base.html: (other lines)
msgid "Not Supported"
msgstr "Não Suportado"

#: templates/base.html: (other lines)
msgid "Reason"
msgstr "Razão"

#: templates/base.html: (other lines)
msgid "Conclusion"
msgstr "Conclusão"

#: templates/base.html: (other lines)
msgid "References"
msgstr "Referências"

#: templates/base.html: (other lines)
msgid "Read Source"
msgstr "Ler Fonte"

#: templates/base.html: (other lines)
msgid "All"
msgstr "Todos"

#: templates/base.html: (other lines)
msgid "Supportive"
msgstr "Suportivo"

#: templates/base.html: (other lines)
msgid "Non-Supportive"
msgstr "Não Suportivo"

#: templates/base.html: (other lines)
msgid "Health benefits of intermittent fasting"
msgstr "Benefícios para a saúde do jejum intermitente"

#: templates/base.html: (other lines)
msgid "Impact of social media on mental health"
msgstr "Impacto das mídias sociais na saúde mental"

#: templates/base.html: (other lines)
msgid "Is electric car adoption growing rapidly?"
msgstr "A adoção de carros elétricos está crescendo rapidamente?"

#: templates/base.html: (other lines)
msgid "Do video games improve cognitive skills?"
msgstr "Os videogames melhoram as habilidades cognitivas?"

#: templates/base.html: (other lines)
msgid "Learn about Machine Learning"
msgstr "Aprenda sobre Aprendizado de Máquina"

#: templates/base.html: (other lines)
msgid "Latest trends in Renewable Energy"
msgstr "Últimas tendências em Energia Renovável"

#: templates/base.html: (other lines)
msgid "Beginner's guide to Meditation"
msgstr "Guia para iniciantes em Meditação"

#: templates/base.html: (other lines)
msgid "Advancements in Space Exploration"
msgstr "Avanços na Exploração Espacial"

#: templates/base.html: (other lines)
msgid "Latest Tech News on The Verge"
msgstr "Últimas Notícias de Tecnologia no The Verge"

#: templates/base.html: (other lines)
msgid "Healthy Recipes on Food Network"
msgstr "Receitas Saudáveis na Food Network"

#: templates/base.html: (other lines)
msgid "Travel Guides on Lonely Planet"
msgstr "Guias de Viagem na Lonely Planet"

#: templates/base.html: (other lines)
msgid "Investment Tips on Investopedia"
msgstr "Dicas de Investimento na Investopedia"

#: templates/base.html: (other lines)
msgid "Learn More"
msgstr "Saiba Mais"

#: templates/base.html: (other lines)
msgid "Credits"
msgstr "Créditos"

#: scripts.js: (other lines)
msgid "Error: Empty claim received."
msgstr "Erro: Reclamação vazia recebida."

#: scripts.js: (other lines)
msgid "Error generating thought process."
msgstr "Erro ao gerar processo de pensamento."

#: scripts.js: (other lines)
msgid "Error generating report."
msgstr "Erro ao gerar relatório."

```

## messages.po
```python
# English translations for PROJECT.
# Copyright (C) 2024 ORGANIZATION
# This file is distributed under the same license as the PROJECT project.
# FIRST AUTHOR <EMAIL@ADDRESS>, 2024.
#
msgid ""
msgstr ""
"Project-Id-Version: PROJECT VERSION\n"
"Report-Msgid-Bugs-To: EMAIL@ADDRESS\n"
"POT-Creation-Date: 2024-11-29 23:28-0300\n"
"PO-Revision-Date: 2024-11-29 23:28-0300\n"
"Last-Translator: FULL NAME <EMAIL@ADDRESS>\n"
"Language: en\n"
"Language-Team: en <LL@li.org>\n"
"Plural-Forms: nplurals=2; plural=(n != 1);\n"
"MIME-Version: 1.0\n"
"Content-Type: text/plain; charset=utf-8\n"
"Content-Transfer-Encoding: 8bit\n"
"Generated-By: Babel 2.16.0\n"

#: templates/base.html:5
msgid "🤖 Cool AI Tools - Simple AI for Everyone 🚀"
msgstr "🤖 Cool AI Tools - Simple AI for Everyone 🚀"

#: templates/base.html:24
msgid "Your browser does not support the video tag."
msgstr "Your browser does not support the video tag."

#: templates/base.html:32
msgid "Logo"
msgstr "Logo"

#: templates/base.html:35
msgid "Cool AI Tools"
msgstr "Cool AI Tools"

#: templates/base.html:37
msgid "Simple AI Tools for everyone."
msgstr "Simple AI Tools for everyone."

#: templates/base.html:38
msgid "A step in the open-sourcing mission."
msgstr "A step in the open-sourcing mission."

#: templates/base.html:50
msgid "Credits:"
msgstr "Credits:"

#: templates/base.html:51
msgid "Learn More"
msgstr "Learn More"

#: templates/base.html:57
msgid "🧐 Fact Checking"
msgstr "🧐 Fact Checking"

#: templates/base.html:58
msgid "📚 Topic Research"
msgstr "📚 Topic Research"

#: templates/base.html:59
msgid "🧙 Website Navigation"
msgstr "🧙 Website Navigation"

#: templates/base.html:65
msgid "Fact Checking"
msgstr "Fact Checking"

#: templates/base.html:70 templates/base.html:71
msgid "Health benefits of intermittent fasting"
msgstr "Health benefits of intermittent fasting"

#: templates/base.html:74 templates/base.html:75
msgid "Impact of social media on mental health"
msgstr "Impact of social media on mental health"

#: templates/base.html:78 templates/base.html:79
msgid "Is electric car adoption growing rapidly?"
msgstr "Is electric car adoption growing rapidly?"

#: templates/base.html:82 templates/base.html:83
msgid "Do video games improve cognitive skills?"
msgstr "Do video games improve cognitive skills?"

#: templates/base.html:89
msgid "🖊 Enter a claim you need to verify"
msgstr "🖊 Enter a claim you need to verify"

#: templates/base.html:91 templates/base.html:132 templates/base.html:173
msgid "🚀 Run Specialized AI Team 🚀"
msgstr "🚀 Run Specialized AI Team 🚀"

#: templates/base.html:101
msgid "Topic Research"
msgstr "Topic Research"

#: templates/base.html:106
msgid "Machine Learning"
msgstr "Machine Learning"

#: templates/base.html:108
msgid "Learn about Machine Learning"
msgstr "Learn about Machine Learning"

#: templates/base.html:111
msgid "Renewable Energy"
msgstr "Renewable Energy"

#: templates/base.html:112
msgid "Latest trends"
msgstr "Latest trends"

#: templates/base.html:113
msgid "Latest trends in Renewable Energy"
msgstr "Latest trends in Renewable Energy"

#: templates/base.html:116
msgid "Meditation"
msgstr "Meditation"

#: templates/base.html:117
msgid "Beginner's guide"
msgstr "Beginner's guide"

#: templates/base.html:118
msgid "Beginner's guide to Meditation"
msgstr "Beginner's guide to Meditation"

#: templates/base.html:121
msgid "Space Exploration"
msgstr "Space Exploration"

#: templates/base.html:122
msgid "Advancements"
msgstr "Advancements"

#: templates/base.html:123
msgid "Advancements in Space Exploration"
msgstr "Advancements in Space Exploration"

#: templates/base.html:129
msgid "📚 Enter your topic of research"
msgstr "📚 Enter your topic of research"

#: templates/base.html:130
msgid "🎯 Focus Area (Optional)"
msgstr "🎯 Focus Area (Optional)"

#: templates/base.html:142
msgid "Website Navigation"
msgstr "Website Navigation"

#: templates/base.html:148
msgid "Latest Tech News"
msgstr "Latest Tech News"

#: templates/base.html:149
msgid "Latest Tech News on The Verge"
msgstr "Latest Tech News on The Verge"

#: templates/base.html:153
msgid "Healthy Recipes"
msgstr "Healthy Recipes"

#: templates/base.html:154
msgid "Healthy Recipes on Food Network"
msgstr "Healthy Recipes on Food Network"

#: templates/base.html:158
msgid "Travel Guides"
msgstr "Travel Guides"

#: templates/base.html:159
msgid "Travel Guides on Lonely Planet"
msgstr "Travel Guides on Lonely Planet"

#: templates/base.html:163
msgid "Investment Tips"
msgstr "Investment Tips"

#: templates/base.html:164
msgid "Investment Tips on Investopedia"
msgstr "Investment Tips on Investopedia"

#: templates/base.html:170
msgid "🌐 URL or Domain to Navigate"
msgstr "🌐 URL or Domain to Navigate"

#: templates/base.html:171
msgid "🎯 Topic of Focus (Optional)"
msgstr "🎯 Topic of Focus (Optional)"

#: templates/base.html:188
msgid "CrewAI"
msgstr "CrewAI"

#: templates/base.html:189
msgid "CrewAI Logo"
msgstr "CrewAI Logo"

#: templates/base.html:191
msgid "Jina AI"
msgstr "Jina AI"

#: templates/base.html:192
msgid "Jina AI Logo"
msgstr "Jina AI Logo"

#: templates/base.html:194
msgid "Send us an Email"
msgstr "Send us an Email"

#: templates/base.html:195
msgid "Email Logo"
msgstr "Email Logo"

#: templates/base.html:197
msgid "Follow us on LinkedIn"
msgstr "Follow us on LinkedIn"

#: templates/base.html:198
msgid "LinkedIn Logo"
msgstr "LinkedIn Logo"

#: templates/base.html:200
msgid "GitHub"
msgstr "GitHub"

#: templates/base.html:201
msgid "GitHub Logo"
msgstr "GitHub Logo"

#: templates/base.html:207
msgid "© 2024 Cool AI Tools. All rights reserved."
msgstr "© 2024 Cool AI Tools. All rights reserved."

#: templates/base.html:200
msgid "GitHub"
msgstr "GitHub"

#: templates/base.html:201
msgid "GitHub Logo"
msgstr "GitHub Logo"

#: templates/base.html:207
msgid "© 2024 Cool AI Tools. All rights reserved."
msgstr "© 2024 Cool AI Tools. All rights reserved."

#: templates/base.html: (other lines)
msgid "Download Report"
msgstr "Download Report"

#: templates/base.html: (other lines)
msgid "Copy to Clipboard"
msgstr "Copy to Clipboard"

#: templates/base.html: (other lines)
msgid "Factuality Score:"
msgstr "Factuality Score:"

#: templates/base.html: (other lines)
msgid "Strongly Supported"
msgstr "Strongly Supported"

#: templates/base.html: (other lines)
msgid "Supported"
msgstr "Supported"

#: templates/base.html: (other lines)
msgid "Neutral"
msgstr "Neutral"

#: templates/base.html: (other lines)
msgid "Not Supported"
msgstr "Not Supported"

#: templates/base.html: (other lines)
msgid "Reason"
msgstr "Reason"

#: templates/base.html: (other lines)
msgid "Conclusion"
msgstr "Conclusion"

#: templates/base.html: (other lines)
msgid "References"
msgstr "References"

#: templates/base.html: (other lines)
msgid "Read Source"
msgstr "Read Source"

#: templates/base.html: (other lines)
msgid "All"
msgstr "All"

#: templates/base.html: (other lines)
msgid "Supportive"
msgstr "Supportive"

#: templates/base.html: (other lines)
msgid "Non-Supportive"
msgstr "Non-Supportive"

#: templates/base.html: (other lines)
msgid "Health benefits of intermittent fasting"
msgstr "Health benefits of intermittent fasting"

#: templates/base.html: (other lines)
msgid "Impact of social media on mental health"
msgstr "Impact of social media on mental health"

#: templates/base.html: (other lines)
msgid "Is electric car adoption growing rapidly?"
msgstr "Is electric car adoption growing rapidly?"

#: templates/base.html: (other lines)
msgid "Do video games improve cognitive skills?"
msgstr "Do video games improve cognitive skills?"

#: templates/base.html: (other lines)
msgid "Learn about Machine Learning"
msgstr "Learn about Machine Learning"

#: templates/base.html: (other lines)
msgid "Latest trends in Renewable Energy"
msgstr "Latest trends in Renewable Energy"

#: templates/base.html: (other lines)
msgid "Beginner's guide to Meditation"
msgstr "Beginner's guide to Meditation"

#: templates/base.html: (other lines)
msgid "Advancements in Space Exploration"
msgstr "Advancements in Space Exploration"

#: templates/base.html: (other lines)
msgid "Latest Tech News on The Verge"
msgstr "Latest Tech News on The Verge"

#: templates/base.html: (other lines)
msgid "Healthy Recipes on Food Network"
msgstr "Healthy Recipes on Food Network"

#: templates/base.html: (other lines)
msgid "Travel Guides on Lonely Planet"
msgstr "Travel Guides on Lonely Planet"

#: templates/base.html: (other lines)
msgid "Investment Tips on Investopedia"
msgstr "Investment Tips on Investopedia"

#: templates/base.html: (other lines)
msgid "Learn More"
msgstr "Learn More"

#: templates/base.html: (other lines)
msgid "Credits"
msgstr "Credits"

#: scripts.js: (other lines)
msgid "Error: Empty claim received."
msgstr "Error: Empty claim received."

#: scripts.js: (other lines)
msgid "Error generating thought process."
msgstr "Error generating thought process."

#: scripts.js: (other lines)
msgid "Error generating report."
msgstr "Error generating report."

```

