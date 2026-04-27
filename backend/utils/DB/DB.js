import mongoose from 'mongoose'
import 'dotenv/config'

const DB = process.env.DB

let cached = global.mongoose || { conn: null, promise: null }

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(DB).then((mongooseInstance) => {
      console.log("MongoDB connected");
      return mongooseInstance;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default connectDB;