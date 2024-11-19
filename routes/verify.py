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
    generate_thinking_process_prompts_verify,
    ThoughtProcessResponse
)

router = APIRouter()

@router.post("/verify/planning")
async def verify_planning(request: Request):
    data = await request.json()
    claim = data.get('claim', '').strip()
    if not claim:
        logger.error("Empty claim received.")
        return JSONResponse({"error": "Error: Empty claim received."})

    try:
        thought_process_response: ThoughtProcessResponse = generate_thinking_process_prompts_verify(claim)
        thought_process_phrases = thought_process_response.thought_process
        logger.info(f"Generated thought_process_phrases: {thought_process_phrases}")
        return JSONResponse({"thought_process": thought_process_phrases})
    except Exception as e:
        logger.exception("Failed to generate thought process phrases:")
        return JSONResponse({"error": f"Error generating thought process: {str(e)}"})

@router.post("/verify/report")
async def verify_report(request: Request):
    data = await request.json()
    claim = data.get('claim', '').strip()
    if not claim:
        logger.error("Empty claim received.")
        return JSONResponse({"error": "Error: Empty claim received."})

    try:
        # Prepare the subprocess environment
        env = os.environ.copy()
        env['PYTHONIOENCODING'] = 'utf-8'

        # Construct the absolute path to the script
        script_path = os.path.join(os.getcwd(), 'tools', 'grounding_crew_single_claim.py')
        if not os.path.exists(script_path):
            error_message = f"Script not found at path: {script_path}"
            logger.error(error_message)
            return JSONResponse({"error": f"Error: {error_message}"})

        # Define function to run the script using subprocess
        def run_script():
            result = subprocess.run(
                [sys.executable, script_path, '--topic', claim],
                capture_output=True,
                text=True,
                encoding='utf-8',  # Specify the encoding explicitly
                env=env
            )
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
    except Exception as e:
        logger.exception("Error in verification process:")
        return JSONResponse({"error": f"Error: {str(e)}"})
