import api from "../api/api";

export async function signup(email, password, name) {
  await api.post("/users/signup", {
    email,
    password,
    name
  });
  
  return await login(email, password);
}

export async function login(email, password) {
  const params = new URLSearchParams();
  params.append("username", email);
  params.append("password", password);
  const response = await api.post("/token", params);
  if (response.data.access_token) {
    localStorage.setItem("access_token", response.data.access_token);
  }
  return response.data;
}

export function logout() {
  localStorage.removeItem("access_token");
}
