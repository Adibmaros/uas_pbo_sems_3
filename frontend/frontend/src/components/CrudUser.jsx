import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Edit, Trash2, UserPlus, RefreshCw } from 'lucide-react';
import { getDashboardData } from "../pages/Admin/data/getData";

const fetchPengguna = async () => {
  const response = await axios.get("http://localhost:8080/api/pengguna/all");
  return response.data;
};

const deletePengguna = async (id) => {
  await axios.delete(`http://localhost:8080/api/pengguna/${id}`);
};

const updatePengguna = async (id, penggunaData) => {
  await axios.put(`http://localhost:8080/api/pengguna/${id}`, penggunaData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const CrudUser = () => {
  const [penggunas, setPenggunas] = useState([]);
  const [dataDashboard, setDataDashboard] = useState("");
  const [editingPengguna, setEditingPengguna] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [userData, dashboardData] = await Promise.all([
        fetchPengguna(),
        getDashboardData()
      ]);
      setPenggunas(userData);
      setDataDashboard(dashboardData);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDeletePengguna = async (id) => {
    const isConfirmed = window.confirm("Apakah Anda yakin ingin menghapus pengguna ini?");
    if (!isConfirmed) return;

    try {
      await deletePengguna(id);
      await loadData();
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Gagal menghapus pengguna. Silakan coba lagi.");
    }
  };

  const handleUpdatePengguna = async () => {
    // Basic validation
    if (!editingPengguna.username.trim() || !editingPengguna.namaLengkap.trim()) {
      alert("Username dan Nama Lengkap tidak boleh kosong");
      return;
    }

    try {
      await updatePengguna(editingPengguna?.idPengguna, editingPengguna);
      setEditingPengguna(null);
      await loadData();
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Gagal memperbarui pengguna. Silakan coba lagi.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editingPengguna) {
      setEditingPengguna({ ...editingPengguna, [name]: value });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden max-w-5xl mx-auto">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6">
          <h1 className="text-4xl font-bold text-center text-white drop-shadow-md">
            Manajemen Pengguna
          </h1>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="flex items-center space-x-4">
              <Link
                to="/register"
                className="flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition transform active:scale-95"
              >
                <UserPlus className="mr-2" /> Tambah Pengguna
              </Link>
            </div>
            <div className="flex justify-end items-center">
              <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-bold">
                Total Pengguna: {dataDashboard?.totalPengguna || 0}
              </div>
            </div>
          </div>

          {editingPengguna && (
            <div className="bg-gray-100 rounded-xl p-6 mb-6 shadow-md">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Edit Pengguna
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="username"
                  value={editingPengguna.username}
                  onChange={handleChange}
                  placeholder="Username"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="namaLengkap"
                  value={editingPengguna.namaLengkap}
                  onChange={handleChange}
                  placeholder="Nama Lengkap"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="md:col-span-2">
                  <button
                    onClick={handleUpdatePengguna}
                    className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white py-2 rounded-lg hover:from-green-600 hover:to-green-800 transition transform active:scale-95"
                  >
                    Perbarui Pengguna
                  </button>
                </div>
              </div>
            </div>
          )}

          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <RefreshCw className="animate-spin text-blue-600" size={48} />
            </div>
          ) : (
            <div className="bg-white shadow-md rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 text-left text-gray-800">ID</th>
                    <th className="py-3 px-4 text-left text-gray-800">Username</th>
                    <th className="py-3 px-4 text-left text-gray-800">Nama Lengkap</th>
                    <th className="py-3 px-4 text-left text-gray-800">Level</th>
                    <th className="py-3 px-4 text-center text-gray-800">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {penggunas.map((pengguna) => (
                    <tr 
                      key={pengguna.idPengguna} 
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="py-3 px-4 text-sm text-gray-600">{pengguna.idPengguna}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{pengguna.username}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{pengguna.namaLengkap}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{pengguna.levelPengguna}</td>
                      <td className="py-3 px-4 flex justify-center space-x-2">
                        <button
                          onClick={() => setEditingPengguna(pengguna)}
                          className="text-yellow-600 hover:text-yellow-700 transition transform hover:scale-110"
                        >
                          <Edit size={20} />
                        </button>
                        <button
                          onClick={() => handleDeletePengguna(pengguna.idPengguna)}
                          className="text-red-600 hover:text-red-700 transition transform hover:scale-110"
                        >
                          <Trash2 size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CrudUser;