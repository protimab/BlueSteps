import api from "./api";

export async function fetchHabits() {
  const res = await api.get("/habits/");
  return res.data;
}

export async function createHabit(description) {
  const res = await api.post("/habits/", { description });
  return res.data;
}

export async function updateHabit(habitId, description) {
  const res = await api.put(`/habits/${habitId}`, { description });
  return res.data;
}

export async function deleteHabit(habitId) {
  await api.delete(`/habits/${habitId}`);
}

export async function checkinHabit(habitId, latitude = null, longitude = null) {
  const res = await api.post(`/habits/${habitId}/checkin`, {
    latitude,
    longitude,
  });
  return res.data;
}