import os
import sys
import argparse
import requests
from crewai import Agent, Task, Crew
from crewai_tools import BaseTool
from pydantic import BaseModel, Field
import logging
from typing import List, Dict, Any, Optional

# ==========================
# Environment Setup
# ==========================


# Configure Logging to a file to prevent cluttering stdout
logging.basicConfig(
    filename='logs/search_crew_log.txt',
    filemode='a',
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

# ==========================
# Tool Definitions
# ==========================

# Define an argument schema for the Jina Search Tool
class JinaSearchToolArgs(BaseModel):
    topic: str = Field(..., description="The topic to search for.")

# Define the Jina Search Tool with proper input validation
class JinaSearchTool(BaseTool):
    name: str = "jina_search_tool"
    description: str = "Searches content related to a topic using the Jina Search API."
    args_schema = JinaSearchToolArgs

    def _run(self, topic: str) -> dict:
        headers = {
            "Accept": "application/json",
            "Authorization": f"Bearer {os.getenv('JINA_API_KEY')}"
        }
        url = f'https://s.jina.ai/{topic.replace(" ", "%20")}'
        logger.info(f"Initiating search for topic: {topic}")
        response = requests.get(url, headers=headers)

        if response.status_code == 200:
            data = response.json().get("data", [])
            logger.info(f"Search successful for topic '{topic}'. Number of results: {len(data)}")
            return {"results": data}
        else:
            logger.error(f"Search failed for topic '{topic}' with status code: {response.status_code}")
            return {"error": f"Failed to search for topic '{topic}', status code: {response.status_code}"}

# ==========================
# JSON Schema Definition
# ==========================

# Define the schema for the comprehensive search report
class SearchReportOutput(BaseModel):
    topic: str = Field(..., description="The topic that was searched.")
    report_title: str = Field(..., description="The title of the search report.")
    report_content: List[Dict[str, Any]] = Field(
        ...,
        description="List of articles with titles, URLs, descriptions, published time, and key points.",
        example=[
            {
                "title": "Article Title",
                "url": "https://example.com/article",
                "description": "Brief description of the article.",
                "published_time": "2023-01-01T00:00:00Z",
                "key_points": ["Point 1", "Point 2"]
            }
            # Additional articles...
        ]
    )
    report_summary: str = Field(..., description="A summary of the search results.")
    main_sources: List[Dict[str, Any]] = Field(
        ...,
        description="List of main sources related to the topic.",
        example=[
            {
                "title": "Main Source Title",
                "url": "https://example.com/source",
                "description": "Description of the main source."
            }
            # Additional main sources...
        ]
    )
    quotes: List[Dict[str, Any]] = Field(
        ...,
        description="Quotes relevant to the topic, along with their sources.",
        example=[
            {
                "quote": "A relevant quote from a source.",
                "source": "Source Title or URL"
            }
            # Additional quotes...
        ]
    )
    references: List[Dict[str, Any]] = Field(
        ...,
        description="List of references used in the report.",
        example=[
            {
                "url": "https://example.com/reference",
                "keyQuote": "A key quote from the reference."
            }
            # Additional references...
        ]
    )

    class Config:
        json_schema_extra = {  # Updated from schema_extra to json_schema_extra
            "example": {
                "topic": "Your topic here",
                "report_title": "Your report title here",
                "report_content": [
                    {
                        "title": "Article Title",
                        "url": "https://example.com/article",
                        "description": "Brief description of the article.",
                        "published_time": "2023-01-01T00:00:00Z",
                        "key_points": ["Point 1", "Point 2"]
                    }
                    # Additional articles...
                ],
                "report_summary": "A summary of the search results.",
                "main_sources": [
                    {
                        "title": "Main Source Title",
                        "url": "https://example.com/source",
                        "description": "Description of the main source."
                    }
                    # Additional main sources...
                ],
                "quotes": [
                    {
                        "quote": "A relevant quote from a source.",
                        "source": "Source Title or URL"
                    }
                    # Additional quotes...
                ],
                "references": [
                    {
                        "url": "https://example.com/reference",
                        "keyQuote": "A key quote from the reference."
                    }
                    # Additional references...
                ]
            }
        }

# ==========================
# Agent Definitions
# ==========================

# Define the search agent
def create_search_agent(jina_search_tool: JinaSearchTool) -> Agent:
    return Agent(
        name="Search Agent",
        role="Performs searches on a given topic using the Jina Search Tool.",
        goal="Provide comprehensive search results related to the specified topic.",
        backstory=(
            "You are an AI agent specialized in performing topic-based searches using the Jina Search API. "
            "You generate a structured JSON report based on the search results. "
            "Ensure that the final report adheres to the predefined JSON schema, including fields like report title, content, summary, main sources, and quotes. "
            "Unless when using tools. Each '## Thought' block must also contain, in this exact format:\n"
            "Plan: [State your plan]\n"
            "Reasoning: [Explain the reasoning]\n"
            "Next Actions: [Outline Next Actions]\n"
        ),
        tools=[jina_search_tool],
        model="gpt-4-mini",  # Adjust the model as needed
        verbose=True,
    )

# ==========================
# Task Definition
# ==========================

# Define a Pydantic model for the task input
class SearchTaskInput(BaseModel):
    topic: str = Field(..., description="The topic to search for.")

# Define the search task with the JSON schema as expected_output
def create_search_task(search_agent: Agent, SearchReportOutput: BaseModel) -> Task:
    return Task(
        name="Search Task",
        description=(
            "Perform a search on the topic: {topic} using the Jina Search Tool. "
            "Generate a comprehensive JSON report that includes report title, report content, report summary, main sources, quotes, and references."
            "Absolutely do not enclose the final answer JSON in ´´´json and ´´´"
        ),
        expected_output=(
            "{{\n"
            '  "topic": "string",\n'
            '  "report_title": "string",\n'
            '  "report_content": [\n'
            "    {{\n"
            '      "title": "string",\n'
            '      "url": "string",\n'
            '      "description": "string",\n'
            '      "published_time": "string (ISO 8601 format)",\n'
            '      "key_points": ["string"]\n'
            "    }}\n"
            "  ],\n"
            '  "report_summary": "string",\n'
            '  "main_sources": [\n'
            "    {{\n"
            '      "title": "string",\n'
            '      "url": "string",\n'
            '      "description": "string"\n'
            "    }}\n"
            "  ],\n"
            '  "quotes": [\n'
            "    {{\n"
            '      "quote": "string",\n'
            '      "source": "string"\n'
            "    }}\n"
            "  ],\n"
            '  "references": [\n'
            "    {{\n"
            '      "url": "string",\n'
            '      "keyQuote": "string"\n'
            "    }}\n"
            "  ]\n"
            "}}"
        ).replace("{", "{{").replace("}", "}}"),  # Correctly escaped for JSON
        agent=search_agent,
        output_json=SearchReportOutput,
    )

# ==========================
# Crew Assembly and Execution
# ==========================

def main():
    # Parse command-line arguments
    parser = argparse.ArgumentParser(description="Perform a topic-based search and generate a comprehensive JSON report.")
    parser.add_argument('--topic', type=str, required=True, help='The topic to search for.')
    args = parser.parse_args()

    topic_input = args.topic

    # Retrieve API keys from environment variables
    JINA_API_KEY = os.getenv("JINA_API_KEY")
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

    if not JINA_API_KEY or not OPENAI_API_KEY:
        logger.error("API keys for JINA_API_KEY and OPENAI_API_KEY must be set as environment variables.")
        sys.exit(1)

    logger.info(f"Starting search task for topic: {topic_input}")

    # Instantiate the search tool
    jina_search_tool = JinaSearchTool()

    # Define the search agent
    search_agent = create_search_agent(jina_search_tool)

    # Define the search task
    search_task = create_search_task(search_agent, SearchReportOutput)

    # Assemble the Crew
    crew = Crew(
        agents=[search_agent],
        tasks=[search_task],
        verbose=True,
        output_log_file="search_output_log.txt"
    )

    # Define the input for the task
    task_input = {
        "topic": topic_input
    }

    # Execute the task
    output = crew.kickoff(inputs=task_input)

if __name__ == "__main__":
    main()
