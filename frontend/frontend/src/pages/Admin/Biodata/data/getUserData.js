import axios from "axios";

export const fetchUserData = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/arsip-surat/${id}`);
    return response.data; // Mengambil data dari response
  } catch (error) {
    console.error("Error fetching user data:", error.message);
  }
};

//api nya salah , id nya itu id arsip, bukan pengguna
