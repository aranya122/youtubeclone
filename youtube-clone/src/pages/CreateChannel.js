import React, { useState } from 'react';

const CreateChannel = ({ setChannels }) => {
  const [channelName, setChannelName] = useState('');

  const handleCreateChannel = () => {
    if (channelName) {
      const newChannel = {
        id: Date.now(), // Unique ID for the new channel
        name: channelName,
      };

      // Add new channel to the list in the HomePage
      setChannels((prevChannels) => [...prevChannels, newChannel]);

      // Clear the input field
      setChannelName('');

      // Optionally, redirect to another page, e.g., Home page
      alert('Channel Created Successfully!');
    } else {
      alert('Please enter a channel name.');
    }
  };

  return (
    <div className="create-channel-container">
      <h2>Create a New Channel</h2>
      <input
        type="text"
        placeholder="Enter channel name"
        value={channelName}
        onChange={(e) => setChannelName(e.target.value)}
      />
      <button onClick={handleCreateChannel}>Create Channel</button>
    </div>
  );
};

export default CreateChannel;
