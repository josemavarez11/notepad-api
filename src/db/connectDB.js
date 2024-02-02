//External module imports.
import mongoose from 'mongoose';
import dotenv from 'dotenv';

//Internal module imports.
import getEnvPath from '../utils/getEnvPath.js';

//Load environment variables.
const envPath = getEnvPath();
dotenv.config({ path: envPath });

/**
 * Connects to MongoDB using the provided MONGODB_URI from the environment variables.
 * @async
 * @function connectDB
 * @returns {Promise<void>} - A promise that resolves when the connection is successful or rejects with an error.
 */
const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('Connected to MongoDB');
    } catch (error) {
      console.log('Error connecting to MongoDB:', error);
    }
};

export default connectDB;