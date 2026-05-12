import express from "express";

import { authMiddleware } from "../middlewares/authMiddleware.js";

import {
  createContactController,
  getContactsController,
} from "../controllers/contactController.js";

const router = express.Router();

router.get("/", authMiddleware, getContactsController);

router.post("/", authMiddleware, createContactController);

export default router;