import requests

def fetch_marine_data(station_id="46026"):  # Santa Monica Basin buoy
    try:
        url = f"https://www.ndbc.noaa.gov/data/realtime2/{station_id}.txt" #fetching data from an external API
        response = requests.get(url)
        if response.status_code == 200:
            return response.text  
        else:
            return f"Error: {response.status_code}"
    except Exception as e:
        return str(e)
