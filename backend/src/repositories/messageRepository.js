import { Message } from "../models/MessageModel.js";

export const createMessage = async ({
  senderId,
  receiverId,
  text,
}) => {
  return await Message.create({
    senderId,
    receiverId,
    text,
  });
};

export const findDialogMessages = async (
  userId,
  contactId
) => {
  return await Message.find({
    $or: [
      {
        senderId: userId,
        receiverId: contactId,
      },
      {
        senderId: contactId,
        receiverId: userId,
      },
    ],
  }).sort({
    createdAt: 1,
  });
};