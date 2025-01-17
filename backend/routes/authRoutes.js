import express from "express";
import multer from "multer";
import { login, logout, forgotPassword, signup } from "../controllers/authController.js";

const authRouter = express.Router();

// Configure Multer for file uploads
const upload = multer({
    dest: "uploads/",
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
      const allowedMimeTypes = ["image/jpeg", "image/png", "application/pdf"];
      if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error("Only .jpeg, .png, and .pdf files are allowed."));
      }
    },
  });
  

// Define routes
authRouter.post('/signup', upload.single("file"), signup); 
authRouter.post('/login', login);
authRouter.post('/logout', logout); 
authRouter.post('/forgot-password', forgotPassword); 

// Export the router
export default authRouter;
