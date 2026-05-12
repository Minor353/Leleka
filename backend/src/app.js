import express from 'express';
import cors from 'cors';
import path from "path";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/uploads/:filename", (req, res) => {
  const filePath = `uploads/${req.params.filename}`;

  res.download(filePath);
});

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/contacts", contactRoutes);
app.use("/messages", messageRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'Leleka backend works 🚀',
  });
});

export default app;