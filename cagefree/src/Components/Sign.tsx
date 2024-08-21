
import React, { useState } from 'react';
import './SignUp.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [name, setUsername] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [userType, setUserType] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast("Passwords do not match");
      return;
    }

    const payload = {
      name,
      gender,
      address,
      userType,
      password
    };

    try {
      const response = await axios.post("http://localhost:8087/users/save", payload);
      console.log(response);
      toast("Signup successful");
      navigate("/login");
    } catch (error) {
      console.error("There was an error saving the data:", error);
      toast("Signup failed");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={name}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender:</label>
            <input
              type="text"
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="userType">User Type:</label>
            <input
              type="text"
              id="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="signup-button">Sign Up</button>
        </form>
        <div className="login-message">
          <p>Already have an account? <a href="/login" className="login-link">Login here</a></p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
