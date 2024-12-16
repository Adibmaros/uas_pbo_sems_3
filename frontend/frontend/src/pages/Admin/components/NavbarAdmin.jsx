import React, { useState } from "react";
import { Archive, Users, FolderOpen } from "lucide-react";
import CrudKategoriSurat from "../../../components/CrudKategoriSurat";
import CrudUser from "../../../components/CrudUser";
import ArsipSuratForm from "../../../components/ArsipSuratForm";

const NavbarAdmin = () => {
  const [currentPage, setCurrentPage] = useState("arsip");

  const navigationItems = [
    {
      id: "arsip",
      label: "Arsip Surat",
      icon: <Archive size={20} />,
      component: <ArsipSuratForm />
    },
    {
      id: "kategori",
      label: "Kategori Surat",
      icon: <FolderOpen size={20} />,
      component: <CrudKategoriSurat />
    },
    {
      id: "users",
      label: "Semua User",
      icon: <Users size={20} />,
      component: <CrudUser />
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 mt-[70px]">
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-1 sm:space-x-4">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`
                  flex items-center space-x-2 px-4 py-3 text-sm sm:text-base font-medium
                  transition-all duration-200 ease-in-out
                  ${
                    currentPage === item.id
                    ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                  }
                `}
              >
                {item.icon}
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          {navigationItems.find(item => item.id === currentPage)?.component}
        </div>
      </main>
    </div>
  );
};

export default NavbarAdmin;