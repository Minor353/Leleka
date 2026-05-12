import {
  createMessage,
  findDialogMessages,
} from "../repositories/messageRepository.js";

import { findUserById } from "../repositories/authRepository.js";

import {
  createContact,
  findContact,
} from "../repositories/contactRepository.js";

const ensureContactExists = async (
  userId,
  contactId
) => {
  const existingContact = await findContact(
    userId,
    contactId
  );

  if (existingContact) {
    return;
  }

  await createContact(
    userId,
    contactId
  );
};

export const sendMessage = async ({
  senderId,
  receiverId,
  text = "",
  type = "text",
  files = [],
}) => {
    const hasText = text.trim().length > 0;
    const hasFiles = files.length > 0;

    if (!hasText && !hasFiles) {
    throw new Error(
        "Message cannot be empty"
    );
    }

  if (senderId === receiverId) {
    throw new Error(
        "You cannot send message to yourself"
    );
  }

  const receiver = await findUserById(
        receiverId
    );

    if (!receiver) {
        throw new Error(
            "Receiver not found"
        );
    }

  await ensureContactExists(
    senderId,
    receiverId
  );

  await ensureContactExists(
    receiverId,
    senderId
  );

  const message = await createMessage({
    senderId,
    receiverId,
    type,
    text,
    files,
  });

  return {
    id: message._id,
    senderId:
        message.senderId.toString(),
    receiverId:
        message.receiverId.toString(),
    type: message.type,
    text: message.text,
    files: message.files,
    createdAt: message.createdAt,
  };
};

export const getDialogMessages =
  async (userId, contactId) => {
    const messages =
      await findDialogMessages(
        userId,
        contactId
      );

    return messages.map((message) => ({
      id: message._id,
      senderId:
        message.senderId.toString(),
      receiverId:
        message.receiverId.toString(),
      text: message.text,
      createdAt: message.createdAt,
      type: message.type,
      files: message.files,
    }));
  };