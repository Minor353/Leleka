import { createContext, useContext, useState } from "react";

import { socket } from "../socket";

import { useEffect, useRef } from "react";

import { useUser } from "./UserContext";
import { useUnread } from "./UnreadContext";
import { useChat } from "./ChatContext";
import { useContacts } from "./ContactsContext";

const MessagesContext = createContext(null);

export function MessagesProvider({ children }) {
  const [messages, setMessages] = useState([]);

  const { incrementUnread } = useUnread();
  const { selectedUserId } = useChat();
  const { currentUser } = useUser();
  const { contacts } = useContacts();

  const selectedUserIdRef = useRef(selectedUserId);

  useEffect(() => {
    selectedUserIdRef.current = selectedUserId;
  }, [selectedUserId]);

  useEffect(() => {
    const handleNewMessage = (message) => {
      setMessages((prev) => [...prev, message]);

      if (selectedUserIdRef.current !== message.senderId) {
        incrementUnread(message.senderId);
      }
    };

    socket.on("message:new", handleNewMessage);

    return () => {
      socket.off("message:new", handleNewMessage);
    };
  }, [incrementUnread]);

  useEffect(() => {
    const fetchAllDialogs = async () => {
      const token = localStorage.getItem("token");

      if (!token || !currentUser) {
        setMessages([]);
        return;
      }

      try {
        const dialogs = await Promise.all(
          contacts.map(async (contact) => {
            const response = await fetch(
              `http://localhost:5000/messages/${contact.contactId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              },
            );

            if (!response.ok) {
              return [];
            }

            return await response.json();
          }),
        );

        setMessages(dialogs.flat());
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllDialogs();
  }, [contacts, currentUser]);

  useEffect(() => {
    const fetchMessages = async () => {
      const token = localStorage.getItem("token");

      if (!token || !currentUser || !selectedUserId) {
        return;
      }

      const response = await fetch(
        `http://localhost:5000/messages/${selectedUserId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        return;
      }

      const data = await response.json();

      setMessages((prev) => {
        const otherMessages = prev.filter((message) => {
          const isCurrentDialog =
            (message.senderId === currentUser.id &&
              message.receiverId === selectedUserId) ||
            (message.senderId === selectedUserId &&
              message.receiverId === currentUser.id);

          return !isCurrentDialog;
        });

        return [...otherMessages, ...data];
      });
    };

    fetchMessages();
  }, [currentUser, selectedUserId]);

  async function sendMessage(message) {
    const tempId = `temp-${Date.now()}`;

    const optimisticMessage = {
      ...message,
      id: tempId,
      status: "sending",
    };

    setMessages((prev) => [...prev, optimisticMessage]);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          receiverId: message.receiverId,
          text: message.text,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setMessages((prev) =>
        prev.map((item) => (item.id === tempId ? data : item)),
      );
    } catch (error) {
      setMessages((prev) =>
        prev.map((item) =>
          item.id === tempId
            ? {
                ...item,
                status: "failed",
              }
            : item,
        ),
      );

      throw error;
    }
  }

  async function sendFilesMessage({ receiverId, text, files }) {
    const token = localStorage.getItem("token");

    const formData = new FormData();

    formData.append("receiverId", receiverId);
    formData.append("text", text);

    files.forEach((file) => {
      formData.append("files", file);
    });

    const response = await fetch("http://localhost:5000/messages/files", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    setMessages((prev) => [...prev, data]);
  }

  return (
    <MessagesContext.Provider
      value={{
        messages,
        sendMessage,
        sendFilesMessage,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
}

export function useMessages() {
  return useContext(MessagesContext);
}
