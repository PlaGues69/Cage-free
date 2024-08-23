import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/logo.png';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setIsLoggedIn(!!userId); // Check if userId exists to determine if logged in
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    navigate("/home"); // Redirect to home after logout
  };

  return (
    <div className='navbar'>
      <img src={logo} alt="Logo" className='logo' onClick={() => navigate('/home')} />
      <ul>
        <li onClick={() => navigate('/home')}>Home</li>
        <li onClick={() => navigate('/training')}>Home Training</li>
      </ul>
      <div className='searchbox'>
        <div className="button-container">
          {!isLoggedIn ? (
            <>
              <button className="action-button" onClick={() => navigate('/login')}>Log In</button>
              <button className="action-button" onClick={() => navigate('/signup')}>Sign Up</button>
            </>
          ) : (
            <>
              <button className="action-button" onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
