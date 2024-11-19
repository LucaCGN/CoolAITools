import os
from openai import OpenAI
from pydantic import BaseModel


client = OpenAI()

class ThoughtProcessResponse(BaseModel):
    thought_process: list[str]

def generate_thinking_process_prompts_verify(claim: str) -> ThoughtProcessResponse:
    # Define the messages to guide the OpenAI model
    messages = [
        {"role": "system", "content": "You are a fact-checking agent working on validating claims."},
        {"role": "user", "content": f"The claim is: '{claim}'. Please generate 20 distinct, general phrases that represent different stages of your thought process while investigating this claim. The phrases should be a mix of generic enough to apply to any fact-checking scenario, such as checking sources, analyzing data, considering evidence, and crafting conclusions. With minor mentioning to the claim itself in some of the itens"}
    ]

    # Call OpenAI API to generate structured output
    completion = client.beta.chat.completions.parse(
        model="gpt-4o-mini",
        messages=messages,
        response_format=ThoughtProcessResponse
    )

    return completion.choices[0].message.parsed

def generate_thinking_process_prompts_search(topic: str) -> ThoughtProcessResponse:
    # Define the messages to guide the OpenAI model
    messages = [
        {"role": "system", "content": "You are a researcher working on a report based on web sources."},
        {"role": "user", "content": f"The topic is: '{topic}'. Please generate 20 distinct, general phrases that represent different stages of your thought process while performing the web search. The phrases should be a mix of generic enough to apply to any fact-checking scenario, such as checking sources, analyzing data, considering evidence, and crafting conclusions. With minor mentioning to the topic itself in some of the itens"}
    ]

    # Call OpenAI API to generate structured output
    completion = client.beta.chat.completions.parse(
        model="gpt-4o-mini",
        messages=messages,
        response_format=ThoughtProcessResponse
    )

    return completion.choices[0].message.parsed

def generate_thinking_process_prompts_read(url: str, topic: str) -> ThoughtProcessResponse:
    # Define the messages to guide the OpenAI model
    messages = [
        {"role": "system", "content": "You are a fact-checking agent working on validating claims and researching content."},
        {"role": "user", "content": f"The topic is: '{topic}', and the main source URL is: {url}. Please generate 20 distinct, general phrases that represent different stages of your thought process while researching and analyzing this topic. The phrases should be generic enough to apply to any fact-checking scenario, including evaluating sources, verifying information, analyzing data, and drawing conclusions, with some referencing the topic or source."}
    ]

    # Call OpenAI API to generate structured output
    completion = client.beta.chat.completions.parse(
        model="gpt-4o-mini",
        messages=messages,
        response_format=ThoughtProcessResponse
    )


    return completion.choices[0].message.parsed
if __name__ == "__main__":
    # Example usage
    claim = "trump was elected"
    thought_process_response = generate_thinking_process_prompts_verify(claim)
    print(thought_process_response.json())
