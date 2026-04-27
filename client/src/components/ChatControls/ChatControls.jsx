import React from 'react'

import style from './style.module.scss'
import newChatImg from '../../assets/new-chat.svg'

export default function ChatControls() {
  return (
    <div className={style['chat-controls']}>
      <button className={style['chat-controls__btn']}>
        <img width="28" height="28" src={newChatImg} alt="New chat" />
      </button>
    </div>
  )
}
