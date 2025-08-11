# import time
# import requests
# import json

# OMDB_API_KEY = "43d4c90a"
# REQUIRED_FIELDS = [
#     "Title", "Year", "Runtime", "Genre", "Director", "Writer", "Actors",
#     "Language", "Country", "Poster", "imdbRating", "imdbID", "Type"
# ]

# def has_all_required_fields(data):
#     return all(field in data and data[field] for field in REQUIRED_FIELDS)

# def fetch_movies(start_id, end_id):
#     with open("imdb_movies.jsonl", "a", encoding="utf-8") as f:
#         for i in range(start_id, end_id + 1):
#             imdb_id = f"tt{i:07d}"
#             try:
#                 response = requests.get(
#                     f"https://www.omdbapi.com/?i={imdb_id}&apikey={OMDB_API_KEY}",
#                     timeout=5
#                 )
#                 data = response.json()
#                 if data.get("Response") == "True" and has_all_required_fields(data):
#                     f.write(json.dumps(data, ensure_ascii=False) + "\n")
#                     f.flush()  # Force write to disk immediately
#             except:
#                 pass
#             time.sleep(0.5)

# fetch_movies(start_id=9999000, end_id=9999999)
# import requests
# import json
# import time

# API_KEY = "3e3cfe140d930a4ff73ec258c4e4df5c"
# BASE_URL = f"https://api.themoviedb.org/3/movie/popular?api_key={API_KEY}"

# movies_collected = []
# page = 1

# while len(movies_collected) < 300:
#     try:
#         response = requests.get(f"{BASE_URL}&page={page}")
#         data = response.json()
#         movies = data.get("results", [])

#         if not movies:
#             break

#         movies_collected.extend(movies)
#         page += 1
#         # time.sleep(0.25)  # optional: avoid rate limiting

#     except:
#         break

# # Write full data to a JSON file
# with open("tmdb_popular_movies.json", "w", encoding="utf-8") as f:
#     json.dump(movies_collected, f, ensure_ascii=False, indent=2)

#     print("succs")
import requests
import json
from pathlib import Path

API_KEY = "3e3cfe140d930a4ff73ec258c4e4df5c"
BASE_URL = f"https://api.themoviedb.org/3/movie/popular?api_key={API_KEY}"

movies_collected = []
page = 1

while len(movies_collected) < 1000:
    try:
        response = requests.get(f"{BASE_URL}&page={page}", timeout=10)
        data = response.json()
        movies = data.get("results", [])

        if not movies:
            break

        movies_collected.extend(movies)
        page += 1

    except requests.RequestException:
        break

# Define the file path
output_path = Path("tmdb_popular_movies.json").resolve()

# Write data to file
with output_path.open("w", encoding="utf-8") as f:
    json.dump(movies_collected, f, ensure_ascii=False, indent=2)

print("Success")
print(f"Saved to: {output_path}")
