import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyUser } from '../api/api.js';
import "./Login.css";

const Login = () => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await verifyUser(userName, password);
      console.log('Sending:', { userName, password });
      if (data.existe) {
        navigate('/proyect');
      } else {
        alert('User does not exist or invalid credentials.');
      }
    } catch (error) {
      alert('An error occurred while trying to verify the user.' + {error});
    }
  };

  return (
    <div className="login-container">
      <header className="login-header">
        <h1>Crowdfunding</h1>
      </header>
      
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        
        <div className="input-group">
          <label htmlFor="userName">Username</label>
          <input
            type="userName"
            id="userName"
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" className="login-button">Login</button>
      </form>
      <div>
        <button className="register-button" style={{ marginTop: "20px" }} onClick={() => navigate('/register')}>Register</button>
      </div>
    </div>
  );
};

export default Login;
