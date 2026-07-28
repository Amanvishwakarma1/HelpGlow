import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';

const MainLayout = () => {
  return (
    <div className="page-wrapper">
      {/* The Header stays fixed on top of every page */}
      <Header />

      {/* The Outlet dynamically injects whichever page component matches the current URL route */}
      <main>
        <Outlet />
      </main>

      {/* The Footer stays fixed at the bottom of every page */}
      <Footer />

      {/* Fixed WhatsApp Floating Action Button */}
      <WhatsAppButton />
    </div>
  );
};

export default MainLayout;
