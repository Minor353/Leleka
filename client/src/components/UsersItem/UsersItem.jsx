import React from 'react'

import { formatMessageDate } from '../../helpers/formatMessageTime'

import style from './style.module.scss'
import avatar from '../../assets/avatar.png'

export default function UsersItem({ user, isActive, onClick, lastMessage }) {
    const formattedDate = lastMessage
        ? formatMessageDate(lastMessage.createdAt)
        : '';
  return (
    <div onClick={onClick}
        className={`
            ${style['users-item']}
            ${isActive ? style['active'] : ''}
        `}>
        <div className={style['users-item__side']}>
            <div className={style['users-item__avatar']}>
                <img width="50" height="50" src={avatar} alt="avatar" />
            </div>
        </div>
        <div className={style['users-item__side']}>
            <div className={style['users-item__side-box']}>
                <span className={style['users-item__name']}>{user.displayName}</span>
                <span className={style['users-item__date']}>
                    {lastMessage ? formattedDate : 'Нет сообщений'}
                </span>
            </div>
            <div className={style['users-item__side-box']}>
                <div className={style['users-item__preview-msg']}>
                    {lastMessage ? lastMessage.text : 'Нет сообщений'}
                </div>
            </div>
        </div>
    </div>
  )
}
