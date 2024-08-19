import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

function Main2() {
  return (
    <div className='container'>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Main2;
