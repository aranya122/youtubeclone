import React, { useState } from 'react';

const AddVideoForm = ({ onAddVideo, selectedChannel }) => {
  const [newVideo, setNewVideo] = useState({
    title: '',
    thumbnail: '',
  });

  const handleAddVideo = () => {
    if (!newVideo.title || !newVideo.thumbnail) {
      alert('Please provide both title and thumbnail URL to add a video.');
      return;
    }

    const newVideoData = {
      id: Date.now(), // Generate a unique ID
      title: newVideo.title,
      thumbnail: newVideo.thumbnail,
      channel: selectedChannel.name,
      views: '0', // Default views
      channelId: selectedChannel.id, // Assign to the selected channel
    };

    onAddVideo(newVideoData); // Callback to parent
    setNewVideo({ title: '', thumbnail: '' }); // Reset form
  };

  if (!selectedChannel) {
    return <p>Please select a channel to add videos.</p>;
  }

  return (
    <div className="add-video-form">
      <h4>Add a Video to {selectedChannel.name}</h4>
      <input
        type="text"
        placeholder="Video Title"
        value={newVideo.title}
        onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Thumbnail URL"
        value={newVideo.thumbnail}
        onChange={(e) => setNewVideo({ ...newVideo, thumbnail: e.target.value })}
      />
      <button onClick={handleAddVideo}>Add Video</button>
    </div>
  );
};

export default AddVideoForm;
