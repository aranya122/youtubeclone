import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Register.css'; // Import Register CSS

const Register = ({ handleRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    if (username && password && confirmPassword) {
      handleRegister();  // Call the handleRegister function passed from App.js
      navigate('/login');  // Redirect to login after successful registration
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-header">Register</h2> {/* Styled Register Header */}

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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>

      <p className="login-link-text">
        Already have an account? <Link to="/login">Login here</Link> {/* Link to Login page */}
      </p>
    </div>
  );
};

export default Register;
