import express, { urlencoded } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './Routes/userRoutes.js';  // Correct import
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 1430;
const MONGO_URI = process.env.MONGO_URI;
const DB = process.env.DB;

const app = express();
app.use(cors());
app.use(express.json()); // Only one call to express.json()
app.use(express.urlencoded({ extended: true }));

// Correct route registration
app.use('/api/auth', authRoutes);  // Make sure the '/api/auth' is correctly registered.

mongoose
  .connect(MONGO_URI, { dbName: DB })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });
