import mongoose from 'mongoose'
import 'dotenv/config'

const DB = process.env.DB

const connectDB = async () => {
  try {
    await mongoose.connect(DB);
    console.log('MongoDB Connected successfully!');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
  }
};

export default connectDB;