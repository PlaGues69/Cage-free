import React, { useState } from 'react';
import './SignUp.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [name, setUsername] = useState<string>('');
  const [height, setHeight] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [gender, setGender] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [userType, setUserType] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast("Passwords do not match");
      return;
    }

    // Example: Store data in localStorage (or handle locally)
    const payload = {
      name,
      height,
      weight,
      gender,
      address,
      userType,
      password,
    };

    localStorage.setItem('userData', JSON.stringify(payload));
    toast("Signup successful");
    navigate("/login");
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="height">Height:</label>
            <input
              type="number"
              id="height"
              value={height}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHeight(Number(e.target.value))}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="weight">Weight:</label>
            <input
              type="number"
              id="weight"
              value={weight}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWeight(Number(e.target.value))}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender:</label>
            <input
              type="text"
              id="gender"
              value={gender}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGender(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="userType">User Type:</label>
            <input
              type="text"
              id="userType"
              value={userType}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserType(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
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
