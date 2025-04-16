from langchain_ollama import ChatOllama
from config import MODEL, GEMINI_API_KEY, GEMINI_MODEL, GROQ_API_KEY, GROQ_MODEL
from google import genai
from langchain_groq import ChatGroq
import time
import random

def get_llm():
    """
    Initialize the language model (either Ollama or Gemini based on configuration).
    """
    print("Initializing LLM...")
    
    # You can toggle between models based on configuration
    if MODEL == "gemini":
        llm = get_gemini_llm()  # Use Gemini model
    elif MODEL == "groq":
        llm = get_groq_llm()  # Use Groq model
    else:
        llm = get_ollama_llm()  # Default to Ollama model
    
    return llm

def get_ollama_llm():
    """
    Initialize and return the Ollama LLM.
    """
    print("Initializing Ollama model...")
    llm = ChatOllama(model=MODEL)
    return llm

def get_groq_llm():
    """
    Initialize and return the Groq LLM.
    """
    print("Initializing Groq model...")
    llm = ChatGroq(api_key=GROQ_API_KEY, model=GROQ_MODEL)
    return llm

def get_gemini_llm():
    """
    Initialize and return the Gemini LLM using the Google Gen AI SDK.
    """
    print("Initializing Gemini model...")
    
    # Initialize the Google Gen AI client with the provided API key
    client = genai.Client(api_key=GEMINI_API_KEY)

    return client
        
def request_ollama(prompt, max_retries=5, base_delay=2):
    """
    Function to request a response from the LLM with exponential backoff handling for rate limits.
    """
    llm = get_llm()

    for attempt in range(max_retries):
        if isinstance(llm, genai.Client): 
            try:
                response = llm.models.generate_content(
                    model=GEMINI_MODEL, contents=prompt
                )
                return response.text
            except Exception as e:
                if "Too Many Requests" in str(e) or "429" in str(e):
                    wait_time = base_delay * (2 ** attempt) + random.uniform(0, 1)
                    print(f"Rate limit hit for Gemini. Retrying in {wait_time:.2f}s (Attempt {attempt + 1})...")
                    time.sleep(wait_time)
                else:
                    print(f"Error generating content from Gemini: {e}")
                    return None
        else:
            try:
                res = llm.invoke(prompt)
                time.sleep(5)
                return res.content
            except Exception as e:
                if "Too Many Requests" in str(e) or "429" in str(e):
                    wait_time = base_delay * (2 ** attempt) + random.uniform(0, 1)
                    print(f"Rate limit hit for Ollama. Retrying in {wait_time:.2f}s (Attempt {attempt + 1})...")
                    time.sleep(wait_time)
                else:
                    print(f"Error generating content from Ollama: {e}")
                    return None

    raise Exception("Exceeded max retries due to rate limiting.")

