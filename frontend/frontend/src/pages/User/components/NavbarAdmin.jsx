import React, { useState } from "react";
import ArsipSuratUser from "./ArsipSuratUser";

const NavbarAdmin = () => {
  const [currentPage, setCurrentPage] = useState(<ArsipSuratUser />);

  const handlePageChange = (pageComponent) => {
    setCurrentPage(pageComponent);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-gray-800 text-white shadow-lg z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Brand */}
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold">Admin Dashboard</h1>
            </div>

            {/* Navigation Links */}
            <div className="flex space-x-4">
              <button
                onClick={() => handlePageChange(<ArsipSuratUser />)}
                className="px-4 py-2 rounded-md text-sm font-medium
                         hover:bg-gray-700 transition-colors duration-200
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                Arsip Surat
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-20 pb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          {currentPage}
        </div>
      </main>
    </div>
  );
};

export default NavbarAdmin;