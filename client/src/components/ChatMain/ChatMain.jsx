import React from 'react'
import MessagesBox from '../MessagesBox/MessagesBox'
import MessagesInput from '../MessagesInput/MessagesInput'

import style from './style.module.scss'

export default function ChatMain({ messageSearch }) {
  return (
    <div className={style['chat-main']}>
        <MessagesBox messageSearch={messageSearch}></MessagesBox>
        <MessagesInput></MessagesInput>
    </div>
  )
}
