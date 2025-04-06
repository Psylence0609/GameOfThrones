import os

LOG_DIR = "logs"
CHROMA_DB_PATH = "chromadb"
SQLITE_DB_PATH = "sqlite"   
PROJECT_DIR = os.getcwd()
PROMPTS_DIR = os.path.join(PROJECT_DIR, "Prompts")
PERSONALITIES_DIR = os.path.join(PROJECT_DIR, "Personalities")
CONNECTION_NAME = "Test"

# MODEL = 'llama3.1'
# MODEL = 'gemini'
MODEL = 'groq'
GEMINI_API_KEY = ''
GEMINI_MODEL = 'gemini-2.0-flash-001'

GROQ_API_KEY = "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"
GROQ_MODEL = "llama3-70b-8192"