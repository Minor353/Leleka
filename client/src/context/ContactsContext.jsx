import { createContext, useContext, useState } from 'react'
import { useUser } from './UserContext'
import { useEffect } from 'react'

const ContactsContext = createContext(null);

export function ContactsProvider({ children }) {
  const { currentUser } = useUser();
  const [contacts, setContacts] = useState([]);

  const addContact = async (contactId) => {
    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://localhost:5000/contacts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          contactId,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    setContacts((prev) => [
      ...prev,
      data,
    ]);
  };

  useEffect(() => {
    const fetchContacts = async () => {
      const token =
        localStorage.getItem("token");

      if (!token || !currentUser) {
        setContacts([]);
        return;
      }

      const response = await fetch(
        "http://localhost:5000/contacts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setContacts([]);
        return;
      }

      setContacts(data);
    };

    fetchContacts();
  }, [currentUser]);

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