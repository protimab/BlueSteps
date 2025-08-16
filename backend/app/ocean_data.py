import requests
import math

def get_distance(lat1, lon1, lat2, lon2):
    R = 6371  # Earth's radius 
    
    lat1_rad = math.radians(lat1)
    lat2_rad = math.radians(lat2)
    delta_lat = math.radians(lat2 - lat1)
    delta_lon = math.radians(lon2 - lon1)
    
    a = (math.sin(delta_lat / 2) * math.sin(delta_lat / 2) +
         math.cos(lat1_rad) * math.cos(lat2_rad) *
         math.sin(delta_lon / 2) * math.sin(delta_lon / 2))
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    
    return R * c


def find_nearest_ocean_point(lat, lon):
    ocean_points = [
        # California Coast
        {"lat": 37.5, "lon": -122.5, "name": "San Francisco Bay Area Coast"},
        {"lat": 36.0, "lon": -121.9, "name": "Monterey Bay"},
        {"lat": 34.0, "lon": -119.0, "name": "Southern California Coast"},
        {"lat": 32.7, "lon": -117.2, "name": "San Diego Coast"},
        
        # Pacific Northwest
        {"lat": 47.6, "lon": -124.4, "name": "Washington Coast"},
        {"lat": 45.5, "lon": -124.0, "name": "Oregon Coast"},
        
        # East Coast
        {"lat": 40.7, "lon": -74.0, "name": "New York Harbor"},
        {"lat": 42.3, "lon": -71.0, "name": "Boston Harbor"},
        {"lat": 25.8, "lon": -80.1, "name": "Miami Coast"},
        
        # Gulf Coast
        {"lat": 29.3, "lon": -94.8, "name": "Houston Coast"},
        {"lat": 30.7, "lon": -88.0, "name": "Gulf of Mexico"},
        
        # Great Lakes 
        {"lat": 42.3, "lon": -87.9, "name": "Lake Michigan"},
        {"lat": 43.7, "lon": -79.4, "name": "Lake Ontario"},
    ]
    
    # find closest ocean point
    closest_point = None
    min_distance = float('inf')
    
    for point in ocean_points:
        distance = get_distance(lat, lon, point["lat"], point["lon"])
        if distance < min_distance:
            min_distance = distance
            closest_point = point
    
    return closest_point, min_distance


def fetch_marine_data(lat=20.0, lon=-157.0):
    url = "https://marine-api.open-meteo.com/v1/marine"
    original_lat, original_lon = lat, lon
    params = {
       "latitude": lat,
       "longitude": lon,
       "hourly": ["wave_height", "sea_surface_temperature", "wind_speed_10m"],
       "timezone": "auto",
       "forecast_days": 1
    }

    try:
        print(f"Fetching marine data for coordinates: {lat}, {lon}")
        response = requests.get(url, params=params)
        response.raise_for_status() 
        data = response.json()
        
        print("API keys:", list(data.keys()))

        if not data.get("hourly"):
            print("No hourly data in response")
            return {}

        #valid data exists
        wave_data = data["hourly"].get("wave_height", [])
        temp_data = data["hourly"].get("sea_surface_temperature", [])
        wind_data = data["hourly"].get("wind_speed_10m", [])

        #on land
        all_wave_null = all(x is None for x in wave_data)
        all_temp_null = all(x is None for x in temp_data)
        all_wind_null = all(x is None for x in wind_data)

        if all_wave_null and all_temp_null and all_wind_null:
            print("Searching for nearest ocean point.")
            nearest_ocean, distance = find_nearest_ocean_point(original_lat, original_lon)
         
            if nearest_ocean:
                print(f"Found nearest ocean point: {nearest_ocean['name']} ({distance:.1f}km away)")
                
                params["latitude"] = nearest_ocean["lat"]
                params["longitude"] = nearest_ocean["lon"]
                    
                response = requests.get(url, params=params)
                response.raise_for_status()
                data = response.json()

                data["location_info"] = {
                        "original_location": {"lat": original_lat, "lon": original_lon},
                        "ocean_location": {"lat": nearest_ocean["lat"], "lon": nearest_ocean["lon"]},
                        "ocean_name": nearest_ocean["name"],
                        "distance_km": round(distance, 1),
                        "adjusted": True
                    }
            else:
                print("Could not find a suitable ocean point")
                return {}
        else:
            # valid data exists
            data["location_info"] = {
                "original_location": {"lat": original_lat, "lon": original_lon},
                "ocean_location": {"lat": lat, "lon": lon},
                "ocean_name": "Current location",
                "distance_km": 0,
                "adjusted": False
        }
        latest = {}
        if data["hourly"].get("wave_height") and len(data["hourly"]["wave_height"]) > 0:
            for value in data["hourly"]["wave_height"]:
                if value is not None:
                    latest["wave_height"] = value
                    break
        
        if data["hourly"].get("sea_surface_temperature") and len(data["hourly"]["sea_surface_temperature"]) > 0:
            for value in data["hourly"]["sea_surface_temperature"]:
                if value is not None:
                    latest["sea_surface_temperature"] = value
                    break
            
        if data["hourly"].get("wind_speed_10m") and len(data["hourly"]["wind_speed_10m"]) > 0:
            for value in data["hourly"]["wind_speed_10m"]:
                if value is not None:
                    latest["wind_speed_10m"] = value
                    break
        latest["location_info"] = data["location_info"]
            
        print("Processed data:", latest)
        return latest

    except requests.exceptions.HTTPError as e:
        print("API responded with error:", e.response.text)
        return {}
    except Exception as e:
        print("Error fetching marine data:", e)
        return {}
