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