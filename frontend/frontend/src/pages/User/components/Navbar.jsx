import React, { useState } from "react";
import { Link } from "react-router-dom";
import { loginAtom } from "../../../utils/atoms";
import { useAtom } from "jotai";
import { CircleUserRound, LogOut, UserPlus, User } from "lucide-react";

const Navbar = ({ userData }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [login, setLogin] = useAtom(loginAtom);

  const handleLogout = () => {
    setLogin({
      idPengguna: "",
      username: "",
      namaLengkap: "",
      role: "",
    });
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4 px-6 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <Link 
          to="/about" 
          className="flex items-center space-x-3 hover:opacity-90 transition-all duration-200"
        >
          <img 
            src="/image.jpg" 
            alt="Logo" 
            className="w-10 h-10 rounded-lg shadow-lg border-2 border-white/20" 
          />
          <span className="font-bold text-xl tracking-tight">Archiever.io</span>
        </Link>

        {/* User Profile Section */}
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center space-x-3 bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-200"
          >
            <CircleUserRound className="h-5 w-5" />
            <span className="hidden sm:block font-medium">
              {userData?.namaLengkap || "Guest"}
            </span>
            {userData?.role && (
              <span className="hidden sm:block text-xs bg-white/20 px-2 py-1 rounded-full">
                {userData.role}
              </span>
            )}
          </button>

          {/* Dropdown Menu */}
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden transform origin-top-right transition-all duration-200">
              {login.role === "ADMIN" && (
                <Link 
                  to="/register" 
                  className="flex items-center space-x-2 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <UserPlus size={18} />
                  <span>Tambah User</span>
                </Link>
              )}
              
              <Link 
                to="/biodata" 
                className="flex items-center space-x-2 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <User size={18} />
                <span>My Profile</span>
              </Link>
              
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="flex items-center space-x-2 w-full px-4 py-3 text-red-600 hover:bg-red-50 transition-colors border-t border-gray-100"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;