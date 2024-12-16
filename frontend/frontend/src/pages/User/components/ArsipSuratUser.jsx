import React, { useEffect, useState } from "react";
import { getArsipByIdPengguna } from "../data/getData";
import { useAtom } from "jotai";
import { loginAtom } from "../../../utils/atoms";
import { Link } from "react-router-dom";
import { getFile, deleteFile } from "../../../utils/supabase";

const ArsipSuratUser = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataUser] = useAtom(loginAtom);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const arsip = await getArsipByIdPengguna(dataUser.idPengguna);
        setData(arsip);
      } catch (error) {
        console.error("Gagal memuat arsip surat:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [dataUser.idPengguna]);

  const handleDelete = async (id, fileName) => {
    const confirm = window.confirm("Apakah Anda yakin ingin menghapus arsip ini?");
    if (confirm) {
      try {
        await deleteFile(fileName);
        await fetch(`http://localhost:8080/api/arsip-surat/${id}`, {
          method: "DELETE",
        });
        setData(data.filter((item) => item.idArsip !== id));
        alert("Arsip berhasil dihapus!");
      } catch (error) {
        alert("Gagal menghapus arsip. Silakan coba lagi.");
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Arsip Surat Pengguna
          </h2>

          <div className="mb-8">
            <Link
              to="/user/arsip-surat/create"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              + Tambah Surat Baru
            </Link>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <>
              {data.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {data.map((item) => (
                    <div
                      key={item.idArsip}
                      className="bg-white border rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6"
                    >
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        {item.judulSurat}
                      </h3>
                      
                      <div className="space-y-3">
                        <InfoRow label="Nomor Surat" value={item.nomorSurat} />
                        <InfoRow label="Tanggal Surat" value={item.tanggalSurat} />
                        <InfoRow label="Deskripsi" value={item.deskripsi} />
                        <div className="flex justify-between items-center text-sm">
                          <span className="font-semibold text-gray-700">File:</span>
                          <a
                            href={getFile(item.fileElektronik)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 hover:underline truncate max-w-[200px]"
                          >
                            Lihat File
                          </a>
                        </div>
                      </div>

                      <div className="flex justify-between mt-6 pt-4 border-t">
                        <Link
                          to={`/user/edit/${item.idArsip}`}
                          className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors duration-200"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(item.idArsip, item.fileElektronik)}
                          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 text-lg mb-4">
                    Belum ada arsip untuk pengguna ini
                  </p>
                  <Link
                    to="/user/arsip-surat/create"
                    className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
                  >
                    Tambah Arsip Baru
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between items-center text-sm">
    <span className="font-semibold text-gray-700">{label}:</span>
    <span className="text-gray-600">{value}</span>
  </div>
);

export default ArsipSuratUser;