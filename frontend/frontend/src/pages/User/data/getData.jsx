import axios from "axios";

export async function getKategoriData(){
    try {
        const kategori = await axios.get(`http://localhost:8080/api/kategori-surat`)
        return kategori.data;
    } catch (error) {
        console.log(error);
        return [];
    }
}


export async function getDashboardData(){
    try {
        const dashboard = await axios.get(`http://localhost:8080/api/dashboard`)
        return dashboard.data;
    } catch (error) {
        console.log(error);
        return [];
    }
}



export const getArsipByIdPengguna = async (idPengguna) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/arsip-surat`);
      
      // Filter arsip documents strictly by matching user ID
      const userArsip = response.data.filter(arsip => arsip.pengguna.idPengguna === idPengguna);
      
      return userArsip;
    } catch (error) {
      console.error("Error fetching arsip by user ID:", error);
      
      if (error.response) {
        throw new Error(`API Error: ${error.response.data.message || 'Failed to fetch arsip'}`);
      } else if (error.request) {
        throw new Error('No response received from server');
      } else {
        throw new Error('Error setting up the request');
      }
    }
  };