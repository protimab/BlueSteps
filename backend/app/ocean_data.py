import requests

def fetch_marine_data(lat=20.0, lon=-157.0):
    url = "https://marine-api.open-meteo.com/v1/marine"
    params = {
       "latitude": lat,
       "longitude": lon,
       "hourly": ["wave_height"],
       "timezone": "auto"
    }

    try:
        response = requests.get(url, params=params)
        response.raise_for_status() 
        data = response.json()

        if not data.get("hourly"):
            return {}

        latest = {
            "wave_height": data["hourly"]["wave_height"][0],
        }
        return latest

    except requests.exceptions.HTTPError as e:
        print("API responded with error:", e.response.text)
        return {}
