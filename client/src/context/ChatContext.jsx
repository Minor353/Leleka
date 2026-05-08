import {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';

import { users } from '../mock/users';

const ChatContext = createContext(null);

export function ChatProvider({ children }) {
  const [selectedUserId, setSelectedUserId] = useState(() => {
    const savedUserId = localStorage.getItem('selectedUserId');

    return savedUserId
      ? JSON.parse(savedUserId)
      : null;
  });

  useEffect(() => {
    localStorage.setItem(
      'selectedUserId',
      JSON.stringify(selectedUserId)
    );
  }, [selectedUserId]);

  const selectedUser = users.find(
    (user) => user.id === selectedUserId
  );
  const clearSelectedUser = () => {
    setSelectedUserId(null);
};
  return (
    <ChatContext.Provider
      value={{
        selectedUserId,
        setSelectedUserId,
        selectedUser,
        clearSelectedUser,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => useContext(ChatContext);