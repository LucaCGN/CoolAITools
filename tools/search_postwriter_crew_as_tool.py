import os
import sys
import argparse
import requests
import csv
from crewai import Agent, Task, Crew
from crewai_tools import BaseTool
from pydantic import BaseModel, Field
import logging
from typing import List, Optional

# Configure Logging to a file to prevent cluttering stdout
logging.basicConfig(
    filename='logs/research_post_log.txt',
    filemode='a',
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

# ==========================
# Tool Definitions
# ==========================
class JinaSearchToolArgs(BaseModel):
    topic: str = Field(..., description="The topic to search for.")

class JinaSearchTool(BaseTool):
    name: str = "jina_search_tool"
    description: str = "Searches content related to a topic using the Jina Search API."
    args_schema = JinaSearchToolArgs

    def _run(self, topic: str) -> List[str]:
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
            return [item.get('content', '') for item in data]
        else:
            logger.error(f"Search failed for topic '{topic}' with status code: {response.status_code}")
            return []

# ==========================
# Agent Definitions
# ==========================
def create_search_postwriter_agent(jina_search_tool: JinaSearchTool) -> Agent:
    return Agent(
        name="Search and Post Writer Agent",
        role="Conducts a search on the given topic and writes an engaging LinkedIn post.",
        goal=(
            "Search for relevant content and materials related to the topic using the Jina Search Tool. "
            "Use the search results and source materials to write a compelling LinkedIn post. "
            "The post must be engaging, concise, and highlight key insights or takeaways."
        ),
        backstory=(
            "You are an AI agent specialized in researching topics and crafting LinkedIn posts. "
            "Your mission is to provide value through well-researched, engaging, and impactful content. "
            "You analyze search results and transform the most relevant points into a professional post."
        ),
        tools=[jina_search_tool],
        model="gpt-4-mini",
        verbose=True
    )

# ==========================
# Task Definition
# ==========================
def create_post_writing_task(search_postwriter_agent: Agent, topic: str) -> Task:
    return Task(
        name="Post Writing Task",
        description=(
            "Conduct a thorough search on the topic '{topic}' using the Jina Search Tool. "
            "Analyze the search results and source materials to craft a professional and engaging LinkedIn post. "
            "The post should provide key insights, actionable takeaways, and a clear call-to-action to engage the audience. "
            "Ensure the tone is professional and the post aligns with LinkedIn's content style."
        ).format(topic=topic),
        expected_output=(
            "An engaging LinkedIn post based on the search results and topic analysis. "
            "The post should be concise, highlight key points, and include actionable insights or takeaways."
        ),
        agent=search_postwriter_agent
    )

# ==========================
# Crew Assembly and Execution
# ==========================
def main():
    # Parse command-line arguments
    parser = argparse.ArgumentParser(description="Search a topic and write an engaging LinkedIn post.")
    parser.add_argument('--post_content', type=str, required=True, help='The topic or content to base the LinkedIn post on.')
    parser.add_argument('--output_dir', type=str, required=True, help='The directory to save the output files (CSV and text).')
    args = parser.parse_args()

    topic_input = args.post_content
    output_dir = args.output_dir

    # Ensure the output directory exists
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    # Retrieve API keys from environment variables
    JINA_API_KEY = os.getenv("JINA_API_KEY")
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

    if not JINA_API_KEY or not OPENAI_API_KEY:
        logger.error("API keys for JINA_API_KEY and OPENAI_API_KEY must be set as environment variables.")
        sys.exit(1)

    logger.info(f"Starting post writing task for topic: {topic_input}")

    # Instantiate the search tool
    jina_search_tool = JinaSearchTool()

    # Define the search and post writer agent
    search_postwriter_agent = create_search_postwriter_agent(jina_search_tool)

    # Define the post writing task
    post_writing_task = create_post_writing_task(search_postwriter_agent, topic_input)

    # Assemble the Crew
    crew = Crew(
        agents=[search_postwriter_agent],
        tasks=[post_writing_task],
        verbose=True
    )

    # Define the input for the task
    task_input = {
        "topic": topic_input
    }

    # Execute the task
    crew_output = crew.kickoff(inputs=task_input)

    # Save LinkedIn post to a text file
    output_txt_file = os.path.join(output_dir, "linkedin_post.txt")
    try:
        with open(output_txt_file, 'w', encoding='utf-8') as f:
            f.write(crew_output.raw)
        logger.info(f"LinkedIn post saved to {output_txt_file}")
    except Exception as e:
        logger.error(f"Failed to save LinkedIn post to {output_txt_file}: {e}")

    # Save raw data to a CSV file
    output_csv_file = os.path.join(output_dir, "linkedin_post.csv")
    try:
        with open(output_csv_file, 'w', newline='', encoding='utf-8') as csvfile:
            writer = csv.writer(csvfile)
            writer.writerow(["Raw Output"])
            writer.writerow([crew_output.raw])
        logger.info(f"Raw output saved to {output_csv_file}")
    except Exception as e:
        logger.error(f"Failed to save raw output to {output_csv_file}: {e}")

    print(f"LinkedIn Post Output:\n{crew_output.raw}")


if __name__ == "__main__":
    main()
