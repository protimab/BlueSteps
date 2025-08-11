import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import api from '../api/api';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const oceanIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function MapAutoBounds({ checkins }) {
  const map = useMap();

  useEffect(() => {
    const validCheckins = checkins.filter(
      ({ latitude, longitude }) => 
        latitude !== null && longitude !== null && 
        latitude !== 0 && longitude !== 0 &&
        !isNaN(latitude) && !isNaN(longitude)
    );

    if (validCheckins.length > 0) {
      const coords = validCheckins.map(({ latitude, longitude }) => [latitude, longitude]);
      const bounds = L.latLngBounds(coords);
      
      if (validCheckins.length === 1) {
        map.setView(coords[0], 10);
      } else {
        map.fitBounds(bounds, { padding: [20, 20] });
      }
    }
  }, [checkins, map]);

  return null;
}

const OceanMap = () => {
  const [checkins, setCheckins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // default center -> Cali
  const defaultCenter = [36.7783, -119.4179]; 

  useEffect(() => {
    fetchCheckins();
  }, []);

  async function fetchCheckins() {
    try {
      setLoading(true);
      const response = await api.get('/habits/checkins/');
      console.log('Fetched checkins:', response.data);
      setCheckins(response.data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch checkins:', err);
      setError('Failed to load check-in locations');
    } finally {
      setLoading(false);
    }
  }

  const validCheckins = checkins.filter(
    ({ latitude, longitude }) => 
      latitude !== null && longitude !== null && 
      latitude !== 0 && longitude !== 0 &&
      !isNaN(latitude) && !isNaN(longitude)
  );

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6 h-[500px] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
          <p className="text-gray-500">Loading your ocean check-ins...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
        <h2 className="text-xl font-semibold flex items-center">
          <div className="w-6 h-6 mr-2">🌊</div>
          Ocean Impact Map
        </h2>
        <p className="text-blue-100 text-sm mt-1">
          {validCheckins.length === 0 
            ? "No check-ins yet - start tracking your ocean-friendly habits!"
            : `${validCheckins.length} check-in${validCheckins.length === 1 ? '' : 's'} recorded`
          }
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border-l-4 border-red-400">
          <p className="text-red-700">{error}</p>
          <button 
            onClick={fetchCheckins}
            className="mt-2 text-red-600 hover:text-red-800 underline text-sm"
          >
            Try again
          </button>
        </div>
      )}

      <MapContainer 
        center={defaultCenter}
        zoom={validCheckins.length === 0 ? 5 : 10}
        style={{ height: '500px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        
        {validCheckins.length > 0 && <MapAutoBounds checkins={validCheckins} />}
        
        {validCheckins.length === 0 ? (
          // Show default marker when no check-ins
          <Marker position={defaultCenter} icon={oceanIcon}>
            <Popup>
              <div className="text-center">
                <strong>🌊 Welcome to BlueSteps!</strong>
                <br />
                <span className="text-sm text-gray-600">
                  Check in on your ocean-friendly habits to see your impact locations here!
                </span>
              </div>
            </Popup>
          </Marker>
        ) : (
          // Show actual check-ins
          validCheckins.map((checkin, idx) => (
            <Marker 
              key={checkin.id || idx} 
              position={[checkin.latitude, checkin.longitude]} 
              icon={oceanIcon}
            >
              <Popup>
                <div className="min-w-[200px]">
                  <strong className="text-blue-800">🌊 {checkin.habit_description || 'Ocean Habit'}</strong>
                  <br />
                  <span className="text-sm text-gray-600">
                    📅 {new Date(checkin.date).toLocaleDateString()}
                  </span>
                  <br />
                  <span className="text-xs text-gray-500">
                    📍 {checkin.latitude.toFixed(4)}, {checkin.longitude.toFixed(4)}
                  </span>
                </div>
              </Popup>
            </Marker>
          ))
        )}
      </MapContainer>

      {/* Map Legend/Info */}
      <div className="p-4 bg-gray-50 border-t text-smtext-gray-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span>Your habit check-ins</span>
            </div>
          </div>
          <button 
            onClick={fetchCheckins}
            className="text-blue-600 hover:text-blue-800 text-xs underline"
          >
            Refresh map
          </button>
        </div>
        {validCheckins.length > 0 && (
          <div className="mt-2 text-xs text-gray-500">
            This map shows locations where you've checked in on your ocean-friendly habits!
          </div>
        )}
      </div>
    </div>
  );
};

export default OceanMap;