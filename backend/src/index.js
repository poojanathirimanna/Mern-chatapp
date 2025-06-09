import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';


import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware to parse JSON
app.use(express.json());
app.use(cookieParser()); // Middleware to parse cookies


// Connect to MongoDB BEFORE starting the server
connectDB().then(() => {
  app.use("/api/auth", authRoutes); // auth routes
  app.use("/api/messages", messageRoutes); // message routes

  app.listen(PORT, () => {
    console.log('Server is running on port PORT: ' + PORT);
  });
});
