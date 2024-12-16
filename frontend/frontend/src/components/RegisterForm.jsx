import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegisterForm({ user }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    namaLengkap: "",
    level: user === "USER" ? "USER" : "ADMIN"
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `http://localhost:8080/api/auth/register?level=${formData.level}`,
        {
          username: formData.username,
          password: formData.password,
          namaLengkap: formData.namaLengkap,
        }
      );

      user === "ADMIN" ? navigate("/admin") : navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const inputClasses = "mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg mx-auto">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            {user === "ADMIN" ? "Tambah User" : "Register"}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please fill in the details below
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            {/* Nama Lengkap Field */}
            <div>
              <label htmlFor="namaLengkap" className={labelClasses}>
                Nama Lengkap
              </label>
              <input
                type="text"
                id="namaLengkap"
                name="namaLengkap"
                placeholder="Enter your full name"
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>

            {/* Username Field */}
            <div>
              <label htmlFor="username" className={labelClasses}>
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className={labelClasses}>
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>

            {/* User Level */}
            <div>
              <label htmlFor="level" className={labelClasses}>
                User Level
              </label>
              <select
                id="level"
                name="level"
                value={formData.level}
                onChange={handleChange}
                className={inputClasses}
                disabled={user === "USER"}
              >
                <option value="2">User</option>
                {user === "ADMIN" && <option value="ADMIN">Admin</option>}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}