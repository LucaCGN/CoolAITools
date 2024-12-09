# routes/website_navigation.py

from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
import sys
import asyncio
import os
import json
import subprocess
import concurrent.futures

from main import (
    logger,
    remove_ansi_codes,
    safe_parse_json,
    generate_thinking_process_prompts_read,
    ThoughtProcessResponse
)

router = APIRouter()

# Mapping full language names to codes
LANGUAGE_MAP = {
    'english': 'en',
    'portuguese': 'pt',
    'spanish': 'es'
}

# Supported languages
SUPPORTED_LANGUAGES = ['en', 'pt', 'es']

def get_locale_from_request(request: Request) -> str:
    """
    Retrieves the language from the 'language' cookie.
    Defaults to 'en' if not set or unsupported.
    """
    locale = request.cookies.get('language', 'en').lower()
    logger.debug(f"Detected locale from cookie: {locale}")
    # If the locale is a full code like 'pt_BR', map it to 'pt' for consistency
    if locale.startswith('pt'):
        return 'pt'
    elif locale.startswith('es'):
        return 'es'
    else:
        return 'en'

@router.post("/website_navigation/planning")
async def website_navigation_planning(request: Request):
    """
    Planning route for website navigation.
    Generates and returns thought process phrases based on the provided URL, topic, and language.
    """
    data = await request.json()
    url = data.get('url', '').strip()
    topic = data.get('topic', '').strip()

    # Retrieve language from cookie
    language_input = get_locale_from_request(request)

    # Map full language names to codes if necessary
    language = LANGUAGE_MAP.get(language_input, language_input)
    if language not in SUPPORTED_LANGUAGES:
        logger.warning(f"Unsupported language '{language_input}'. Falling back to English.")
        language = 'en'

    if not url:
        logger.error("Empty URL received.")
        return JSONResponse({"error": "Error: 'url' must be provided."})

    if not topic:
        logger.warning("Empty topic received; proceeding without topic.")

    try:
        thought_process_response: ThoughtProcessResponse = generate_thinking_process_prompts_read(url, topic, language=language)
        thought_process_phrases = thought_process_response.thought_process
        logger.info(f"Generated thought_process_phrases: {thought_process_phrases}")
        return JSONResponse({"thought_process": thought_process_phrases})
    except Exception as e:
        logger.exception("Failed to generate thought process phrases:")
        return JSONResponse({"error": f"Error generating thought process: {str(e)}"})

@router.post("/website_navigation/report")
async def website_navigation_report(request: Request):
    """
    Report route for website navigation.
    Executes a backend script to generate a report based on the provided URL, topic, and language, then returns the result.
    """
    data = await request.json()
    url = data.get('url', '').strip()
    topic = data.get('topic', '').strip()

    # Retrieve language from cookie
    language_input = get_locale_from_request(request)

    # Map full language names to codes if necessary
    language = LANGUAGE_MAP.get(language_input, language_input)
    if language not in SUPPORTED_LANGUAGES:
        logger.warning(f"Unsupported language '{language_input}'. Falling back to English.")
        language = 'en'

    if not url:
        logger.error("Empty URL received.")
        return JSONResponse({"error": "Error: 'url' must be provided."})

    if not topic:
        logger.warning("Empty topic received; proceeding without topic.")

    try:
        # Prepare the subprocess environment
        env = os.environ.copy()
        env['PYTHONIOENCODING'] = 'utf-8'

        # Construct the absolute path to the script
        script_path = os.path.join(os.getcwd(), 'tools', 'reader_crew_single_domain.py')
        if not os.path.exists(script_path):
            error_message = f"Script not found at path: {script_path}"
            logger.error(error_message)
            return JSONResponse({"error": f"Error: {error_message}"})

        # Define function to run the script using subprocess
        def run_script():
            result = subprocess.run(
                [
                    sys.executable,
                    script_path,
                    '--url', url,
                    '--topic', topic,
                    '--language', language  # Pass the language parameter
                ],
                capture_output=True,
                text=True,
                encoding='utf-8',  # Specify the encoding
                env=env
            )
            if result.returncode != 0:
                logger.error(f"Subprocess error: {result.stderr}")
                raise subprocess.CalledProcessError(result.returncode, result.args, output=result.stdout, stderr=result.stderr)
            return result.stdout

        # Use ThreadPoolExecutor to run the blocking subprocess call
        loop = asyncio.get_event_loop()
        executor = concurrent.futures.ThreadPoolExecutor()

        stdout = await loop.run_in_executor(executor, run_script)
        cleaned_output = remove_ansi_codes(stdout)

        # Process the output to extract JSON data
        final_answer_detected = False
        json_output_lines = []
        for line in cleaned_output.splitlines():
            if "## Final Answer" in line:
                final_answer_detected = True
                continue  # Skip the marker line
            if final_answer_detected:
                json_output_lines.append(line)

        if json_output_lines:
            json_text = '\n'.join(json_output_lines).strip()
            json_data = safe_parse_json(json_text)
            if json_data is not None:
                return JSONResponse(json_data)
            else:
                logger.error("Failed to parse JSON output.")
                return JSONResponse({"error": "Error: Failed to parse JSON output."})
        else:
            logger.error("No JSON output found after '## Final Answer'.")
            return JSONResponse({"error": "Error: No JSON output found after '## Final Answer'."})
    except subprocess.CalledProcessError as e:
        logger.exception("Subprocess failed:")
        return JSONResponse({"error": f"Subprocess failed with error: {e.stderr.strip()}"})
    except Exception as e:
        logger.exception("Error in website navigation report process:")
        return JSONResponse({"error": f"Error: {str(e)}"})
