import { useState } from 'react'

import { useContacts } from '../../context/ContactsContext'
import { useUser } from '../../context/UserContext'
import { useUsers } from '../../context/UsersContext'

import SearchBar from '../SearchBar/SearchBar'

import style from './style.module.scss'

export default function NewContactModal({ onClose }) {
    const [search, setSearch] = useState('');

    const { currentUser } = useUser();
    const { contacts, addContact } = useContacts();
    const { users } = useUsers();

    const currentUserContacts = contacts.filter(
        (contact) => contact.userId === currentUser.id
    );

    const availableUsers = users.filter((user) => {
        const isCurrentUser = user.id === currentUser.id;

        const isAlreadyContact = currentUserContacts.some(
            (contact) => contact.contactId === user.id
        );

        const normalizedSearch = search.toLowerCase();

        const matchesDisplayName = user.displayName
            .toLowerCase()
            .includes(normalizedSearch);

        const matchesId = String(user.id).includes(normalizedSearch);

        const matchesSearch = matchesDisplayName || matchesId;

        return (
            !isCurrentUser &&
            !isAlreadyContact &&
            matchesSearch
        );
    });

  return (
    <div
      className={style['new-contact__overlay']}
      onClick={onClose}
    >
      <div
        className={style['new-contact__modal']}
        onClick={(e) => e.stopPropagation()}
      >
        <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Знайти користувача за іменем або ID"
        />
        <ul className={style['new-contact__list']}>
            {availableUsers.length > 0 ? (
                availableUsers.map((user) => (
                    <li 
                        onClick={async () => {
                            try {
                                await addContact(user.id);
                            } catch (error) {
                                alert(error.message);
                            }
                        }}
                        key={user.id} 
                        className={style['new-contact__list-item']}>
                        {user.displayName} #{user.id}
                    </li>
                ))
            ) : (
                    <li className={style['new-contact__list-item--empty']}>
                    Такого користувача не існує
                    </li>
            )}
        </ul>
      </div>
    </div>
  );
}