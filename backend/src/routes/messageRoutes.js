import express from "express";

import { upload } from "../middlewares/uploadMiddleware.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";

import {
  sendMessageController,
  getDialogMessagesController,
  uploadFilesMessageController,
} from "../controllers/messageController.js";

const router = express.Router();

router.post("/", authMiddleware, sendMessageController);

router.post(
  "/files",
  authMiddleware,
  upload.array("files", 10),
  uploadFilesMessageController
);

router.get("/:userId", authMiddleware, getDialogMessagesController);

export default router;