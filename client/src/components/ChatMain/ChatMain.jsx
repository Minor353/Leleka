import React from 'react'
import MessagesBox from '../MessagesBox/MessagesBox'
import MessagesInput from '../MessagesInput/MessagesInput'

import style from './style.module.scss'

export default function ChatMain() {
  return (
    <div className={style['chat-main']}>
        <MessagesBox></MessagesBox>
        <MessagesInput></MessagesInput>
    </div>
  )
}
