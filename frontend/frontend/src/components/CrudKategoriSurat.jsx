import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2, Edit, Plus, RefreshCw } from 'lucide-react';
import { getDashboardData } from '../pages/Admin/data/getData';

const CrudKategoriSurat = () => {
  const [kategoriSurat, setKategoriSurat] = useState([]);
  const [filteredKategoriSurat, setFilteredKategoriSurat] = useState([]); // State untuk data yang difilter
  const [searchQuery, setSearchQuery] = useState(''); // State untuk query pencarian
  const [isEditing, setIsEditing] = useState(false);
  const [currentKategori, setCurrentKategori] = useState({
    namaKategori: '',
    deskripsi: ''
  });
  const [dataDashboard, setDataDashboard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch data kategori surat dari API
  useEffect(() => {
    const fetchKategoriSurat = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:8080/api/kategori-surat');
        setKategoriSurat(response.data);
        setFilteredKategoriSurat(response.data); // Inisialisasi data filter dengan data penuh
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchDashboardData = async () => {
      try {
        const data = await getDashboardData();
        setDataDashboard(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchKategoriSurat();
    fetchDashboardData();
  }, []);

  // Filter data berdasarkan search query
  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    setFilteredKategoriSurat(
      kategoriSurat.filter((kategori) =>
        kategori.namaKategori.toLowerCase().includes(lowercasedQuery)
      )
    );
  }, [searchQuery, kategoriSurat]);

  const handleEdit = (kategori) => {
    setIsEditing(true);
    setCurrentKategori(kategori);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setCurrentKategori({ namaKategori: '', deskripsi: '' });
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(`Apakah Anda yakin ingin menghapus kategori ini?`);
    if (!isConfirmed) return;

    try {
      await axios.delete(`http://localhost:8080/api/kategori-surat/${id}`);
      setKategoriSurat(kategoriSurat.filter((kategori) => kategori.idKategori !== id));
      alert("Kategori berhasil dihapus.");
    } catch (error) {
      console.error('Error deleting data:', error);
      alert("Terjadi kesalahan saat menghapus data. Silakan coba lagi.");
    }
  };

  const handleSave = async () => {
    // Validation
    if (!currentKategori.namaKategori.trim()) {
      alert('Nama Kategori tidak boleh kosong');
      return;
    }

    const method = isEditing ? 'put' : 'post';
    const url = isEditing
      ? `http://localhost:8080/api/kategori-surat/${currentKategori.idKategori}`
      : 'http://localhost:8080/api/kategori-surat';

    try {
      await axios({
        method,
        url,
        headers: { 'Content-Type': 'application/json' },
        data: currentKategori,
      });

      const response = await axios.get('http://localhost:8080/api/kategori-surat');
      setKategoriSurat(response.data);
      setFilteredKategoriSurat(response.data); // Update data yang difilter

      // Reset form
      setIsEditing(false);
      setCurrentKategori({ namaKategori: '', deskripsi: '' });
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Terjadi kesalahan saat menyimpan data');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden max-w-5xl mx-auto">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6">
          <h1 className="text-4xl font-bold text-center text-white drop-shadow-md">
            Kategori Surat
          </h1>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-100 rounded-xl p-5 shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                {isEditing ? 'Edit Kategori' : 'Tambah Kategori Baru'}
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Kategori
                  </label>
                  <input
                    type="text"
                    value={currentKategori?.namaKategori || ''}
                    onChange={(e) =>
                      setCurrentKategori({ ...currentKategori, namaKategori: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    placeholder="Masukkan nama kategori"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Deskripsi
                  </label>
                  <textarea
                    value={currentKategori?.deskripsi || ''}
                    onChange={(e) =>
                      setCurrentKategori({ ...currentKategori, deskripsi: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    placeholder="Deskripsi kategori"
                    rows="4"
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={handleSave}
                    className="flex items-center justify-center w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition transform active:scale-95"
                  >
                    <Plus className="mr-2" /> {isEditing ? 'Update Kategori' : 'Tambah Kategori'}
                  </button>
                  {isEditing && (
                    <button
                      onClick={handleCancelEdit}
                      className="flex items-center justify-center w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition transform active:scale-95"
                    >
                      Batal
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-gray-100 rounded-xl p-5 shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Total Kategori
                </h2>
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">
                  {dataDashboard?.totalKategori || 0}
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-inner">
                <p className="text-gray-600 italic">
                  Kelola kategori surat Anda dengan mudah. Tambah, edit, atau hapus kategori sesuai kebutuhan.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="flex justify-end mb-4">
              <input
                type="text"
                placeholder="Cari kategori..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {isLoading ? (
              <div className="flex justify-center items-center py-8">
                <RefreshCw className="animate-spin text-blue-600" size={48} />
              </div>
            ) : (
              <div className="bg-white shadow-md rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-3 px-4 text-left text-gray-800">Nama Kategori</th>
                      <th className="py-3 px-4 text-left text-gray-800">Deskripsi</th>
                      <th className="py-3 px-4 text-left text-gray-800">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredKategoriSurat.map((kategori) => (
                      <tr key={kategori.idKategori} className="border-b hover:bg-gray-50 transition">
                        <td className="py-3 px-4">{kategori.namaKategori}</td>
                        <td className="py-3 px-4">{kategori.deskripsi}</td>
                        <td className="py-3 px-4 flex space-x-2">
                          <button
                            onClick={() => handleEdit(kategori)}
                            className="text-yellow-600 hover:text-yellow-700 transition transform hover:scale-110"
                          >
                            <Edit size={20} />
                          </button>
                          <button
                            onClick={() => handleDelete(kategori.idKategori)}
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
    </div>
  );
};

export default CrudKategoriSurat;
