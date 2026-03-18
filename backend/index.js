import express from 'express'
import 'dotenv/config'
import route from './routes/route.js'
import mongoose from 'mongoose'

const app = express()

const PORT = process.env.PORT
const DB = process.env.DB

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api',route);

const connectDB = async () => {
  try {
    await mongoose.connect(DB);
    console.log('MongoDB Connected successfully!');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
  }
};

app.get('/', (req, res) => {
    res.send("Hello");
})

app.listen(PORT, async () => {
    connectDB();
    console.log("Server running on: ", PORT);
})