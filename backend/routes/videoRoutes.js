import express from 'express';
import Video from '../models/Video.js'; // Ensure the Video model uses ES6 export
import Comment from '../models/Comment.js'; // Ensure the Comment model uses ES6 export

const router = express.Router();

// Get video details by ID
router.get('/:videoId', async (req, res) => {
  try {
    const video = await Video.findById(req.params.videoId);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get comments for a video
router.get('/:videoId/comments', async (req, res) => {
  try {
    const comments = await Comment.find({ video: req.params.videoId });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add comment to a video
router.post('/:videoId/comments', async (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ message: 'Comment text is required' });
  }

  try {
    const comment = new Comment({
      video: req.params.videoId,
      text,
    });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete comment
router.delete('/comments/:commentId', async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Like a video
router.post('/:videoId/like', async (req, res) => {
  try {
    const video = await Video.findById(req.params.videoId);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    // Check if the user has already liked the video
    if (video.likes.includes(req.body.userId)) {
      return res.status(400).json({ message: 'User has already liked this video' });
    }

    video.likes.push(req.body.userId); // Assuming userId is passed in the body
    await video.save();
    res.json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Dislike a video
router.post('/:videoId/dislike', async (req, res) => {
  try {
    const video = await Video.findById(req.params.videoId);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    // Check if the user has already disliked the video
    if (video.dislikes.includes(req.body.userId)) {
      return res.status(400).json({ message: 'User has already disliked this video' });
    }

    video.dislikes.push(req.body.userId); // Assuming userId is passed in the body
    await video.save();
    res.json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Modify Video Details
router.put('/update/:videoId', async (req, res) => {
  const { title, description, thumbnail, videoUrl } = req.body;

  try {
    const updatedVideo = await Video.findByIdAndUpdate(
      req.params.videoId,
      { title, description, thumbnail, videoUrl },
      { new: true }
    );

    if (!updatedVideo) {
      return res.status(404).json({ message: 'Video not found' });
    }

    res.status(200).json(updatedVideo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete Video
router.delete('/delete/:videoId', async (req, res) => {
  try {
    const deletedVideo = await Video.findByIdAndDelete(req.params.videoId);
    if (!deletedVideo) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.status(200).json({ message: 'Video deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;