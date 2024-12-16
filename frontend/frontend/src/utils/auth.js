import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });
    return response.data; // Respons dari server
  } catch (error) {
    console.error("Login error: ", error);
    throw error;
  }
};

export const register = async (username, password, levelName) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { username, password, levelName });
    return response.data;
  } catch (error) {
    console.error("Register error: ", error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("role");
  localStorage.removeItem("user");
};
