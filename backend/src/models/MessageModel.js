import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      enum: ["text", "files"],
      default: "text",
    },

    text: {
      type: String,
      trim: true,
      default: "",
    },

    files: [
      {
        url: {
          type: String,
          required: true,
        },

        name: {
          type: String,
          required: true,
        },

        mimeType: {
          type: String,
          required: true,
        },

        size: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Message = mongoose.model(
  "Message",
  messageSchema
);