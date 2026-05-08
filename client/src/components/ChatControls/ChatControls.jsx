import React from 'react'
import { useState } from 'react'

import NewContactModal from '../NewContactModal/NewContactModal'

import style from './style.module.scss'
import newChatImg from '../../assets/new-chat.svg'

export default function ChatControls() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={style['chat-controls']}>
      <button onClick={() => setIsModalOpen((prev) => !prev)} className={style['chat-controls__btn']}>
        <img width="28" height="28" src={newChatImg} alt="New chat" />
      </button>
      {isModalOpen && (
        <NewContactModal
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  )
}
