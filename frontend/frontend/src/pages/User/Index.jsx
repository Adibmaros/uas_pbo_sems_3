import React from "react";
import { loginAtom } from "../../utils/atoms";
import { useAtom } from "jotai";
import Navbar from "./components/Navbar";// Pastikan path benar
import Login from "../../auth/Login";
import NavbarAdmin from "./components/NavbarAdmin";
const Utama = ({ loginData }) => {
  return (
    <div>
      <Navbar userData={loginData} />
      <div>
        <NavbarAdmin/>
      </div>
    </div>
  );
};

const Admin = () => {
  const [loginData,] = useAtom(loginAtom);

  // Pastikan JSX dikembalikan
  return loginData.idPengguna ? <Utama loginData={loginData} /> : <Login />;
};

export default Admin;
