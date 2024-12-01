// models/Video.js
import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true
   },
  description: { 
    type: String, 
    required: true
   },
  thumbnail: { 
    type: String, 
    required: true
   },
  videoUrl: { 
    type: String, 
    required: true 
  },
  channelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Channel', required: true },
});

const Video = mongoose.model('Video', videoSchema);

export default Video;