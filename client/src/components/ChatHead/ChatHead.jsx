import React from 'react';
import SearchBar from '../SearchBar/SearchBar';

import { useChat } from '../../context/ChatContext';

import style from './style.module.scss';

export default function ChatHead() {
  const { selectedUser } = useChat();

  return (
    <div className={style['chat-head']}>
      <div className={style['chat-head__companion-name']}>
        {selectedUser
          ? selectedUser.displayName
          : 'Оберіть чат'}
      </div>

      <div className={style['chat-head__search']}>
        <SearchBar />
      </div>
    </div>
  );
}