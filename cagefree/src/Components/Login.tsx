import React, { useEffect, useState } from 'react';
import './Login.css'; // Import the CSS file
import axios from 'axios';
import { toast } from 'react-toastify';

function Login() {
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      window.location.href = "/home";
    }
  }, []);

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = { username: username, password: password };

    try {
      const loginRes = await axios.post("http://localhost:8080/users/login", payload);
      console.log("Login response:", loginRes.data); // Log the full response data

      const userId = loginRes.data; // Assuming the response returns only userId

      if (userId) {
        console.log("Storing userId:", userId); // Log the userId before storing
        localStorage.setItem("userId", userId.toString());

        // Fetch the user details
        const userRes = await axios.get(`http://localhost:8080/users/getById/${userId}`);
        console.log("Fetched user data:", userRes.data); // Log the fetched user data

        const userType = userRes.data.userType; // Assuming the response contains userType

        if (userType) {
          console.log("Storing userType:", userType); // Log the userType before storing
          localStorage.setItem("userType", userType);

          // Redirect based on userType
          switch (userType) {
            case "admin":
              window.location.href = "/admin";
              break;
            case "trainer":
              window.location.href = "/trainer/home";
              break;
            case "nutritionist":
              window.location.href = "/nutritionist/home";
              break;
            default:
              window.location.href = "/home"; // Default for normal users
          }
        } else {
          toast.error("Failed to retrieve userType.");
        }
      } else {
        toast.error("Login failed: Missing userId.");
      }
    } catch (error) {
      console.error("There was an error with the login request:", error);
      toast.error("Login failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              aria-label="Username"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-label="Password"
            />
          </div>
          <div className="link-forgot-password">
            <a href="/auth/verify">Forgot Password?</a>
          </div>
          <button type="submit" className="btn-login">Login</button>
        </form>
        <div className="link-signup-message">
          <p>Don't have an account?</p>
          <a href="/Signup"><button className="btn-signup">Sign Up</button></a>
        </div>
      </div>
    </div>
  );
}

export default Login;
