import React from 'react'
import Message from '../Message/Message'

import { useMessages } from '../../context/MessagesContext'
import { useChat } from '../../context/ChatContext'
import { useUser } from '../../context/UserContext'

import { useEffect, useRef } from 'react'

import style from './style.module.scss'

export default function MessagesBox({ messageSearch }) {

    const messagesEndRef = useRef(null);

    const { messages } = useMessages();
    const { selectedUserId } = useChat();
    const { currentUser } = useUser();

    const currentMessages = messages.filter((message) => {
        const isCurrentUserSender =
            message.senderId === currentUser.id &&
            message.receiverId === selectedUserId;

        const isSelectedUserSender =
            message.senderId === selectedUserId &&
            message.receiverId === currentUser.id;

        return (
            isCurrentUserSender ||
            isSelectedUserSender
        );
    });

    const filteredMessages = currentMessages.filter(
        (message) =>
            message.text
            .toLowerCase()
            .includes(messageSearch.toLowerCase())
    );

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: 'smooth',
        });
    }, [currentMessages]);


  return (
    <div className={style['messages-box']}>
        <ul className={style['messages-box__list']}>
            {filteredMessages.map((message) => (
                <li key={message.id} className={style['messages-box__list-item']}>
                    <Message
                        message={message}
                        isOwn={
                            message.senderId === currentUser.id
                        }
                    />
                </li>
            ))}
            <div ref={messagesEndRef}></div>
        </ul>
    </div>
  )
}
