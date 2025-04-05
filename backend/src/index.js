import express from 'express';
import authRoutes from './routes/auth.route.js';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB BEFORE starting the server
connectDB().then(() => {
  app.use("/api/auth", authRoutes); // auth routes

  app.listen(PORT, () => {
    console.log('Server is running on port PORT: ' + PORT);
  });
});
