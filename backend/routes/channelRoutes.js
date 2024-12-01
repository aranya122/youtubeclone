import express from 'express';
import Channel from '../models/Channel.js'; // Ensure the Channel model uses ES6 export
import Video from '../models/Video.js'; // Ensure the Video model uses ES6 export

const router = express.Router();

// Get channel by ID
router.get('/:channelId', async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.channelId);
    if (!channel) {
      return res.status(404).json({ message: 'Channel not found' });
    }
    res.json(channel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get videos for a specific channel
router.get('/:channelId/videos', async (req, res) => {
  try {
    const videos = await Video.find({ channel: req.params.channelId });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;