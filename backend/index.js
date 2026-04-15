import express from 'express'
import 'dotenv/config'
import mongoose from 'mongoose'
import routes from './routes/route.js'

const app = express()

const PORT = process.env.PORT
const DB = process.env.DB

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api',routes);

const connectDB = async () => {
  try {
    await mongoose.connect(DB);
    console.log('MongoDB Connected successfully!');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
  }
};

// 404 handler
app.use((req, res, next) => {
    res.status(404).json({
        message: `Page not found`
    });
});

// Global error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error"
    });
});

app.listen(PORT, async () => {
    connectDB();
    console.log("Server running on: ", PORT);
})