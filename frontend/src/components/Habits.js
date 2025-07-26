import React, { useEffect, useState } from "react";
import { fetchHabits, createHabit, deleteHabit } from "../api/habitApi";
import { checkinHabit } from "../api/habitApi";


export default function Habits() {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState("");
  const [marineData, setMarineData] = useState(null);


  useEffect(() => {
    loadHabits();
  }, []);

  async function loadHabits() {
    const data = await fetchHabits();
    setHabits(data);
  }

  async function handleAddHabit() {
    if (!newHabit) return;
    const created = await createHabit(newHabit);
    setHabits((prev) => [...prev, created]);
    setNewHabit("");
  }

  async function handleDelete(id) {
    await deleteHabit(id);
    setHabits((prev) => prev.filter((h) => h.id !== id));
  }

  async function handleCheckin(id) {
  const result = await checkinHabit(id);
  setMarineData(result.marine_data);
  }

  return (
    <div>
      <h2>Your Habits</h2>
      <input
        value={newHabit}
        onChange={(e) => setNewHabit(e.target.value)}
        placeholder="New habit"
      />
      <button onClick={handleAddHabit}>Add</button>
      <ul>
        {habits.map((h) => (
          <li key={h.id}>
            {h.description}{" "}
            <button onClick={() => handleDelete(h.id)}>Delete</button>
            <button onClick={() => handleCheckin(h.id)}>Check In</button>
          </li>
        ))}
        {marineData && (
          <div style={{ marginTop: "1rem", padding: "0.5rem", border: "1px solid gray" }}>
            <h3>Ocean Conditions:</h3>
            <p>Wave Height: {marineData.wave_height} m</p>
          </div>
        )}
      </ul>
    </div>
  );
}
