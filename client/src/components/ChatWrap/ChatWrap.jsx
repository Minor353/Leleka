import React from 'react'

import { useState } from 'react'

import ChatHead from '../ChatHead/ChatHead'
import ChatMain from '../ChatMain/ChatMain'

import style from './style.module.scss'

export default function ChatWrap() {
  const [messageSearch, setMessageSearch] = useState('');

  return (
    <div className={style['chat-wrap']}>
        <ChatHead
          messageSearch={messageSearch}
          setMessageSearch={setMessageSearch}
        />
        <ChatMain messageSearch={messageSearch} />
    </div>
  )
}
