import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import api from "../api/api";
import L from "leaflet";

function MapAutoBounds({ checkins }) {
  const map = useMap();

 useEffect(() => {
    const coords = checkins
      .filter(({ latitude, longitude }) => latitude !== null && longitude !== null && latitude !== 0 && longitude !== 0)
      .map(({ latitude, longitude }) => [latitude, longitude]);

    if (coords.length > 0) {
      const bounds = L.latLngBounds(coords);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [checkins, map]);

  return null;
}

export default function HabitCheckinsMap() {
  const [checkins, setCheckins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCheckins() {
      try {
        const res = await api.get("/habits/checkins/");
        setCheckins(res.data);
      } catch (err) { 
        console.error("Failed to fetch checkins", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCheckins();
  }, []);

  if (loading) {
    return <div>Loading check-ins map...</div>;
  }

  if (!loading && checkins.length === 0) {
    return <div>No check-ins available yet.</div>;
  }

  return (
    <MapContainer center={[0, 0]} zoom={2} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapAutoBounds checkins={checkins} />
      {checkins
      .filter(({ latitude, longitude }) => latitude !== null && longitude !== null && latitude !== 0 && longitude !== 0)
      .map(({ id, habit_id, date, habit_description, latitude, longitude }, idx) => (
      <Marker key={id || idx} position={[latitude, longitude]}> 
        <Popup>
              <b>{habit_description}</b> <br /> 
              Checked in on: {date}
              <br />
              <i>Location:</i> {latitude.toFixed(4)}, {longitude.toFixed(4)}
          </Popup>
        </Marker>
    ))}
    </MapContainer>
  );
}
