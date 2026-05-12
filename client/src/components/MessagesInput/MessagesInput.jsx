import React from 'react'

import { useRef, useState } from 'react';

import { useMessages } from '../../context/MessagesContext';
import { useUser } from '../../context/UserContext';
import { useChat } from '../../context/ChatContext';

import FileUploadModal from '../FileUploadModal/FileUploadModal';

import style from './style.module.scss'

export default function MessagesInput() {
  const [text, setText] = useState('');
  const [isUploadOpen, setIsUploadOpen] =
  useState(false);

  const textareaRef = useRef(null);

  const { sendMessage } = useMessages();
  const { currentUser } = useUser();
  const { selectedUserId } = useChat();

  const isChatSelected = Boolean(selectedUserId);

  function handleChange(e) {
    setText(e.target.value);

    const textarea = textareaRef.current;

    if (!textarea) return;

    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  function handleKeyDown(e) {
    if (
      e.key === "Enter" &&
      !e.shiftKey
    ) {
      e.preventDefault();

      handleSubmit(e);
    }
  }

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

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  }

  return (
    <div className={style['messages-input']}>
        <form 
          className={style['messages-input__form']} 
          action="#" 
          method="post"
          onSubmit={handleSubmit}
        >
            <textarea
              ref={textareaRef}
              disabled={!isChatSelected}
              value={text}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className={style['messages-input__input']}
              placeholder={
                isChatSelected
                  ? 'Ваше повідомлення...'
                  : 'Оберіть чат'
              }
            />
            <button
              type="button"
              disabled={!isChatSelected}
              onClick={() => setIsUploadOpen(true)}
              className={style['messages-input__file-button']}
            >
            </button>
            <button disabled={!isChatSelected} type="submit" className={style['messages-input__button']}>Відправити</button>
        </form>
        <FileUploadModal
          isOpen={isUploadOpen}
          onClose={() => setIsUploadOpen(false)}
        />
    </div>
  )
}
