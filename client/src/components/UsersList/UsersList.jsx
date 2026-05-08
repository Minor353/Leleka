import React from 'react'
import { useState } from 'react';

import { useEffect } from 'react';

import UsersItem from '../UsersItem/UsersItem'
import SearchBar from '../SearchBar/SearchBar';

import { users } from '../../mock/users'

import { useContacts } from '../../context/ContactsContext'
import { useUser } from "../../context/UserContext"
import { useChat } from '../../context/ChatContext';
import { useMessages } from '../../context/MessagesContext';
import { useUnread } from '../../context/UnreadContext';

import style from './style.module.scss'

export default function UsersList() {
    const { currentUser } = useUser();
    const { contacts } = useContacts();
    const { messages } = useMessages();
    const { setSelectedUserId, selectedUserId } = useChat();
    const { unreadMessages, clearUnread } = useUnread();

    const [search, setSearch] = useState('');

    const currentUserContacts = contacts.filter(
        (contact) => contact.userId === currentUser.id
    );
    const contactUsers = users.filter((user) =>
        currentUserContacts.some(
            (contact) => contact.contactId === user.id
        )
    );

    const sortedContactUsers = [...contactUsers].sort(
        (a, b) => {
            const lastMessageA = getLastMessage(a.id);
            const lastMessageB = getLastMessage(b.id);

            if (!lastMessageA) return 1;
            if (!lastMessageB) return -1;

            return (
            new Date(lastMessageB.createdAt) -
            new Date(lastMessageA.createdAt)
            );
        }
    );

    const filteredUsers = sortedContactUsers.filter(
        (user) =>
            user.displayName
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    function getLastMessage(userId) {
        const dialogMessages = messages.filter((message) => {
            const isCurrentUserSender =
            message.senderId === currentUser.id &&
            message.receiverId === userId;

            const isContactSender =
            message.senderId === userId &&
            message.receiverId === currentUser.id;

            return (
            isCurrentUserSender ||
            isContactSender
            );
        });

        return dialogMessages[dialogMessages.length - 1];
    }

    useEffect(() => {
        if (selectedUserId) {
            clearUnread(selectedUserId);
        }
    }, [selectedUserId]);
    
  return (
    <>
        <div className={style['users-list__search']}>
            <SearchBar
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Пошук..."
            />
        </div>
        <ul className={style['users-list']}>
            {filteredUsers.map((user) => {
                const lastMessage = getLastMessage(user.id);
                return (
                    <li
                        key={user.id}
                        className={style['users-list__item']}
                    >
                        <UsersItem 
                            user={user}
                            lastMessage={lastMessage}
                            isActive={selectedUserId === user.id}
                            onClick={() => setSelectedUserId(user.id)}
                            unreadCount={unreadMessages[user.id]}
                        />
                    </li>
                )}
            )}
        </ul>
    </>
  )
}
