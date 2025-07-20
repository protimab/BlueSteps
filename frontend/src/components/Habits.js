import React, { useEffect, useState } from "react";
import { fetchHabits, createHabit, deleteHabit } from "../components/Habits.js"

export default function Habits() {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState("");

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
          </li>
        ))}
      </ul>
    </div>
  );
}
