import os
from openai import OpenAI
from pydantic import BaseModel, ValidationError

# Initialize the OpenAI client
client = OpenAI()

class ThoughtProcessResponse(BaseModel):
    thought_process: list[str]

# Define supported languages
SUPPORTED_LANGUAGES = ['en', 'pt', 'es']

# Prompt templates for different functions and languages
PROMPT_TEMPLATES = {
    'verify': {
        'en': {
            'system': "You are a fact-checking agent working on validating claims.",
            'user': "The claim is: '{claim}'. Please generate 20 distinct, general phrases that represent different stages of your thought process while investigating this claim. The phrases should be a mix of generic enough to apply to any fact-checking scenario, such as checking sources, analyzing data, considering evidence, and crafting conclusions. With minor mentioning to the claim itself in some of the items."
        },
        'pt': {
            'system': "Você é um agente de verificação de fatos trabalhando na validação de afirmações.",
            'user': "A afirmação é: '{claim}'. Por favor, gere 20 frases distintas e gerais que representem diferentes estágios do seu processo de pensamento enquanto investiga essa afirmação. As frases devem ser suficientemente genéricas para se aplicarem a qualquer cenário de verificação de fatos, como verificar fontes, analisar dados, considerar evidências e elaborar conclusões, com menções menores à própria afirmação em alguns dos itens."
        },
        'es': {
            'system': "Eres un agente de verificación de hechos que trabaja en validar afirmaciones.",
            'user': "La afirmación es: '{claim}'. Por favor, genera 20 frases distintas y generales que representen diferentes etapas de tu proceso de pensamiento mientras investigas esta afirmación. Las frases deben ser lo suficientemente genéricas para aplicarse a cualquier escenario de verificación de hechos, como verificar fuentes, analizar datos, considerar evidencia y elaborar conclusiones, con menciones menores a la propia afirmación en algunos de los ítems."
        }
    },
    'search': {
        'en': {
            'system': "You are a researcher working on a report based on web sources.",
            'user': "The topic is: '{topic}'. Please generate 20 distinct, general phrases that represent different stages of your thought process while performing the web search. The phrases should be a mix of generic enough to apply to any research scenario, such as checking sources, analyzing data, considering evidence, and crafting conclusions. With minor mentioning to the topic itself in some of the items."
        },
        'pt': {
            'system': "Você é um pesquisador trabalhando em um relatório baseado em fontes da web.",
            'user': "O tópico é: '{topic}'. Por favor, gere 20 frases distintas e gerais que representem diferentes estágios do seu processo de pensamento enquanto realiza a pesquisa na web. As frases devem ser suficientemente genéricas para se aplicarem a qualquer cenário de pesquisa, como verificar fontes, analisar dados, considerar evidências e elaborar conclusões, com menções menores ao próprio tópico em alguns dos itens."
        },
        'es': {
            'system': "Eres un investigador que trabaja en un informe basado en fuentes web.",
            'user': "El tema es: '{topic}'. Por favor, genera 20 frases distintas y generales que representen diferentes etapas de tu proceso de pensamiento mientras realizas la búsqueda web. Las frases deben ser lo suficientemente genéricas para aplicarse a cualquier escenario de investigación, como verificar fuentes, analizar datos, considerar evidencia y elaborar conclusiones, con menciones menores al propio tema en algunos de los ítems."
        }
    },
    'read': {
        'en': {
            'system': "You are a fact-checking agent working on validating claims and researching content.",
            'user': "The topic is: '{topic}', and the main source URL is: {url}. Please generate 20 distinct, general phrases that represent different stages of your thought process while researching and analyzing this topic. The phrases should be generic enough to apply to any fact-checking scenario, including evaluating sources, verifying information, analyzing data, and drawing conclusions, with some referencing the topic or source."
        },
        'pt': {
            'system': "Você é um agente de verificação de fatos trabalhando na validação de afirmações e na pesquisa de conteúdo.",
            'user': "O tópico é: '{topic}', e a URL principal da fonte é: {url}. Por favor, gere 20 frases distintas e gerais que representem diferentes estágios do seu processo de pensamento enquanto pesquisa e analisa este tópico. As frases devem ser suficientemente genéricas para se aplicarem a qualquer cenário de verificação de fatos, incluindo avaliar fontes, verificar informações, analisar dados e tirar conclusões, com algumas referências ao tópico ou à fonte."
        },
        'es': {
            'system': "Eres un agente de verificación de hechos que trabaja en validar afirmaciones e investigar contenido.",
            'user': "El tema es: '{topic}', y la URL principal de la fuente es: {url}. Por favor, genera 20 frases distintas y generales que representen diferentes etapas de tu proceso de pensamiento mientras investigas y analizas este tema. Las frases deben ser lo suficientemente genéricas para aplicarse a cualquier escenario de verificación de hechos, incluyendo evaluar fuentes, verificar información, analizar datos y sacar conclusiones, con algunas referencias al tema o a la fuente."
        }
    }
}

def get_prompt(function_type: str, language: str, **kwargs) -> dict:
    """
    Retrieves the appropriate prompt based on the function type and language.
    
    Args:
        function_type (str): The type of function ('verify', 'search', 'read').
        language (str): The language code ('en', 'pt', 'es').
        **kwargs: Additional keyword arguments to format the prompt.
    
    Returns:
        dict: A dictionary containing 'system' and 'user' prompts.
    """
    language = language.lower()
    if language not in SUPPORTED_LANGUAGES:
        print(f"Unsupported language '{language}'. Falling back to English.")
        language = 'en'
    
    prompts = PROMPT_TEMPLATES.get(function_type, {}).get(language)
    if not prompts:
        raise ValueError(f"No prompts found for function '{function_type}' and language '{language}'.")
    
    # Format the user prompt with the provided arguments
    user_content = prompts['user'].format(**kwargs)
    return {
        "role": "system",
        "content": prompts['system']
    }, {
        "role": "user",
        "content": user_content
    }

def generate_thinking_process_prompts_verify(claim: str, language: str = 'en') -> ThoughtProcessResponse:
    """
    Generates thought process prompts for verifying a claim.
    
    Args:
        claim (str): The claim to verify.
        language (str): The language code ('en', 'pt', 'es').
    
    Returns:
        ThoughtProcessResponse: The parsed response containing thought process phrases.
    """
    system_msg, user_msg = get_prompt('verify', language, claim=claim)
    messages = [system_msg, user_msg]

    try:
        # Call OpenAI API to generate structured output
        completion = client.beta.chat.completions.parse(
            model="gpt-4o-mini",
            messages=messages,
            response_format=ThoughtProcessResponse
        )
        return completion.choices[0].message.parsed
    except ValidationError as e:
        print("Error parsing response:", e)
        return ThoughtProcessResponse(thought_process=[])
    except Exception as e:
        print("An error occurred:", e)
        return ThoughtProcessResponse(thought_process=[])

def generate_thinking_process_prompts_search(topic: str, language: str = 'en') -> ThoughtProcessResponse:
    """
    Generates thought process prompts for performing a web search on a topic.
    
    Args:
        topic (str): The topic to search.
        language (str): The language code ('en', 'pt', 'es').
    
    Returns:
        ThoughtProcessResponse: The parsed response containing thought process phrases.
    """
    system_msg, user_msg = get_prompt('search', language, topic=topic)
    messages = [system_msg, user_msg]

    try:
        # Call OpenAI API to generate structured output
        completion = client.beta.chat.completions.parse(
            model="gpt-4o-mini",
            messages=messages,
            response_format=ThoughtProcessResponse
        )
        return completion.choices[0].message.parsed
    except ValidationError as e:
        print("Error parsing response:", e)
        return ThoughtProcessResponse(thought_process=[])
    except Exception as e:
        print("An error occurred:", e)
        return ThoughtProcessResponse(thought_process=[])

def generate_thinking_process_prompts_read(url: str, topic: str, language: str = 'en') -> ThoughtProcessResponse:
    """
    Generates thought process prompts for researching and analyzing a topic from a URL.
    
    Args:
        url (str): The source URL.
        topic (str): The topic to research.
        language (str): The language code ('en', 'pt', 'es').
    
    Returns:
        ThoughtProcessResponse: The parsed response containing thought process phrases.
    """
    system_msg, user_msg = get_prompt('read', language, topic=topic, url=url)
    messages = [system_msg, user_msg]

    try:
        # Call OpenAI API to generate structured output
        completion = client.beta.chat.completions.parse(
            model="gpt-4o-mini",
            messages=messages,
            response_format=ThoughtProcessResponse
        )
        return completion.choices[0].message.parsed
    except ValidationError as e:
        print("Error parsing response:", e)
        return ThoughtProcessResponse(thought_process=[])
    except Exception as e:
        print("An error occurred:", e)
        return ThoughtProcessResponse(thought_process=[])

if __name__ == "__main__":
    # Example usage
    claim = "Trump was elected"
    topic = "Climate Change"
    url = "https://example.com/article"

    # Verify claim in English
    thought_process_response_en = generate_thinking_process_prompts_verify(claim, language='en')
    print("Verify Claim (EN):")
    print(thought_process_response_en.json())

    # Search topic in Portuguese
    thought_process_response_pt = generate_thinking_process_prompts_search(topic, language='pt')
    print("\nSearch Topic (PT):")
    print(thought_process_response_pt.json())

    # Read and analyze URL in Spanish
    thought_process_response_es = generate_thinking_process_prompts_read(url, topic, language='es')
    print("\nRead and Analyze (ES):")
    print(thought_process_response_es.json())
