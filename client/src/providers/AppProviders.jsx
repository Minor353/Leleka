import { BrowserRouter } from 'react-router-dom';

import { UserProvider } from '../context/UserContext';
import { ContactsProvider } from '../context/ContactsContext';
import { ChatProvider } from '../context/ChatContext';
import { MessagesProvider } from '../context/MessagesContext';

export default function AppProviders({ children }) {
  return (
    <MessagesProvider>
      <UserProvider>
        <ContactsProvider>
          <ChatProvider>
            <BrowserRouter>
              {children}
            </BrowserRouter>
          </ChatProvider>
        </ContactsProvider>
      </UserProvider>
    </MessagesProvider>
  );
}