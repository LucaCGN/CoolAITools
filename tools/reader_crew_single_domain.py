import os
import logging
import requests
import argparse  # Added for command-line argument parsing
from crewai import Agent, Task, Crew, Process
from crewai_tools import BaseTool
from pydantic import BaseModel, Field, ValidationError, validator
from typing import List, Dict, Any, Optional


# Configure Logging to a file to prevent cluttering stdout
logging.basicConfig(
    filename='logs/reader_crew_log.txt',
    filemode='a',
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)


# ==========================
# Tool Definitions
# ==========================
class JinaReaderToolArgs(BaseModel):
    url: str

class JinaReaderTool(BaseTool):
    name: str = "jina_reader_tool"
    description: str = "Fetches and processes content from a given URL using the Jina Reader API."
    args_schema = JinaReaderToolArgs

    def _run(self, url: str) -> dict:
        logger.debug(f"Fetching content for URL: {url}")
        headers = {
            "Accept": "application/json",
            "Authorization": f"Bearer {os.getenv('JINA_API_KEY')}"
        }
        try:
            encoded_url = requests.utils.quote(url, safe='')
            api_url = f'https://r.jina.ai/{encoded_url}'
            response = requests.get(api_url, headers=headers, timeout=10)
            response.raise_for_status()
            data = response.json().get('data', {})

            if not data:
                logger.warning(f"No data returned for URL: {url}")

            return {
                "title": data.get("title", ""),
                "content": data.get("content", ""),
                "url": data.get("url", ""),
                "links": data.get("links", {})
            }
        except requests.RequestException as e:
            logger.error(f"Failed to retrieve data for {url}: {e}")
            return {"error": f"Failed to retrieve data for {url}: {e}"}

# Instantiate the tool
jina_reader_tool = JinaReaderTool()



# ==========================
# JSON Schema Definition
# ==========================

class Section(BaseModel):
    title: str = Field(..., description="The title of the section.")
    content: str = Field(..., description="The content of the section.")
    subsections: Optional[List['Subsection']] = Field(
        None, description="List of subsections within the section."
    )

class Subsection(BaseModel):
    title: str = Field(..., description="The title of the subsection.")
    content: str = Field(..., description="The content of the subsection.")

class DetailedContentSummary(BaseModel):
    introduction: str = Field(..., description="Provides an introduction to the topic or content overview.")
    main_sections: Dict[str, str] = Field(
        ..., description="Dictionary of main sections with their respective content."
    )
    key_points: List[str] = Field(..., description="Bullet points summarizing the main findings or insights.")

class ExtractedLink(BaseModel):
    url: str = Field(..., description="The URL of the extracted link.")
    description: str = Field(..., description="A description of the extracted link's content.")



class FetchedLinkContent(BaseModel):
    url: str = Field(..., description="The URL of the fetched link.")
    content_summary: str = Field(..., description="A detailed summary of the fetched link's content.")
    key_insights: List[str] = Field(..., description="Key insights derived from the fetched link.")



class DetailedAnalysis(BaseModel):
    thematic_analysis: Optional[str] = Field(None, description="In-depth thematic analysis of the content.")
    trend_analysis: Optional[str] = Field(None, description="Analysis of trends identified in the content.")
    comparative_analysis: Optional[str] = Field(None, description="Comparative analysis with related topics or data.")
    actionable_insights: Optional[List[str]] = Field(
        None, description="Actionable insights derived from the analysis."
    )

class Metadata(BaseModel):
    scraped_at: Optional[str] = Field(None, description="Timestamp when the content was scraped.")
    source_language: Optional[str] = Field(None, description="Language of the source content.")
    content_type: Optional[str] = Field(None, description="Type of the content, e.g., HTML, JSON.")

class WebScrapingReportOutput(BaseModel):
    topic: str = Field(..., description="The topic being analyzed.")
    url: str = Field(..., description="The URL of the page being scraped.")
    detailed_content_summary: DetailedContentSummary = Field(
        ..., description="A comprehensive summary of the scraped content, including sections and key points."
    )
    extracted_links: Optional[List[ExtractedLink]] = Field(
        None,
        description="List of extracted links deemed relevant.",
        example=[
            {
                "url": "https://example.com/related-page",
                "description": "Description of the related page.",
            }
        ]
    )
    fetched_links_content: Optional[List[FetchedLinkContent]] = Field(
        None,
        description="Detailed content summaries of fetched relevant links.",
        example=[
            {
                "url": "https://example.com/related-page",
                "content_summary": "Detailed summary of the related page's content.",
                "key_insights": ["Insight 1", "Insight 2"]
            }
        ]
    )
    detailed_analysis: Optional[DetailedAnalysis] = Field(
        None, description="Comprehensive analysis of the scraped content."
    )
    related_topics: Optional[List[str]] = Field(
        None, description="List of topics related to the main topic."
    )
    metadata: Optional[Metadata] = Field(
        None, description="Additional metadata related to the scraping task."
    )
    conclusion: Optional[str] = Field(
        None, description="Detailed conclusion based on the analysis."
    )

    class Config:
        json_schema_extra = {
            "example": {
                "topic": "Sample Topic",
                "url": "https://example.com",
                "detailed_content_summary": {
                    "introduction": "Introduction to the topic.",
                    "main_sections": {
                        "section1": "Overview of the first aspect.",
                        "section2": "Discussion of the second aspect.",
                        "section3": "Insights into the third aspect.",
                        "section4": "Insights into the fourth aspect.",
                        "section5": "Insights into the fifth aspect."
                    },
                    "key_points": ["Point A", "Point B", "Point C", "Point D", "Point E"]
                },
                "extracted_links": [
                    {
                        "url": "https://example.com/related-page",
                        "description": "Description of the related page.",
                    }
                ],
                "fetched_links_content": [
                    {
                        "url": "https://example.com/related-page",
                        "content_summary": "Comprehensive summary of the related page's content.",
                        "key_insights": ["Insight 1: Detail about insight.", "Insight 2: Another detail.","Insight N: Another detail., as Much as need to fully capture main concepts"]
                    }
                ],
                "detailed_analysis": {
                    "thematic_analysis": "In-depth analysis of key themes related to the topic.",
                    "trend_analysis": "Identification and analysis of emerging trends.",
                    "comparative_analysis": "Comparison with related topics or previous data.",
                    "data_sources": "List and description of data sources utilized in the analysis.",
                    "data_quality_assessment": "Evaluation of the quality, reliability, and validity of the data sources.",
                    "main_findings": "Summary of key findings derived from the analysis.",
                    "actionable_insights": ["Actionable Insight 1.", "Actionable Insight 2.", "Actionable Insight 3.", "Actionable Insight 4."]
                },
                "related_topics": ["Related Topic 1", "Related Topic 2","Related Topic 3","Related Topic 4","Related Topic 5"],
                "metadata": {
                    "scraped_at": "2024-04-27T12:00:00Z",
                    "source_language": "en",
                    "content_type": "HTML"
                },
                "conclusion": "A comprehensive conclusion based on the analysis, highlighting key findings and recommendations."
            }
        }

# Register forward references
DetailedContentSummary.update_forward_refs()
Section.update_forward_refs()
Subsection.update_forward_refs()

# ==========================
# Agent Definitions
# ==========================
web_scraper_agent = Agent(
    role='Web Content Scraper',
    goal=(
        "Thoroughly analyze academic content from specified URLs, extracting detailed information and evaluating the relevance of related links. "
        "Decide judiciously whether to fetch and process these related links to build a comprehensive and well-structured report that meets scholarly standards."
    ),  # Enhanced Goal
    backstory=(
        "You are an AI agent specialized in gathering and analyzing academic web content with precision and depth. "
        "Your expertise lies in discerning the quality and relevance of information from diverse scholarly sources. "
        "When encountering additional links, you must critically evaluate their pertinence and decide whether to fetch and analyze them to enrich the overall report. "
        "Ensure that all findings are well-supported by credible references and contribute meaningfully to the topic under analysis."
    ),  # Enhanced Backstory

    tools=[jina_reader_tool],
    verbose=True,
    memory=True
)

# ==========================
# Task Definitions
# ==========================
scraping_task = Task(
    description=(
        "Thoroughly analyze the content from the provided URL: {url} with a focus on the academic topic: '{topic}'. "
        "Develop a comprehensive and detailed report that includes an introduction, main sections, key points, and a conclusion. "
        "Ensure that the report covers all relevant aspects, such as methodology, data sources, and potential biases. "
        "Identify and evaluate any related links within the main content for their relevance and credibility. "
        "If deemed pertinent, follow and analyze these links to incorporate additional insights into the report, ensuring they remain within the original domain. "
        "The final output should be a well-structured JSON report containing 'topic', 'url', 'detailed_content_summary', 'extracted_links', 'fetched_links_content', 'detailed_analysis', 'related_topics', 'metadata', and 'conclusion'. "
        "detailed_content_summary -> this section in the json should be a summary in terms of concept, but several paragraphs long, data driven when the topic ('{topic}') requests. "
        "Ensure that the JSON is properly formatted without enclosing it in any code blocks."
    ),
    expected_output = (
        "{{\n"
        '  "topic": "string",\n'
        '  "url": "string",\n'
        '  "detailed_content_summary": {{\n'
        '    "introduction": "string",\n'
        '    "main_sections": {{\n'
        '      "section1": "string",\n'
        '      "section2": "string",\n'
        '      "section3": "string"\n'
        '      "section4": "string"\n'
        '      "section5": "string"\n'
        "    }},\n"
        '    "key_points": ["string"]\n'
        "  }},\n"
        '  "extracted_links": [\n'
        "    {{\n"
        '      "url": "string",\n'
        '      "description": "string",\n'
        "    }}\n"
        "  ],\n"
        '  "fetched_links_content": [\n'
        "    {{\n"
        '      "url": "string",\n'
        '      "content_summary": "string",\n'
        '      "key_insights": ["string"]\n'
        "    }}\n"
        "  ],\n"
        '  "detailed_analysis": {{\n'
        '    "thematic_analysis": "string",\n'
        '    "trend_analysis": "string",\n'
        '    "comparative_analysis": "string",\n'
        '    "data_sources": "string",\n'
        '    "data_quality_assessment": "string",\n'        
        '    "actionable_insights": ["string"]\n'
        '    "main_findings": ["string"]\n'
        "  }},\n"
        '  "related_topics": ["string"],\n'
        '  "metadata": {\n'
        '    "key": "value"\n'
        "  },\n"
        '  "conclusion": "string"\n'
        "}}"
    ).replace("{", "{{").replace("}", "}}"),
    agent=web_scraper_agent,
    output_json=WebScrapingReportOutput  # Use the Pydantic model as the output schema
)

# ==========================
# Crew Assembly
# ==========================
web_scraping_crew = Crew(
    agents=[web_scraper_agent],
    tasks=[scraping_task],
    process=Process.sequential,
    verbose=True,
    output_log_file="web_scraping_output_log.txt"
)

# ==========================
# Execute the Task
# ==========================
if __name__ == "__main__":
    # Initialize the argument parser
    parser = argparse.ArgumentParser(
        description="Web Scraping Crew Script",
        formatter_class=argparse.ArgumentDefaultsHelpFormatter
    )
    parser.add_argument(
        "--topic",
        type=str,
        required=True,
        help="The topic to analyze (e.g., 'Health Benefits of Intermittent Fasting')."
    )
    parser.add_argument(
        "--url",
        type=str,
        required=True,
        help="The URL of the page to scrape (e.g., 'https://www.healthline.com/')."
    )

    # Parse the command-line arguments
    args = parser.parse_args()

    # Define input data for the task based on command-line arguments
    input_data = {
        "topic": args.topic,
        "url": args.url
    }

    # Execute the task
    try:
        output = web_scraping_crew.kickoff(inputs=input_data)


    except Exception as e:
        logger.error(f"An error occurred during task execution: {e}")
