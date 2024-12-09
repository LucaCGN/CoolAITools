# tools/multiple_images_transcription_crew_as_tool.py

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
    parser = argparse.ArgumentParser(description="Transcribe the content of multiple images into a single post.")
    parser.add_argument('--image_paths', nargs='+', required=True, help='A list of paths to the images to be transcribed.')
    parser.add_argument('--output_dir', type=str, required=True, help='The directory to save the combined transcription output.')
    args = parser.parse_args()

    image_paths = args.image_paths
    output_dir = args.output_dir

    # Ensure the output directory exists
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    # Retrieve API key from environment variables
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

    if not OPENAI_API_KEY:
        logger.error("OPENAI_API_KEY must be set as an environment variable.")
        sys.exit(1)

    # Validate all image paths
    for image_path in image_paths:
        if not os.path.isfile(image_path):
            logger.error(f"Image file does not exist: {image_path}")
            sys.exit(1)

    # Define the Image Transcription Tool
    image_transcription_tool = ImageTranscriptionTool()

    # Define the transcription agent
    transcription_agent = Agent(
        role="Image Transcriber",
        goal=(
            "Your mission is to transcribe the content of multiple images, extracting detailed text and descriptions. "
            "The tool 'image_transcription_tool' is used for this purpose, and it accepts a file path from the list of image paths as input."
        ),
        backstory=(
            "You are a highly skilled AI specializing in analyzing images and extracting textual and visual content. "
            "You work with precision to transcribe detailed information from visual media, providing accurate insights."
        ),
        tools=[image_transcription_tool],
        model="gpt-4o-mini",
        verbose=True
    )

    # Dynamically create a task description with all image paths
    task_description = (
        "Transcribe the content of the provided images located at the following paths:\n"
        + "\n".join(f"- {path}" for path in image_paths) +
        "\nCombine all transcriptions into a single cohesive post."
    )

    # Define the transcription task
    transcription_task = Task(
        description=task_description,
        expected_output="A cohesive transcription combining the content of all provided images.",
        agent=transcription_agent
    )

    # Assemble the Crew
    crew = Crew(
        agents=[transcription_agent],
        tasks=[transcription_task],
        verbose=True
    )

    # Execute the task with the list of image paths
    crew_output = crew.kickoff(inputs={'image_paths': image_paths})

    print(f"Combined Transcription Output:\n{crew_output.raw}")

    # Save the output in the specified directory
    output_file_path = os.path.join(output_dir, "combined_transcription.txt")

    try:
        with open(output_file_path, 'w', encoding='utf-8') as f:
            f.write(crew_output.raw)
        logger.info(f"Combined transcription saved to {output_file_path}")
    except Exception as e:
        logger.error(f"Failed to save transcription to {output_file_path}: {e}")


if __name__ == "__main__":
    main()
