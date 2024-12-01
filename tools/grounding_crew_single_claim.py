# tools/grounding_crew_single_claim.py

import os
import sys
import argparse
import requests
from crewai import Agent, Task, Crew
from crewai_tools import BaseTool
from pydantic import BaseModel, Field
import logging
import json


# Configure Logging to a file to prevent cluttering stdout
logging.basicConfig(
    filename='logs/grounding_crew_log.txt',
    filemode='a',
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

# Define argument schema for the tool
class JinaGroundingToolArgs(BaseModel):
    claim: str

# Define the Jina Grounding Tool
class JinaGroundingTool(BaseTool):
    name: str = "jina_grounding_tool"
    description: str = "Validates and verifies academic claims across various disciplines using the versatile Jina AI Grounding API."
    args_schema = JinaGroundingToolArgs

    def _run(self, claim: str) -> dict:
        headers = {
            "Accept": "application/json",
            "Authorization": f"Bearer {os.getenv('JINA_API_KEY')}"
        }
        url = f'https://g.jina.ai/{claim.replace(" ", "%20")}'

        try:
            response = requests.get(url, headers=headers)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            logger.error(f"Failed to ground claim: {e}")
            return {"error": f"Failed to ground claim, error: {str(e)}"}

# Define a Pydantic model for structured task output
class ClaimVerificationOutput(BaseModel):
    claim: str
    details: dict = Field(..., example={
        "factuality": 0.9,
        "result": True,
        "reason": "The claim aligns with verified sources.",
        "references": [
            {
                "url": "https://example.com",
                "keyQuote": "This source supports the claim.",
                "isSupportive": True
            }
        ]
    })
    conclusion: str

def main():
    # Parse command-line arguments
    parser = argparse.ArgumentParser(description="Verify the accuracy of a claim using the Jina AI Grounding API.")
    parser.add_argument('--topic', type=str, required=True, help='The claim to be verified.')
    args = parser.parse_args()

    claim_text = args.topic

    # Retrieve API keys from environment variables
    JINA_API_KEY = os.getenv("JINA_API_KEY")
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

    if not JINA_API_KEY or not OPENAI_API_KEY:
        logger.error("API keys for JINA_API_KEY and OPENAI_API_KEY must be set as environment variables.")
        sys.exit(1)

    # Define the Jina Grounding Tool
    jina_grounding_tool = JinaGroundingTool()

    # Define the claim verifier agent
    claim_verifier = Agent(
        role="Claim Verifier",
        goal="Thoroughly verify the accuracy of diverse academic claims by leveraging the Jina AI Grounding API, ensuring comprehensive fact-checking across various scholarly disciplines.",
        backstory=(
            "You are an AI agent specialized in verifying claims across all academic fields using logical analysis and structured tool usage. "
            "Your verification process must be thorough, encompassing multiple dimensions such as methodology, data sources, and potential biases. "
            "Ensure that your analysis is detailed and well-supported by credible references."
        ),
        tools=[jina_grounding_tool],
        model="gpt-4-mini",
        verbose=True,
    )

    # Define the task with explicit `expected_output` and `output_json`
    grounding_task = Task(
        description=(
            "Verify the provided academic claim: {claim} using the Jina AI Grounding Tool. "
            "Your verification should be as detailed and comprehensive as possible, covering all relevant aspects such as methodology, data sources, and potential biases. "
            "Include all main references you consult that are pertinent to the claim. "
            "Incorporate a tool usage step when verifying the claim and conclude with a JSON report containing 'summary', 'details', 'conclusion', and 'references'. "
            "Ensure the report is thorough to meet the expectations of users from any academic field. Include as many references as you can find that are relevant."
        ),
        expected_output=(
            "{{\n"
            '  "claim": "string",\n'
            '  "details": {\n'
            '    "factuality": 0.0,\n'
            '    "result": false,\n'
            '    "reason": "string",\n'
            '    "references": [\n'
            "      {\n"
            '        "url": "string",\n'
            '        "keyQuote": "string",\n'
            '        "isSupportive": true\n'
            "      }\n"
            "    ]\n"
            '  },\n'
            '  "conclusion": "string"\n'
            "}}"
        ).replace("{", "{{").replace("}", "}}"),  # Correctly escaped for JSON
        agent=claim_verifier,
        output_json=ClaimVerificationOutput  # Use the Pydantic model as the output schema
    )

    # Assemble the Crew
    crew = Crew(
        agents=[claim_verifier],
        tasks=[grounding_task],
        verbose=True,
        output_log_file="output_log.txt",
        language="Português"
    )

    # Execute the task with the specific claim and process the output
    output = crew.kickoff(inputs={'claim': claim_text})


if __name__ == "__main__":
    main()
