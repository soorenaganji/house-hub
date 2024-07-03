import axios from "axios";

export async function createPost(data) {
  const response = await axios.post("/api/profile", data);
  return response;
}

export async function editPost(data) {
  const response = await axios.patch("/api/profile", data);
  return response;
}

export async function deletePost(id) {
  const response = await axios.delete(`/api/profile/delete/${id}`);
  return response;
}

export async function PublishPost(id) {
  const res = await fetch(`/api/profile/publish/${id}`, { method: "PATCH" });
  return res;
}

export async function getPosts() {
  const response = await axios.get("/api/profile");
  console.log(response)
return response.data.data
}

export async function getOnePost(id) {
  const response = await axios.get(`/api/profile/${id}`);
  console.log(response)

return response.data.data;
}