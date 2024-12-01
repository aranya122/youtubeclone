import mongoose from 'mongoose';

const channelSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
});

const Channel = mongoose.model('Channel', channelSchema);

export default Channel;