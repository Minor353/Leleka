import dotenv from 'dotenv';

import http from 'http';

import { Server } from 'socket.io';

import { seedUsers } from './seeds/users.js';

import { setIO } from './socket.js';

import app from './app.js';
import { connectDB } from './config/db.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
  },
});

setIO(io);

io.on('connection', (socket) => {
  console.log(
    `User connected: ${socket.id}`
  );

  socket.on("user:online", ({ userId }) => {
    console.log(
      `User online: ${userId}, socket: ${socket.id}`
    );

    socket.join(userId);
  });

  socket.on('disconnect', () => {
    console.log(
      `User disconnected: ${socket.id}`
    );
  });
});

await connectDB();
await seedUsers();

server.listen(PORT, () => {
  console.log(
    `Server started on port ${PORT}`
  );
});