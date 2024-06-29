import axios from "axios";

export async function getUser() {
  const response = await axios.get("/api/account");
  return response.data;
}

export async function editUser(data) {
  const response = await axios.patch("/api/account", data);
  return response.data;
}
