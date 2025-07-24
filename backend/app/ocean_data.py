import requests

def fetch_marine_data(lat=34.0, lon=-120.0):
    url = "https://marine-api.open-meteo.com/v1/marine"
    params = {
        "latitude": lat,
        "longitude": lon,
        "hourly": "wave_height,wave_direction,wind_speed,water_temperature",
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
            "wind_speed": data["hourly"]["wind_speed"][0],
            "water_temperature": data["hourly"]["water_temperature"][0],
        }
        return latest

    except Exception as e:
        print("Error fetching marine data:", e)
        return {}
