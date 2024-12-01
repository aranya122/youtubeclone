import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './video.css';

const VideoPlayer = () => {
  const { videoId } = useParams(); // Get videoId from URL params
  const [video, setVideo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [videoDetails, setVideoDetails] = useState({
    title: '',
    description: '',
    videoUrl: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch video data
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(`/api/videos/${videoId}`);
        setVideo(response.data); // Set video data
        setVideoDetails({
          title: response.data.title,
          description: response.data.description,
          videoUrl: response.data.videoUrl,
        });
        setLoading(false);
      } catch (error) {
        setError('Error fetching video data');
        setLoading(false);
      }
    };

    fetchVideo();
  }, [videoId]);

  // Handle video update
  const handleUpdate = async () => {
    try {
      const response = await axios.put(`/api/videos/update/${videoId}`, videoDetails);
      setVideo(response.data); // Update video data
      setIsEditing(false); // Exit editing mode
    } catch (error) {
      setError('Error updating video');
    }
  };

  // Handle video deletion
  const handleDelete = async () => {
    try {
      console.log(`Deleting video with ID: ${videoId}`); // Debugging log to ensure the videoId is correct
      const response = await axios.delete(`/api/videos/delete/${videoId}`);
      console.log(response); // Log response from backend to check if deletion was successful
      navigate('/home'); // Redirect to home after deletion
    } catch (error) {
      console.error('Error deleting video:', error);
      setError('Error deleting video');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="video-player-page">
      <iframe
        width="100%"
        height="500"
        src={`https://www.youtube.com/embed/${video.videoUrl}`}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={video.title}
      />
      <h1>{video.title}</h1>
      <p>{video.description}</p>
      <p>Channel: {video.channelName}</p>

      {/* Buttons for managing video */}
      <div className="video-actions">
        {isEditing ? (
          <>
            <input
              type="text"
              value={videoDetails.title}
              onChange={(e) => setVideoDetails({ ...videoDetails, title: e.target.value })}
              placeholder="Update Title"
            />
            <textarea
              value={videoDetails.description}
              onChange={(e) => setVideoDetails({ ...videoDetails, description: e.target.value })}
              placeholder="Update Description"
            />
            <button onClick={handleUpdate}>Save Changes</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)}>Edit Video</button>
            <button onClick={handleDelete}>Delete Video</button>
          </>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;

