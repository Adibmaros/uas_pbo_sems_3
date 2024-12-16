import React, { useEffect, useState } from "react";
import { loginAtom } from "../../../utils/atoms";
import { useAtom } from "jotai";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { User, Edit, LogOut, Save, AlertCircle } from "lucide-react";

const Biodata = () => {
  const [userData, setUserData] = useAtom(loginAtom);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    namaLengkap: "",
    username: "",
    role: ""
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      setFormData({
        namaLengkap: userData.namaLengkap,
        username: userData.username,
        role: userData.role
      });
    }
  }, [userData]);

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
        <div className="bg-white/90 backdrop-blur-sm p-12 rounded-2xl shadow-2xl text-center max-w-md w-full mx-4 transform hover:scale-105 transition duration-300">
          <AlertCircle className="mx-auto mb-6 text-red-500 animate-bounce" size={72} />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Oops!</h1>
          <p className="text-xl text-gray-600 mb-8">Silakan login untuk melihat data Anda.</p>
          <Link 
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:shadow-lg transform hover:-translate-y-1 transition duration-300 inline-flex items-center text-lg font-medium" 
            to="/"
          >
            <LogOut className="mr-2" size={24} /> Login
          </Link>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    setUserData({
      idPengguna: "",
      username: "",
      namaLengkap: "",
      role: "",
    });
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      setError(null);
      const updatedUserData = {
        ...userData,
        namaLengkap: formData.namaLengkap,
        username: formData.username,
        role: formData.role,
      };

      await axios.put(`http://localhost:8080/api/pengguna/${userData.idPengguna}`, updatedUserData);
      setUserData(updatedUserData);
      setIsEditing(false);
      
      alert("Biodata berhasil diperbarui!");
    } catch (err) {
      console.error("Error updating biodata:", err);
      setError("Gagal memperbarui data. Coba lagi nanti.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 p-6">
      <div className="bg-white/90  rounded-2xl shadow-2xl p-10 w-full max-w-xl border border-gray-200 relative transform hover:scale-[1.02] transition duration-300">
        <div className="absolute -top-6 right-8 bg-white rounded-full p-4 shadow-lg">
          <User 
            className={`${userData.role === 'ADMIN' ? 'text-red-500' : 'text-blue-500'} transform hover:rotate-12 transition-transform`} 
            size={48} 
          />
        </div>

        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8 flex items-center justify-center">
          {isEditing ? "Edit Biodata" : "Profil Pengguna"}
          {isEditing && <Edit className="ml-3 text-blue-500 animate-pulse" size={28} />}
        </h1>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-800 px-6 py-4 rounded-lg mb-6 flex items-center shadow-sm">
            <AlertCircle className="mr-3 text-red-500" size={24} />
            {error}
          </div>
        )}

        <div className="text-gray-700 space-y-6">
          {/* Form fields */}
          <div className="group">
            <label className="text-sm text-gray-600 mb-1 block">Nama Lengkap</label>
            {isEditing ? (
              <input
                type="text"
                name="namaLengkap"
                value={formData.namaLengkap}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-300"
                required
              />
            ) : (
              <div className="px-4 py-3 rounded-lg bg-gray-50 font-medium">{userData.namaLengkap}</div>
            )}
          </div>

          <div className="group">
            <label className="text-sm text-gray-600 mb-1 block">Username</label>
            {isEditing ? (
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-300"
                required
              />
            ) : (
              <div className="px-4 py-3 rounded-lg bg-gray-50 font-medium">{userData.username}</div>
            )}
          </div>

          <div className="group">
            <label className="text-sm text-gray-600 mb-1 block">Level</label>
            {isEditing ? (
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-300"
                required
              >
                {userData.role === "ADMIN" ? (
                  <>
                    <option value="ADMIN">Admin</option>
                    <option value="USER">User</option>
                  </>
                ) : (
                  <option value="USER">User</option>
                )}
              </select>
            ) : (
              <div className="px-4 py-3 rounded-lg bg-gray-50 font-medium">{userData.role}</div>
            )}
          </div>
        </div>

        <div className="flex justify-between mt-10">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="flex items-center px-8 py-3 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-full hover:shadow-lg transform hover:-translate-y-1 transition duration-300"
            >
              <Save className="mr-2" size={20} /> Simpan
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center px-8 py-3 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-full hover:shadow-lg transform hover:-translate-y-1 transition duration-300"
            >
              <Edit className="mr-2" size={20} /> Edit
            </button>
          )}

          <button
            onClick={handleLogout}
            className="flex items-center px-8 py-3 bg-gradient-to-r from-red-400 to-red-600 text-white rounded-full hover:shadow-lg transform hover:-translate-y-1 transition duration-300"
          >
            <LogOut className="mr-2" size={20} /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Biodata;