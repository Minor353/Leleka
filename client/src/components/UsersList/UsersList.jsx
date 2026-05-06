import React from 'react'
import UsersItem from '../UsersItem/UsersItem'

import { users } from '../../mock/users'

import { useContacts } from '../../context/ContactsContext'
import { useUser } from "../../context/UserContext"

import style from './style.module.scss'

export default function UsersList() {
    const { currentUser } = useUser();
    const { contacts } = useContacts();
    const currentUserContacts = contacts.filter(
        (contact) => contact.userId === currentUser.id
    );
    const contactUsers = users.filter((user) =>
        currentUserContacts.some(
            (contact) => contact.contactId === user.id
        )
    );
  return (
    <ul className={style['users-list']}>
        {contactUsers.map((user) => (
            <li
                key={user.id}
                className={style['users-list__item']}
            >
                <UsersItem user={user} />
            </li>
        ))}
    </ul>
  )
}
