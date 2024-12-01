import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import VideoPlayer from '../components/VideoPlayer';
import CommentSection from '../components/CommentSection';

function VideoPage() {
  const { id } = useParams();
  const [video, setVideo] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/videos/${id}`).then((response) => {
      setVideo(response.data);
      setComments(response.data.comments || []);
    });
  }, [id]);

  const handleAddComment = (text) => {
    const newComment = { text };
    setComments([...comments, newComment]);
    axios.post(`http://localhost:5000/videos/${id}/comments`, newComment);
  };

  return (
    <div>
      <VideoPlayer video={video} />
      <CommentSection comments={comments} onAddComment={handleAddComment} />
    </div>
  );
}

export default VideoPage;

