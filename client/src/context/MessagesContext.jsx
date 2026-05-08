import {
  createContext,
  useContext,
  useState,
} from 'react';

import { useEffect, useRef } from 'react';

import { messages as mockMessages } from '../mock/messages';

import { useUnread } from './UnreadContext';
import { useChat } from './ChatContext';

const MessagesContext = createContext(null);

export function MessagesProvider({ children }) {
  const [messages, setMessages] = useState(mockMessages);

  const { incrementUnread } = useUnread();
  const { selectedUserId } = useChat();

   const selectedUserIdRef = useRef(selectedUserId);

  useEffect(() => {
    selectedUserIdRef.current = selectedUserId;
  }, [selectedUserId]);

  const fakeReplies = [
    'Та потихеньку 🙂',
    'Зрозумів 👍',
    'Добре',
    'На звʼязку',
    'Зараз гляну',
    'Ок 👌',
    'Домовились',
  ];

  function sendMessage(message) {
    setMessages((prev) => [
      ...prev,
      message,
    ]);

    const randomReply =
      fakeReplies[
        Math.floor(Math.random() * fakeReplies.length)
      ];

    setTimeout(() => {
      const fakeReplyMessage = {
        id: Date.now() + 1,
        senderId: message.receiverId,
        receiverId: message.senderId,
        text: randomReply,
        createdAt: new Date().toISOString(),
      };

      if (selectedUserIdRef.current !== fakeReplyMessage.senderId) {
        incrementUnread(fakeReplyMessage.senderId);
      }

      setMessages((prev) => [
        ...prev,
        fakeReplyMessage,
      ]);
    }, 5500);
  }

  return (
    <MessagesContext.Provider
      value={{
        messages,
        sendMessage,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
}

export function useMessages() {
  return useContext(MessagesContext);
}