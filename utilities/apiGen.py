import uuid
import hashlib
import time

def generate_api_key():
    # Generate a unique ID based on the current time and a random UUID
    unique_str = str(uuid.uuid4()) + str(time.time())
    
    # Create a hashed version of the string (for security)
    api_key = hashlib.sha256(unique_str.encode()).hexdigest()
    
    return api_key

# Example usage
api_key = generate_api_key()
print(f"Your generated API key: {api_key}")
