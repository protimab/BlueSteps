import React, { useEffect, useState } from "react";
import { fetchHabits, createHabit, deleteHabit, checkinHabit } from "../api/habitApi";
import { Plus, Trash2, Check, Waves, MapPin, Thermometer, Wind } from "lucide-react";

export default function Habits() {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState("");
  const [loading, setLoading] = useState(true);
  const [marineData, setMarineData] = useState(null);
  const [lastCheckinLocation, setLastCheckinLocation] = useState(null);
  const [isCheckingIn, setIsCheckingIn] = useState(false);

  useEffect(() => {
    loadHabits();
  }, []);

  async function loadHabits() {
    try {
      const data = await fetchHabits();
      setHabits(data);
    } catch (error) {
      console.error("Failed to load habits:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddHabit(e) {
    e.preventDefault();
    if (!newHabit.trim()) return;
    
    try {
      const created = await createHabit(newHabit.trim());
      setHabits((prev) => [...prev, created]);
      setNewHabit("");
    } catch (error) {
      console.error("Failed to create habit:", error);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteHabit(id);
      setHabits((prev) => prev.filter((h) => h.id !== id));
    } catch (error) {
      console.error("Failed to delete habit:", error);
    }
  }

  async function handleCheckin(id) {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          console.log("Checking in at:", latitude, longitude);
          const result = await checkinHabit(id, latitude, longitude);
          console.log("Checkin result:", result);
          
          setMarineData(result.marine_data);
          setLastCheckinLocation({ latitude, longitude });
          // successful check in
          alert(`Check-in successful! 📍 Location: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
              } catch (error) {
          console.error("Failed to check in", error);
          alert("Failed to check in. Please try again.");
        } finally {
            setIsCheckingIn(false);
          }
      },
          (error) => {
            setIsCheckingIn(false);
            alert("Could not find your location. Please allow location access and try again.");
            console.error("Geolocation error:", error);
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 300000 
          }
        );
    }
          
        

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
        <Waves className="mr-2 text-blue-500" size={24} />
        Your Ocean Habits
      </h2>

      <div className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            onKeyUp={(e) => e.key === 'Enter' && handleAddHabit(e)}
            placeholder="Add a new ocean-friendly habit..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            onClick={handleAddHabit}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus size={20} />
            Add
          </button>
        </div>
      </div>

      {habits.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Waves size={48} className="mx-auto mb-4 text-gray-300" />
          <p>No habits yet. Add your first ocean-friendly habit above!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {habits.map((habit) => (
            <div
              key={habit.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span className="flex-1 text-gray-800">{habit.description}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleCheckin(habit.id)}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded flex items-center gap-1 text-sm transition-colors"
                >
                  {isCheckingIn ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Checking in...
                    </>
                  ) : (
                    <>
                     <Check size={16} />
                      Check In
                    </>
                  )}
                </button>
                <button
                  onClick={() => handleDelete(habit.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1 text-sm transition-colors"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {marineData && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
            <Waves className="mr-2" size={20} />
            Ocean Conditions
          </h3>

        {lastCheckinLocation && (
            <div className="mb-3 text-sm">
              <div className="text-blue-600 flex items-center mb-1">
                <MapPin size={16} className="mr-1" />
                Your Location: {lastCheckinLocation.latitude.toFixed(4)}, {lastCheckinLocation.longitude.toFixed(4)}
              </div>
              {marineData.location_info && marineData.location_info.adjusted && (
                <div className="text-amber-600 text-xs bg-amber-50 p-2 rounded">
                  📍 Showing ocean data from nearest water body: <strong>{marineData.location_info.ocean_name}</strong> 
                  ({marineData.location_info.distance_km}km away)
                </div>
              )}
              {marineData.location_info && !marineData.location_info.adjusted && (
                <div className="text-green-600 text-xs">
                  🌊 You're at a coastal location with direct ocean access!
                </div>
              )}
            </div>
          )}
        
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-blue-700">
          <div className="flex items-center">
            <Waves className="mr-2 text-blue-500" size={16} />
            <div>
              <div className="text-xs text-blue-600">Wave Height</div>
              <div className="font-medium">
                {marineData.wave_height !== undefined ? `${marineData.wave_height}m` : "N/A"}
              </div>
            </div>
          </div>

           <div className="flex items-center">
              <Thermometer className="mr-2 text-red-500" size={16} />
              <div>
                <div className="text-xs text-blue-600">Sea Temperature</div>
                <div className="font-medium">
                  {marineData.sea_surface_temperature !== undefined ? `${marineData.sea_surface_temperature}°C` : "N/A"}
                </div>
              </div>
            </div>
            
            <div className="flex items-center">
              <Wind className="mr-2 text-gray-500" size={16} />
              <div>
                <div className="text-xs text-blue-600">Wind Speed</div>
                <div className="font-medium">
                  {marineData.wind_speed_10m !== undefined ? `${marineData.wind_speed_10m} km/h` : "N/A"}
                </div>
              </div>
            </div>
          </div>

          {/*}
           <details className="mt-3">
            <summary className="text-xs text-blue-500 cursor-pointer">Info</summary>
            <pre className="text-xs bg-blue-100 p-2 rounded mt-2 overflow-x-auto">
              {JSON.stringify(marineData, null, 2)}
            </pre>
          </details>
          */}
        </div>
      )}
    </div>
  );
}