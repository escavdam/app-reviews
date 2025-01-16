import uuid
import hashlib
import time
import os

COOKIE_SECRET=""



def generate_api_key():
    # Generate a unique ID based on the current time and a random UUID
    unique_str = str(uuid.uuid4()) + str(time.time())
    
    # Create a hashed version of the string (for security)
    api_key = hashlib.sha256(unique_str.encode()).hexdigest()
    
    return api_key

def create_env_file(api_key):
    # Get the current working directory (root of the project)
    root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
    
    # Define the .env file path in the root directory
    env_file_path = os.path.join(root_dir, '.env')
    
    # Prepare the content for the .env file
    env_content = f'COOKIE_SECRET="{api_key}"\nAPIKEY=\"APIKEY\"'
    
    # Write to the .env file
    with open(env_file_path, 'w') as file:
        file.write(env_content)
    
    print(f".env file created with COOKIE_SECRET and APIKEY.")

# Generate API key
api_key = generate_api_key()

# Create .env file
create_env_file(api_key)
