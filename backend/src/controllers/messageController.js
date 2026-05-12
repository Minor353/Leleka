import {
  sendMessage,
  getDialogMessages,
} from "../services/messageService.js";

import { getIO } from "../socket.js";

export const sendMessageController =
  async (req, res) => {
    try {
      const { receiverId, text } =
        req.body;

      const message =
        await sendMessage({
          senderId: req.user.userId,
          receiverId,
          text,
        });

      const io = getIO();

        io.to(receiverId).emit(
            "message:new",
            message
        );

      res.status(201).json(message);
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  };

export const getDialogMessagesController =
  async (req, res) => {
    try {
      const messages =
        await getDialogMessages(
          req.user.userId,
          req.params.userId
        );

      res.json(messages);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };