import React from 'react'
import UserBar from '../../components/User-bar/UserBar'
import ChatWrap from '../../components/ChatWrap/ChatWrap'

import style from './style.module.scss'

export default function Chat() {
  return (
    <div className={style['chat-page']}>
        <div className={style['chat-page__aside']}>
            <UserBar></UserBar> 
        </div>
        <div className={style['chat-page__aside']}>
            <ChatWrap></ChatWrap>
        </div>
    </div>
  )
}
