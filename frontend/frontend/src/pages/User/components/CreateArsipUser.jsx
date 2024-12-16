import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getKategoriData } from "../data/getData";
import { useAtom } from "jotai";
import { loginAtom } from "../../../utils/atoms";
import { uploadFile } from "../../../utils/supabase";

const Create = () => {
  const [judulSurat, setJudulSurat] = useState("");
  const [nomorSurat, setNomorSurat] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [tanggalSurat, setTanggalSurat] = useState("");
  const [fileElektronik, setFileElektronik] = useState(null); // Untuk file yang diunggah
  const [idKategori, setIdKategori] = useState("");
  const [kategori, setKategori] = useState([]);
  const [dataUser] = useAtom(loginAtom);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchKategori = async () => {
      try {
        const kategoriData = await getKategoriData();
        setKategori(kategoriData);
      } catch (error) {
        console.error("Gagal memuat data kategori:", error);
      }
    };

    fetchKategori();
  }, []);

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
  
    // Cek apakah ada file yang diupload
    let uploadedFileName = fileElektronik;
    if (fileElektronik) {
      uploadedFileName = await uploadFile(uploadedFileName);
      if (!uploadedFileName) {
        alert("Gagal mengupload file.");
        return;
      }
    }
  
    const data = {
      judulSurat,
      nomorSurat,
      deskripsi,
      tanggalSurat,
      fileElektronik: uploadedFileName, 
      kategoriSurat: parseInt(idKategori),
      idPengguna: parseInt(dataUser?.idPengguna),
    };
  
    try {
      const response = await axios.post("http://localhost:8080/api/arsip-surat", data); // Gunakan POST untuk membuat arsip baru
      if (response) {
        navigate("/admin");
      } else {
        alert("Gagal membuat arsip surat.");
      }
    } catch (error) {
      alert("Terjadi kesalahan saat membuat arsip surat.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 py-6">
      <form
        onSubmit={handleCreateSubmit}
        className="bg-white w-full max-w-2xl p-8 rounded-lg shadow-xl space-y-6"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">Tambah Arsip Surat</h2>

        <div className="space-y-4">
          {/* Judul Surat */}
          <div>
            <label htmlFor="judulSurat" className="block text-sm font-medium text-gray-700">
              Judul Surat
            </label>
            <input
              type="text"
              id="judulSurat"
              value={judulSurat}
              onChange={(e) => setJudulSurat(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Nomor Surat */}
          <div>
            <label htmlFor="nomorSurat" className="block text-sm font-medium text-gray-700">
              Nomor Surat
            </label>
            <input
              type="text"
              id="nomorSurat"
              value={nomorSurat}
              onChange={(e) => setNomorSurat(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Deskripsi */}
          <div>
            <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-700">
              Deskripsi
            </label>
            <textarea
              id="deskripsi"
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
              required
            />
          </div>

          {/* Tanggal Surat */}
          <div>
            <label htmlFor="tanggalSurat" className="block text-sm font-medium text-gray-700">
              Tanggal Surat
            </label>
            <input
              type="date"
              id="tanggalSurat"
              value={tanggalSurat}
              onChange={(e) => setTanggalSurat(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* File Elektronik */}
          <div>
            <label htmlFor="fileElektronik" className="block text-sm font-medium text-gray-700">
              Unggah File Elektronik
            </label>
            <input
              type="file"
              id="fileElektronik"
              onChange={(e) => setFileElektronik(e.target.files[0])}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Kategori */}
          <div>
            <label htmlFor="idKategori" className="block text-sm font-medium text-gray-700">
              Pilih Kategori
            </label>
            <select
              id="idKategori"
              value={idKategori}
              onChange={(e) => setIdKategori(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Pilih Kategori</option>
              {kategori.map((item) => (
                <option key={item.idKategori} value={item.idKategori}>
                  {item.namaKategori}
                </option>
              ))}
            </select>
          </div>

          {/* Button Simpan */}
          <button
            type="submit"
            className="w-full py-3 mt-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300"
          >
            Tambah
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;
