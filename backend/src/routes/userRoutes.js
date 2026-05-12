import express from "express";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import { getAllUsers } from "../controllers/userController.js";

const router = express.Router();

router.get("/", authMiddleware, getAllUsers);

export default router;