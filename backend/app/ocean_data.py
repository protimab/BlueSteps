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

        print("API Response:", data) 

        if not data.get("hourly"):
            print("No hourly data in response")
            return {}

        latest = {}
        if data["hourly"].get("wave_height") and len(data["hourly"]["wave_height"]) > 0:
            latest["wave_height"] = data["hourly"]["wave_height"][0]
        
        if data["hourly"].get("sea_surface_temperature") and len(data["hourly"]["sea_surface_temperature"]) > 0:
            latest["sea_surface_temperature"] = data["hourly"]["sea_surface_temperature"][0]
            
        if data["hourly"].get("wind_speed_10m") and len(data["hourly"]["wind_speed_10m"]) > 0:
            latest["wind_speed_10m"] = data["hourly"]["wind_speed_10m"][0]
            
        print("Processed data:", latest)  
        return latest
        
    except requests.exceptions.HTTPError as e:
        print("API responded with error:", e.response.text)
        return {}
    except Exception as e:
        print("Error fetching marine data:", e)
        return {}