import requests

url = "http://localhost:3000/"

def get_reviews():
    r = requests.get(url + "/api/reviews")
    return r.json()

print("[TEST] GET /api/reviews =>", get_reviews())

def get_review(id):
    r = requests.get(url + f"/api/reviews/{id}")
    return r.json()

print("[TEST] GET /api/reviews/:id =>", get_review(1))

def post_review(title, content, rating):
    r = requests.post(url + "/api/reviews", json={"title": title, "content": content, "rating": rating})
    return r.json()