import { createContext, useContext, useState } from 'react'

import { contacts as mockContacts } from '../mock/contacts'

const ContactsContext = createContext(null);

export function ContactsProvider({ children }) {
  const [contacts, setContacts] = useState(mockContacts);

  const addContact = (userId, contactId) => {
    setContacts((prev) => [
      ...prev,
      {
        userId,
        contactId,
      },
    ]);
  };

  return (
    <ContactsContext.Provider
      value={{
        contacts,
        addContact,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
}

export const useContacts = () => useContext(ContactsContext);