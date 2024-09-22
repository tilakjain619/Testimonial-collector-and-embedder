// Layout.js
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  const location = useLocation();
  const isEmbedRoute = location.pathname.startsWith('/embed/');
  
  useEffect(() => {
    if (!isEmbedRoute) {
      document.body.style.backgroundColor = '#151719';
    } else {
      document.body.style.backgroundColor = ''; // Reset to default if needed
    }
  }, [isEmbedRoute]);
  return (
    <>
      {!isEmbedRoute && <Navbar />}
      <div className='min-h-[84vh] mt-[4rem] sm:mt16 md:mt-24'>
        {children}
      </div>
      {!isEmbedRoute && <Footer />}
    </>
  );
};

export default Layout;