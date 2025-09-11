import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("GOOGLE_API_KEY")
if not api_key:
    raise ValueError("GOOGLE_API_KEY not found in .env file")
genai.configure(api_key=api_key)

# Initialize the model once to be reused
model = genai.GenerativeModel('gemini-1.5-flash-latest')

def translate_to_english(text: str) -> str:
    """
    Detects the language of the text and translates it to English if it's not already English.
    """
    if not text.strip():
        return "" # Return empty if no text

    # A robust prompt that handles both cases (English and non-English text)
    prompt = f"""
    Detect the language of the following text.
    - If the language is English, return the original text unmodified.
    - If the language is not English, translate the entire text into English.

    Here is the text:
    ---
    {text}
    ---
    """
    
    try:
        print("Translating text to English...")
        response = model.generate_content(prompt)
        print("Translation successful.")
        return response.text.strip()
    except Exception as e:
        print(f"Error during translation: {e}")
        # In case of translation failure, we'll try to summarize the original text
        return text

def get_summary_prompt(text: str, length: str) -> str:
    """Creates a specific prompt for summarization."""
    if length == 'short':
        return f"Summarize the following English text into a single, concise paragraph:\n\n{text}"
    elif length == 'medium':
        return f"Provide a three-paragraph summary of the following English text, highlighting the main arguments and conclusions:\n\n{text}"
    else: # long
        return f"Create a detailed and well-structured summary of the following English document. Include all key points, supporting evidence, and main ideas:\n\n{text}"

def generate_summary(text: str, length: str) -> str:
    """Generates a summary of the provided text."""
    if not text.strip():
        return "The document appears to be empty or contains no readable text."

    prompt = get_summary_prompt(text, length)

    try:
        print(f"Generating {length} summary...")
        response = model.generate_content(prompt)
        print("Summary generation successful.")
        return response.text.strip()
    except Exception as e:
        print(f"Error calling Google Gemini API for summarization: {e}")
        raise Exception(f"Failed to generate summary with Gemini API. Details: {e}")