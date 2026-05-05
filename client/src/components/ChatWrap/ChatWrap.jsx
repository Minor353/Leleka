import React from 'react'
import ChatHead from '../ChatHead/ChatHead'
import ChatMain from '../ChatMain/ChatMain'

import style from './style.module.scss'

export default function ChatWrap() {
  return (
    <div className={style['chat-wrap']}>
        <ChatHead></ChatHead>
        <ChatMain></ChatMain>
    </div>
  )
}
