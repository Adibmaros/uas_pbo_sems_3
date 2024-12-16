import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { getDashboardData } from "../pages/Admin/data/getData";
import { getFile } from "../utils/supabase";
import { deleteFile } from "../utils/supabase";
import { FileText, PlusCircle, Edit, Trash2 } from "lucide-react";
import { GiClick } from "react-icons/gi";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ArsipSuratForm() {
  const [arsipSuratList, setArsipSuratList] = useState([]);
  const [filteredArsipSurat, setFilteredArsipSurat] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dataDashboard, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState(null);

  const API_URL = "http://localhost:8080/api/arsip-surat";

  const fetchArsipSurat = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(API_URL);
      setArsipSuratList(response.data);
      setFilteredArsipSurat(response.data); // Inisialisasi data terfilter

      // Generate chart data
      const kategoriCount = response.data.reduce((acc, arsip) => {
        const kategori = arsip.kategoriSurat.namaKategori;
        acc[kategori] = (acc[kategori] || 0) + 1;
        return acc;
      }, {});

      setChartData({
        labels: Object.keys(kategoriCount),
        datasets: [
          {
            label: "Jumlah Arsip",
            data: Object.values(kategoriCount),
            backgroundColor: "rgba(54, 162, 235, 0.6)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching arsip surat:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = arsipSuratList.filter(
      (arsip) =>
        arsip.judulSurat.toLowerCase().includes(term) ||
        arsip.kategoriSurat.namaKategori.toLowerCase().includes(term)
    );
    setFilteredArsipSurat(filtered);
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      const dashboardData = await getDashboardData();
      setData(dashboardData);
    };
    fetchArsipSurat();
    fetchDashboardData();
  }, []);

  const handleDelete = async (id, fileName) => {
    if (!window.confirm("Anda yakin ingin menghapus arsip ini?")) return;
    try {
      if (fileName) await deleteFile(fileName);
      await axios.delete(`${API_URL}/${id}`);
      fetchArsipSurat();
    } catch (error) {
      console.error("Error deleting arsip surat:", error);
      alert("Gagal menghapus arsip surat.");
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center mb-4 md:mb-0">
            <FileText className="mr-3 text-blue-600" size={36} />
            Data Arsip Surat
          </h1>

          <div className="flex space-x-4">
            <Link
              to="/admin/arsip-surat/create"
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 shadow-md"
            >
              <PlusCircle className="mr-2" size={20} /> Tambah Surat
            </Link>
            <div className="bg-white rounded-lg shadow-md p-2">
              <p className="text-sm text-gray-600">
                <span className="font-bold text-blue-600">Total Arsip:</span> {dataDashboard?.totalArsipSurat || 0}
              </p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Cari berdasarkan judul atau kategori..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
          />
        </div>

        {/* Table Section */}
        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-blue-50 border-b">
                  <tr>
                    <th className="p-3 text-left text-sm font-semibold text-gray-600">Judul</th>
                    <th className="p-3 text-left text-sm font-semibold text-gray-600">Kategori</th>
                    <th className="p-3 text-left text-sm font-semibold text-gray-600 hidden md:table-cell">Deskripsi</th>
                    <th className="p-3 text-left text-sm font-semibold text-gray-600 hidden md:table-cell">Created By</th>
                    <th className="p-3 text-center text-sm font-semibold text-gray-600">File</th>
                    <th className="p-3 text-center text-sm font-semibold text-gray-600"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredArsipSurat.map((arsip) => (
                    <tr key={arsip.idArsip} className="border-b hover:bg-blue-50 transition duration-150">
                      <td className="p-3 text-sm text-gray-700">{arsip.judulSurat}</td>
                      <td className="p-4 text-sm text-gray-700">{arsip.kategoriSurat.namaKategori}</td>
                      <td className="p-4 text-sm text-gray-700 hidden md:table-cell">{arsip.deskripsi}</td>
                      <td className="p-4 text-sm text-gray-700">{arsip.pengguna.username}</td>
                      <td className="p-4 text-center">
                        {arsip.fileElektronik ? (
                          <a
                            href={getFile(arsip.fileElektronik)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 flex items-center justify-center"
                          >
                            <GiClick size={20} className="mr-1" /> Lihat
                          </a>
                        ) : (
                          <span className="text-gray-400">Tidak ada</span>
                        )}
                      </td>
                      <td className="p-4 flex justify-center space-x-2">
                        <Link
                          to={`/admin/edit/${arsip.idArsip}`}
                          className="text-yellow-500 hover:text-yellow-600 transition"
                        >
                          <Edit size={20} />
                        </Link>
                        <button
                          onClick={() => handleDelete(arsip.idArsip, arsip.fileElektronik)}
                          className="text-red-500 hover:text-red-600 transition"
                        >
                          <Trash2 size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Chart Section */}
        {chartData && (
          <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Jumlah Arsip per Kategori</h2>
            <Bar
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: "top" },
                  title: { display: true, text: "Grafik Jumlah Arsip per Kategori" },
                },
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
