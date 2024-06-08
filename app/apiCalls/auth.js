import axios from "axios";

export async function createUser (data) {
  const res = await  axios.post("/api/auth/signup" , data)
  return res
    
}
export async function loginUser (data) {
  return axios.post("/api/auth/login", data)
}