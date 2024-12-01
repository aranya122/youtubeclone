import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'; // Import dotenv to load environment variables

dotenv.config(); // Load environment variables from .env file

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
import authRoutes from './routes/authRoutes.js';
import videoRoutes from './routes/videoRoutes.js';
import channelRoutes from './routes/channelRoutes.js';

// Use routes
app.use('/auth', authRoutes);
app.use('/videos', videoRoutes);
app.use('/channels', channelRoutes);

// Connect to MongoDB using the provided connection string
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://aranyaadarsh33:qV6dSLuoRva7FzxU@cluster0.bm5xz.mongodb.net/cluster0';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.error('Database connection error:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});