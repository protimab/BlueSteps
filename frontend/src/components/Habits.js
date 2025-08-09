import React, { useEffect, useState } from "react";
import { fetchHabits, createHabit, deleteHabit, checkinHabit } from "../api/habitApi";
import { Plus, Trash2, Check, Waves } from "lucide-react";

export default function Habits() {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState("");
  const [loading, setLoading] = useState(true);
  const [marineData, setMarineData] = useState(null);

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
    try {
      const result = await checkinHabit(id);
      setMarineData(result.marine_data);
    } catch (error) {
      console.error("Failed to check in:", error);
    }
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

      <form onSubmit={handleAddHabit} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            placeholder="Add a new ocean-friendly habit..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus size={20} />
            Add
          </button>
        </div>
      </form>

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
                  <Check size={16} />
                  Check In
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
            Current Ocean Conditions
          </h3>
          <div className="text-blue-700">
            <p>Wave Height: {marineData.wave_height || "N/A"} meters</p>
          </div>
        </div>
      )}
    </div>
  );
}