import React, { useState } from "react";
import { Link } from "react-router-dom";
import { loginAtom } from "../../../utils/atoms";
import { useAtom } from "jotai";
import { CircleUserRound, ChevronDown } from "lucide-react";

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

  const menuItems = [
    { label: "Tambah User", path: "/register" },
    { label: "My Profile", path: "/biodata" },
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4 px-6 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <Link to="/about" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
          <img 
            src="/image.jpg" 
            alt="Logo" 
            className="w-10 h-10 rounded-lg shadow-md border-2 border-white/20" 
          />
          <span className="font-bold text-xl tracking-tight">Archiever.io</span>
        </Link>

        {/* User Section */}
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center space-x-3 bg-blue-600/40 px-4 py-2 rounded-lg hover:bg-blue-600/60 transition-colors"
          >
            <div className="flex items-center space-x-2">
              <CircleUserRound className="h-5 w-5" />
              <span className="hidden sm:block font-medium">
                {userData ? userData.namaLengkap : "Guest"}
              </span>
              {userData?.role && (
                <span className="hidden sm:block text-xs bg-blue-700/50 px-2 py-1 rounded-full">
                  {userData.role}
                </span>
              )}
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden transform origin-top-right transition-all duration-200 ease-out">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition-colors border-t border-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;