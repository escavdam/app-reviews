import requests
from random import choice

nombres = ['maria', 'juan', 'pedro', 'luis', 'ana', 'laura', 'carlos', 'jose', 'jorge', 'lucia']
segundo_nombre = ['sanchez', 'perez', 'gomez', 'rodriguez', 'garcia', 'martinez', 'lopez', 'fernandez', 'gonzalez', 'diaz']

def post_user(username, password):
    response = requests.post(f'http://localhost:3000/api/register', json={'user': username, 'password': password})
    return response.json()

print("Testeando POST /api/users")
print(post_user(choice(nombres) + choice(segundo_nombre), '1234'))

def get_users():
    response = requests.get(f'http://localhost:3000/api/users')
    return response.json()

print("Testeando GET /api/users")
print(get_users())

def get_user(username):
    response = requests.get(f'http://localhost:3000/api/users/{username}')
    return response.json()

print("Testeando GET /api/users/:username")
print(get_user('test'))