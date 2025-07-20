import api from "./api";

export async function fetchHabits() {
  const res = await api.get("/habits/");
  return res.data;
}

export async function createHabit(description) {
  const res = await api.post("/habits/", null, {
    params: { description },
  });
  return res.data;
}

export async function deleteHabit(habitId) {
  await api.delete(`/habits/${habitId}`);
}
