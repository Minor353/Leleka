import {
  createContext,
  useContext,
  useState,
} from 'react';

import { messages as mockMessages } from '../mock/messages';

const MessagesContext = createContext(null);

export function MessagesProvider({ children }) {
  const [messages, setMessages] = useState(mockMessages);

  function sendMessage(message) {
    setMessages((prev) => [
        ...prev,
        message,
    ]);
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