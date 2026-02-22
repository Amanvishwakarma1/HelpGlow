import React from "react";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from "./Layout.jsx";
import Home from "./components/Home/Home.jsx";
import Compaingns from "./components/Campaigns/Campaigns.jsx";
import Monthly from "./components/Monthly/Monthly.jsx";
import About from "./components/About/About.jsx";
import Menu from "./components/Menu/Menu.jsx";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Login/Register.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children:[
      {
        path:"",
        element:<Home/>
      },
      {
        path:"campaigns",
        element:<Compaingns/>
      },
      {
        path:"monthly",
        element:<Monthly/>
      },
      {
        path:"about",
        element:<About/>
      },
      {
        path:"menu",
        element:<Menu/>
      },
      {
        path:"login",
        element:<Login/>
      },
      {
        path:"register",
        element:<Register/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router = {router}/>
    </AuthProvider>
  </React.StrictMode>,
)
