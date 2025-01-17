import  jwt  from "jsonwebtoken";
import errorHandler from './errorHandler.js';
export const verifyToken = (req, res, next) => {
    const token = req.header("Authorization");
  
    if (!token) {
      console.error("Token not found.");
      return next(errorHandler(401, "You are not authenticated"));
    }
  
    try {
      const verified = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
      req.user = verified;
      next();
    } catch (err) {
      console.error("Token verification failed:", err);
      return next(errorHandler(401, "Invalid token"));
    }
  };
  