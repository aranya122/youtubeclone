import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CreateChannel from './CreateChannel';
import './HomePage.css';

const HomePage = ({ handleLogout, username }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [videos, setVideos] = useState([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [channels, setChannels] = useState([]);
  const [showCreateChannel, setShowCreateChannel] = useState(false);

  // Ensure user initial is derived correctly or fallback to "G"
  const userInitial = username ? username.charAt(0).toUpperCase() : 'G'; 

  // Mock data for videos and channels
  const mockVideos = [
    { id: 1, thumbnail: 'video-thumbnail1.jpg', title: 'Video 1', channel: 'Channel 1', views: '1M', likes: 0, dislikes: 0, comments: [], channelId: null },
    { id: 2, thumbnail: 'video-thumbnail2.jpg', title: 'Video 2', channel: 'Channel 2', views: '2M', likes: 0, dislikes: 0, comments: [], channelId: null },
    { id: 3, thumbnail: 'video-thumbnail3.jpg', title: 'Video 3', channel: 'Channel 3', views: '3M', likes: 0, dislikes: 0, comments: [], channelId: null },
  ];

  const mockChannels = [
    { id: 101, name: 'My Channel 1' },
    { id: 102, name: 'My Channel 2' },
  ];

  useEffect(() => {
    setVideos(mockVideos);
    setChannels(mockChannels);
  }, []);

  // Filter videos based on the search query
  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (filterCategory ? video.category === filterCategory : true)
  );

  // Handle Like and Dislike
  const handleLike = (videoId) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) =>
        video.id === videoId ? { ...video, likes: video.likes + 1 } : video
      )
    );
  };

  const handleDislike = (videoId) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) =>
        video.id === videoId ? { ...video, dislikes: video.dislikes + 1 } : video
      )
    );
  };

  // Handle Comments
  const handleAddComment = (videoId, comment) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) =>
        video.id === videoId
          ? { ...video, comments: [...video.comments, { id: Date.now(), text: comment }] }
          : video
      )
    );
  };

  const handleEditComment = (videoId, commentId, updatedText) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) =>
        video.id === videoId
          ? {
              ...video,
              comments: video.comments.map((comment) =>
                comment.id === commentId ? { ...comment, text: updatedText } : comment
              ),
            }
          : video
      )
    );
  };

  const handleDeleteComment = (videoId, commentId) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) =>
        video.id === videoId
          ? { ...video, comments: video.comments.filter((comment) => comment.id !== commentId) }
          : video
      )
    );
  };

  return (
    <div className="home-page">
      {/* Header Section */}
      <header className="header">
        <div className="logo-container">
          <img
            src="https://cdn3.iconfinder.com/data/icons/social-network-30/512/social-06-512.png"
            alt="YouTube Logo"
            className="logo-img"
          />
        </div>

        <button className="hamburger-menu" onClick={() => setIsSidebarVisible(!isSidebarVisible)}>
          ☰
        </button>

        <input
          type="text"
          className="search-bar"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="filter-buttons">
          <button onClick={() => setFilterCategory('')}>All</button>
          <button onClick={() => setFilterCategory('Music')}>Music</button>
          <button onClick={() => setFilterCategory('Travel')}>Travel</button>
        </div>

        {/* User Initial Circle */}
        <div className="user-initial" title={username || 'Guest'}>
          {userInitial}
        </div>

        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </header>

      {/* Sidebar Section */}
      {isSidebarVisible && (
        <div className="sidebar">
          <button>Home</button>
          <button>Shorts</button>
          <button>Subscriptions</button>
          <button>History</button>
          <button>Playlists</button>
        </div>
      )}

      {/* Main Content */}
      <div className="main-content">
        {/* Channel Section */}
        <div className="channel-section">
          <h2>Your Channels</h2>
          <div className="channel-list">
            {channels.map((channel) => (
              <span key={channel.id} className="channel-item">
                {channel.name}
              </span>
            ))}
          </div>
          <button
            className="create-channel-button"
            onClick={() => setShowCreateChannel(!showCreateChannel)}
          >
            {showCreateChannel ? 'Close Create Channel' : 'Create New Channel'}
          </button>
        </div>

        {showCreateChannel && <CreateChannel setChannels={setChannels} />}

        {/* Video Grid */}
        <div className="video-grid">
          {filteredVideos.map((video) => (
            <div className="video-card" key={video.id}>
              <img src={video.thumbnail} alt={video.title} className="video-thumbnail" />
              <div className="video-info">
                <h3>{video.title}</h3>
                <p>{video.channel}</p>
                <p>{video.views} views</p>
              </div>

              {/* Like/Dislike Buttons */}
              <div className="like-dislike-section">
                <button onClick={() => handleLike(video.id)}>👍 {video.likes}</button>
                <button onClick={() => handleDislike(video.id)}>👎 {video.dislikes}</button>
              </div>

              {/* Comment Section */}
              <div className="comments-section">
                <h4>Comments</h4>
                {video.comments.map((comment) => (
                  <div key={comment.id} className="comment">
                    <span>{comment.text}</span>
                    <button
                      onClick={() =>
                        handleEditComment(video.id, comment.id, prompt('Edit comment:', comment.text))
                      }
                    >
                      Edit
                    </button>
                    <button onClick={() => handleDeleteComment(video.id, comment.id)}>Delete</button>
                  </div>
                ))}
                <input
                  type="text"
                  placeholder="Add a comment..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.target.value.trim()) {
                      handleAddComment(video.id, e.target.value);
                      e.target.value = '';
                    }
                  }}
                />
              </div>

              <Link to={`/video/${video.id}`} className="video-link">
                Watch Video
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
