import connectDB from '../DB/DB.js';

const dbConnection = async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    next(err);
  }
};

export default dbConnection;