import express from "express";

import { authMiddleware } from "../middlewares/authMiddleware.js";

import {
  sendMessageController,
  getDialogMessagesController,
} from "../controllers/messageController.js";

const router = express.Router();

router.post("/", authMiddleware, sendMessageController);

router.get("/:userId", authMiddleware, getDialogMessagesController);

export default router;