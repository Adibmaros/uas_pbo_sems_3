import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from './auth/Login'
import Admin from './pages/Admin/Index'
import User from './pages/User/Index'
import Register from './auth/Register'
import Create from "./pages/Admin/components/Create"
import Biodata from './pages/Admin/Biodata/Index'
import './index.css'
import Edit from './pages/Admin/components/Edit'
import CreateArsipUser from './pages/User/components/CreateArsipUser'
import EditSurat from './pages/User/components/EditSurat'
import About from './components/About'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path : "/register",
    element : <Register />
  },
  // admin paths
  {
    path: "/admin",
    element: <Admin />
  },
  {
    path : "/biodata",
    element : <Biodata/>
  },
  {
    path : "/admin/arsip-surat/create",
    element : <Create />
  },

  {
    path : "/admin/edit/:id",
    element : <Edit />
  },
  // user path
  {
    path: "/user",
    element: <User />
  },
  {
    path : "/user/arsip-surat/create",
    element : <CreateArsipUser />
  },
  {
    path : "/user/edit/:id",
    element : <EditSurat/>
  },
  {
  path : "/about",
  element : <About />
  }
  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
