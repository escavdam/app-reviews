# If you want to run this script launch python3 utilities/envGen.py

import uuid
import hashlib
import time
import os
import re

COOKIE_SECRET = ""
ADMIN_PASSWORD_HASH = ""

def generate_api_key():
    # Generate a unique ID based on the current time and a random UUID
    unique_str = str(uuid.uuid4()) + str(time.time())
    
    # Create a hashed version of the string (for security)
    api_key = hashlib.sha256(unique_str.encode()).hexdigest()
    
    return api_key

def extract_admin_password_hash(js_file_path):
    # Open the database.js file and extract the admin password hash using regex
    with open(js_file_path, 'r') as file:
        content = file.read()
    
    # Regex pattern to find the adminPasswordHash value
    pattern = r"const adminPasswordHash = '(.*)';"
    match = re.search(pattern, content)
    
    if match:
        return match.group(1)
    else:
        raise ValueError("Admin password hash not found in database.js.")

def create_env_file(api_key, admin_password_hash):
    # Get the current working directory (root of the project)
    root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
    
    # Define the .env file path in the root directory
    env_file_path = os.path.join(root_dir, '.env')
    
    # Prepare the content for the .env file
    env_content = f'COOKIE_SECRET="{api_key}"\nAPIKEY="APIKEY"\nADMIN_PASSWORD_HASH="{admin_password_hash}"'
    
    # Write to the .env file
    with open(env_file_path, 'w') as file:
        file.write(env_content)
    
    print(f".env file created with COOKIE_SECRET, APIKEY, and ADMIN_PASSWORD_HASH.")

# Path to the database.js file in the root directory
js_file_path = os.path.join(os.path.dirname(__file__), '..', 'database.js')

# Extract admin password hash from the database.js file
admin_password_hash = extract_admin_password_hash(js_file_path)

# Generate API key
api_key = generate_api_key()

# Create .env file
create_env_file(api_key, admin_password_hash)
