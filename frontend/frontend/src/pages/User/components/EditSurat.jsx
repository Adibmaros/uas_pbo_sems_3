import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { getKategoriData } from "../data/getData";
import { useAtom } from "jotai";
import { loginAtom } from "../../../utils/atoms";
import { uploadFile } from "../../../utils/supabase";

const Edit = () => {
  const [judulSurat, setJudulSurat] = useState("");
  const [nomorSurat, setNomorSurat] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [tanggalSurat, setTanggalSurat] = useState("");
  const [fileElektronik, setFileElektronik] = useState(null); // Mengubah ini menjadi file
  const [idKategori, setIdKategori] = useState("");
  const [kategori, setKategori] = useState([]);
  const [dataUser] = useAtom(loginAtom);

  const navigate = useNavigate();
  const { id } = useParams(); // Mengambil parameter id dari URL

  useEffect(() => {
    const fetchKategori = async () => {
      const kategoriData = await getKategoriData();
      setKategori(kategoriData);
    };

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/arsip-surat/${id}`);
        const data = response.data;
        setJudulSurat(data.judulSurat);
        setNomorSurat(data.nomorSurat);
        setDeskripsi(data.deskripsi);
        setTanggalSurat(data.tanggalSurat);
        setFileElektronik(data.fileElektronik);
        setIdKategori(data.kategoriSurat);
      } catch (error) {
        console.error(error);
        alert("Terjadi kesalahan saat mengambil data arsip surat.");
      }
    };

    fetchKategori();
    if (id) {
      fetchData();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Jika ada file yang diunggah, upload file tersebut
    let uploadedFileName = fileElektronik;
    if (fileElektronik && uploadedFileName instanceof File) {
      uploadedFileName = await uploadFile(fileElektronik);
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
      fileElektronik: uploadedFileName, // Menyimpan nama file yang diupload
      kategoriSurat: parseInt(idKategori),
      idPengguna: parseInt(dataUser?.idPengguna),
    };

    try {
      const response = await axios.put(`http://localhost:8080/api/arsip-surat/${id}`, data); // Gunakan PUT untuk mengupdate
      if (response.status === 200) {
        navigate("/admin");
      } else {
        alert("Gagal mengupdate arsip surat.");
      }
    } catch (error) {
      alert("Terjadi kesalahan saat mengupdate arsip surat.");
    }
  };

  return (
    <div className="flex items-center h-[100vh] justify-center p-4 bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white w-full max-w-lg p-6 rounded-md shadow-md space-y-3">
        <h2 className="text-2xl font-semibold text-center mb-6">Edit Arsip Surat</h2>

        <div>
          <label htmlFor="judulSurat" className="block text-sm font-medium text-gray-700">
            Judul Surat
          </label>
          <input type="text" id="judulSurat" value={judulSurat} onChange={(e) => setJudulSurat(e.target.value)} className="mt-1 block w-full p-2 border rounded-md" required />
        </div>

        <div>
          <label htmlFor="nomorSurat" className="block text-sm font-medium text-gray-700">
            Nomor Surat
          </label>
          <input type="text" id="nomorSurat" value={nomorSurat} onChange={(e) => setNomorSurat(e.target.value)} className="mt-1 block w-full p-2 border rounded-md" required />
        </div>

        <div>
          <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-700">
            Deskripsi
          </label>
          <textarea id="deskripsi" value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} className="mt-1 block w-full p-2 border rounded-md" rows={4} required />
        </div>

        <div>
          <label htmlFor="tanggalSurat" className="block text-sm font-medium text-gray-700">
            Tanggal Surat
          </label>
          <input type="date" id="tanggalSurat" value={tanggalSurat} onChange={(e) => setTanggalSurat(e.target.value)} className="mt-1 block w-full p-2 border rounded-md" required />
        </div>

        <div>
          <label htmlFor="fileElektronik" className="block text-sm font-medium text-gray-700">
            Unggah File Elektronik
          </label>
          <input type="file" id="fileElektronik" onChange={(e) => setFileElektronik(e.target.files[0])} className="mt-1 block w-full p-2 border rounded-md" />
          {fileElektronik && !fileElektronik instanceof File && (
            <div className="text-sm text-gray-500 mt-2">{fileElektronik}</div>
          )}
        </div>

        <div>
          <label htmlFor="idKategori" className="block text-sm font-medium text-gray-700">
            Kategori
          </label>
          <select id="idKategori" value={idKategori} onChange={(e) => setIdKategori(e.target.value)} className="mt-1 block w-full p-2 border rounded-md" required>
            <option value="">Pilih Kategori</option>
            {kategori.map((item) => (
              <option key={item.idKategori} value={item.idKategori}>
                {item.namaKategori}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 font-semibold">
          Edit
        </button>
      </form>
    </div>
  );
};

export default Edit;
