import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login'; 
import Signup from './Components/Sign'; 
import ForgotPassword from './Components/Forgetpassword';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import HomePage from './Components/HomePage'; // Import the HomePage component
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar /> {/* Include Navbar at the top */}
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* HomePage route */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/auth/verify" element={<ForgotPassword />} />
          {/* Add other routes as needed */}
        </Routes>
        <Footer /> {/* Include Footer at the bottom */}
      </div>
    </Router>
  );
}

export default App;
