import React from 'react'
import { Toaster } from 'react-hot-toast';
import Header from './components/Header/Header'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer/Footer'

function Layout() {
  return (
    <>
    <Toaster position="top-right" reverseOrder={false} />
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default Layout
