import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Channel.css';

const ChannelPage = () => {
  const { channelId } = useParams(); // Extract channelId from URL
  const [channelInfo, setChannelInfo] = useState(null);
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        const response = await fetch(`/api/channel/${channelId}`);
        if (!response.ok) throw new Error('Channel not found');
        const data = await response.json();
        setChannelInfo(data.channel);
        setVideos(data.videos);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchChannelData();
  }, [channelId]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!channelInfo) {
    return <div className="loading-message">Loading...</div>;
  }

  return (
    <div className="channel-page">
      <div className="channel-header">
        <h1>{channelInfo.name}</h1>
        <p>{channelInfo.description}</p>
        <Link to="/" className="back-to-home">Back to Home</Link>
      </div>

      <div className="video-grid">
        {videos.map((video) => (
          <div className="video-card" key={video.id}>
            <img src={video.thumbnail} alt={video.title} className="video-thumbnail" />
            <div className="video-info">
              <h3>{video.title}</h3>
              <p>{video.views} views</p>
            </div>
            <Link to={`/video/${video.id}`} className="video-link">Watch Video</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChannelPage;
