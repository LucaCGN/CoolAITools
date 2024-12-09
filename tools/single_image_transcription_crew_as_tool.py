# tools/image_transcription_crew.py

import os
import sys
import argparse
import base64
import requests
from crewai import Agent, Task, Crew
from crewai_tools import BaseTool
from pydantic import BaseModel
import logging
import json

# Configure logging to a file to prevent cluttering stdout
logging.basicConfig(
    filename='logs/image_transcription_log.txt',
    filemode='a',
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

# Define argument schema for the tool
class ImageTranscriptionToolArgs(BaseModel):
    image_path_url: str

# Define the Image Transcription Tool
class ImageTranscriptionTool(BaseTool):
    name: str = "image_transcription_tool"
    description: str = "Transcribes the content of an image using OpenAI's Vision API."
    args_schema = ImageTranscriptionToolArgs

    def _run_local_images(self, client, image_path_url: str) -> str:
        if not os.path.exists(image_path_url):
            logger.error(f"File not found: {image_path_url}")
            return "Error: File not found."

        base64_image = self._encode_image(image_path_url)

        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {os.getenv('OPENAI_API_KEY')}",
        }

        payload = {
            "model": "gpt-4o-mini",
            "messages": [
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": "What's in this image?"},
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/jpeg;base64,{base64_image}"
                            },
                        },
                    ],
                }
            ],
            "max_tokens": 300,
        }

        try:
            response = requests.post(
                "https://api.openai.com/v1/chat/completions", headers=headers, json=payload
            )
            response.raise_for_status()
            return response.json()["choices"][0]["message"]["content"]
        except requests.exceptions.RequestException as e:
            logger.error(f"Failed to transcribe image: {e}")
            return f"Error: {str(e)}"

    def _encode_image(self, image_path: str):
        with open(image_path, "rb") as image_file:
            return base64.b64encode(image_file.read()).decode("utf-8")

    def _run(self, image_path_url: str) -> str:
        if not image_path_url:
            return "Image Path or URL is required."

        if not os.path.isfile(image_path_url):
            logger.error(f"File not found: {image_path_url}")
            return f"Error: File not found: {image_path_url}"

        return self._run_local_images(None, image_path_url)


def main():
    # Parse command-line arguments
    parser = argparse.ArgumentParser(description="Transcribe the content of an image.")
    parser.add_argument('--image_path', type=str, required=True, help='The path to the image to be transcribed.')
    args = parser.parse_args()

    image_path = args.image_path

    # Retrieve API key from environment variables
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

    if not OPENAI_API_KEY:
        logger.error("OPENAI_API_KEY must be set as an environment variable.")
        sys.exit(1)

    if not os.path.isfile(image_path):
        logger.error(f"Image file does not exist: {image_path}")
        sys.exit(1)

    # Define the Image Transcription Tool
    image_transcription_tool = ImageTranscriptionTool()

    # Define the transcription agent
    transcription_agent = Agent(
        role="Image Transcriber",
        goal=(
            "Your mission is to transcribe the content of images, extracting detailed text and descriptions. "
            "The tool 'image_transcription_tool' is used for this purpose, and it accepts the file path {file_path} as input."
        ),
        backstory=(
            "You are a highly skilled AI specializing in analyzing images and extracting textual and visual content. "
            "You work with precision to transcribe detailed information from visual media, providing accurate insights."
        ),
        tools=[image_transcription_tool],
        model="gpt-4-mini",
        verbose=True
    )

    # Define the transcription task
    transcription_task = Task(
        description=(
            "Transcribe the content of the provided image located at {file_path}. "
            "Ensure the transcription captures all text and relevant details from the image, such as titles, descriptions, and graphical elements. "
            "Use the 'image_transcription_tool' with the file path as input to extract the content accurately."
        ).format(file_path=image_path),
        expected_output="A detailed transcription of the image's content, including all text and descriptions.",
        agent=transcription_agent
    )

    # Assemble the Crew
    crew = Crew(
        agents=[transcription_agent],
        tasks=[transcription_task],
        verbose=True
    )

    # Execute the task with the specific image path
    crew_output = crew.kickoff(inputs={'file_path': image_path})
    print(f"Raw Output: {crew_output.raw}")
    if crew_output.json_dict:
        print(f"JSON Output: {json.dumps(crew_output.json_dict, indent=2)}")
    if crew_output.pydantic:
        print(f"Pydantic Output: {crew_output.pydantic}")
    print(f"Tasks Output: {crew_output.tasks_output}")
    print(f"Token Usage: {crew_output.token_usage}")
    # Save the output as a .txt file in the same directory as the input image
    output_file_path = os.path.splitext(image_path)[0] + '.txt'
    try:
        with open(output_file_path, 'w', encoding='utf-8') as f:
            f.write(crew_output.raw)
        logger.info(f"Transcription saved to {output_file_path}")
    except Exception as e:
        logger.error(f"Failed to save transcription to {output_file_path}: {e}")
if __name__ == "__main__":
    main()
