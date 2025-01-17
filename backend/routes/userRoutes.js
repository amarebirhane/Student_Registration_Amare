import express from "express";
import { test, updateUser, getUserProfile} from "../controllers/userController.js";
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

router.get('/', test);
router.get("/profile", verifyToken, getUserProfile);
router.post("/update/:id", verifyToken,updateUser);

export default router;