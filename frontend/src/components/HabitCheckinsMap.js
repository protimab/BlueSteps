import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import api from "./api";

export default function HabitCheckinsMap() {
  const [checkins, setCheckins] = useState([]);

  useEffect(() => {
    async function fetchCheckins() {
      const res = await api.get("/habits/checkins/");
      setCheckins(res.data);
    }
    fetchCheckins();
  }, []);

  return (
    <MapContainer center={[0, 0]} zoom={2} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {checkins.map(({ habit_id, date, description }, idx) => (
        <Marker key={idx} position={[Math.random() * 90, Math.random() * 180]}>
          <Popup>
            <b>{description}</b> <br /> Checked in on: {date}
              <br />
              <i>Sea Temp:</i> {checkin.ocean_data?.sea_temp || "n/a"} <br />
              <i>Wind:</i> {checkin.ocean_data?.wind_speed || "n/a"} <br />
              <i>Waves:</i> {checkin.ocean_data?.wave_height || "n/a"}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
