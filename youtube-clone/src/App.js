import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; 
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import VideoPlayer from './pages/VideoPlayer';
import ChannelPage from './pages/ChannelPage';
import CreateChannel from './pages/CreateChannel';  // Ensure CreateChannel is imported

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track user login status
  const [username, setUsername] = useState(''); // Track username

  // Handle login
  const handleLogin = (username) => {
    setIsAuthenticated(true); // Set authenticated state after successful login
    setUsername(username); // Set the username after login
  };

  // Handle registration
  const handleRegister = (username) => {
    setIsAuthenticated(true); // Set authenticated state after successful registration
    setUsername(username); // Set the username after registration
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false); // Reset authenticated state on logout
    setUsername(''); // Reset username on logout
  };

  return (
    <Router>
      <Routes>
        {/* Redirect to HomePage if authenticated, else redirect to login */}
        <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />} />
        
        {/* Login Route */}
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />

        {/* Register Route */}
        <Route path="/register" element={<Register handleRegister={handleRegister} />} />
        
        {/* HomePage Route */}
        <Route 
          path="/home" 
          element={isAuthenticated ? <HomePage handleLogout={handleLogout} username={username} /> : <Navigate to="/login" />} 
        />
        
        {/* VideoPlayer Route */}
        <Route path="/video/:videoId" element={<VideoPlayer />} />
        
        {/* ChannelPage Route */}
        <Route path="/channel/:channelId" element={<ChannelPage />} />

        {/* CreateChannel Route (Make sure CreateChannel.js exists and is correctly implemented) */}
        <Route path="/create-channel" element={isAuthenticated ? <CreateChannel /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
