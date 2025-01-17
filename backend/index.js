import express from "express";
import cors from "cors";
import { config } from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoutes.js"
import courseRoutes from './routes/courses.js';
import router from './routes/userRoutes.js';
// used for configuration 
config();
// used for web application configuration
const app = express();
// used for cross origin resources shariong 
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
// data connection 
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to MongoDB database"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// API endpoint
app.get('/', (req, res) => res.send("API THE WAY THE PERFORM THE FUNCTION"));
app.use('/api/auth', authRouter);
app.use("/api", courseRoutes);
app.use("/api/user", router);
  

  // Start server
app.listen(7000, () => {
    console.log("Server is running on port: 7000");
  });                                            