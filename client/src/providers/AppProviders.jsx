import { BrowserRouter } from 'react-router-dom';

import { UserProvider } from '../context/UserContext';
import { ContactsProvider } from '../context/ContactsContext';
import { ChatProvider } from '../context/ChatContext';
import { MessagesProvider } from '../context/MessagesContext';
import { UnreadProvider } from '../context/UnreadContext';
import { UsersProvider } from '../context/UsersContext';

export default function AppProviders({ children }) {
  return (
    <UserProvider>
      <UsersProvider>
        <ContactsProvider>
          <ChatProvider>
            <UnreadProvider>
              <MessagesProvider>
                <BrowserRouter>
                  {children}
                </BrowserRouter>
              </MessagesProvider>
            </UnreadProvider>
          </ChatProvider>
        </ContactsProvider>
      </UsersProvider>
    </UserProvider>
  );
}