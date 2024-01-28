import mongoose from 'mongoose';
import dotenv from 'dotenv';
import getEnvPath from '../utils/getEnvPath.js';

const envPath = getEnvPath();
dotenv.config({ path: envPath });

const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('Connected to MongoDB');
    } catch (error) {
      console.log('Error connecting to MongoDB:', error);
    }
};

export default connectDB;