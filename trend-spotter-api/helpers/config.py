import os
from dotenv import load_dotenv

# Load environment variables from .env file if it exists
load_dotenv()

def get_variable(variable_name: str):
    value = os.getenv(variable_name)
    if not value:
        print(f"Environment variable {variable_name} is not set")
        return "ERROR: Environment variable {variable_name} is not set"
    return value

def get_config():
    config = {}
    config["YOUTUBE_API_KEY"] = get_variable("YOUTUBE_API_KEY")
    
    for key, value in config.items():
        if isinstance(value, str) and value.startswith("ERROR:"):
            raise RuntimeError(f"Configuration error for {key}: {value}")

    return config


config = get_config()