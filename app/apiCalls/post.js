import axios from "axios";

export async function createPost (data) {
    const response = await axios.post("/api/profile", data);
    return response
  }

export async function editPost (data) {
  const response = await axios.patch("/api/profile", data)
  return response
}

export async function deletePost (id) {
  console.log(id)
  const response = await axios.delete(`/api/profile/delete/${id}`)
  return response
}