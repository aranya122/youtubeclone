import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';  // Import Link for navigation
import './Login.css'; // Import Login CSS

const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      handleLogin();  // Call the handleLogin function passed from App.js
      navigate('/home');  // Redirect to home after successful login
    } else {
      alert('Please enter both username and password');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-header">Login</h2> {/* Styled Login Header */}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>

      <p className="register-link-text">
        Don't have an account? <Link to="/register">Register here</Link> {/* Link to Register page */}
      </p>
    </div>
  );
};

export default Login;
