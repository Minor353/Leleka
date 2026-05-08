import {
  createContext,
  useContext,
  useState,
} from 'react';

const UnreadContext = createContext(null);

export function UnreadProvider({ children }) {
  const [unreadMessages, setUnreadMessages] = useState({});

  function incrementUnread(userId) {
    setUnreadMessages((prev) => ({
      ...prev,
      [userId]: (prev[userId] || 0) + 1,
    }));
  }

  function clearUnread(userId) {
    setUnreadMessages((prev) => ({
      ...prev,
      [userId]: 0,
    }));
  }

  return (
    <UnreadContext.Provider
      value={{
        unreadMessages,
        incrementUnread,
        clearUnread,
      }}
    >
      {children}
    </UnreadContext.Provider>
  );
}

export function useUnread() {
  return useContext(UnreadContext);
}