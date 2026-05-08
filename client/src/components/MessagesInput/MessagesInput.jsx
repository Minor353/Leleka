import React from 'react'

import { useState } from 'react';

import { useMessages } from '../../context/MessagesContext';
import { useUser } from '../../context/UserContext';
import { useChat } from '../../context/ChatContext';

import style from './style.module.scss'

export default function MessagesInput() {
  const [text, setText] = useState('');

  const { sendMessage, messages } = useMessages();
  const { currentUser } = useUser();
  const { selectedUserId } = useChat();

  const isChatSelected = Boolean(selectedUserId);

  function handleSubmit(e) {
    e.preventDefault();

    if (!text.trim() || !selectedUserId) return;

    const newMessage = {
      id: Date.now(),
      senderId: currentUser.id,
      receiverId: selectedUserId,
      text,
      createdAt: new Date().toISOString(),
    };

    sendMessage(newMessage);

    setText('');
  }

  return (
    <div className={style['messages-input']}>
        <form 
          className={style['messages-input__form']} 
          action="#" 
          method="post"
          onSubmit={handleSubmit}
        >
            <input 
              disabled={!isChatSelected}
              value={text} 
              onChange={(e) => setText(e.target.value)} 
              type="text" 
              className={style['messages-input__input']} 
              placeholder={
                isChatSelected
                  ? 'Ваше повідомлення...'
                  : 'Оберіть чат'
              } 
            />
            <label className={style['messages-input__file-label']}>
                <input disabled={!isChatSelected}  type="file" name="#" className={style['messages-input__file-input']} />
            </label>
            <button disabled={!isChatSelected} type="submit" className={style['messages-input__button']}>Відправити</button>
        </form>
    </div>
  )
}
