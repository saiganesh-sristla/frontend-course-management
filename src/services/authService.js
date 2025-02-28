import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const signup = async (name, email, password, role) => {
  const res = await axios.post(`${API_URL}/signup`, { name, email, password, role });
  return res.data;
};

export const login = async (email, password) => {
  const res = await axios.post(`${API_URL}/login`, { email, password });
  return res.data;
};
