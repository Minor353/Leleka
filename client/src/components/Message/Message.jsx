import React from 'react'

import { formatMessageDate } from '../../helpers/formatMessageTime';

import style from './style.module.scss'

export default function Message({ isOwn, message }) {

  const formattedDate = formatMessageDate(
    message.createdAt
  );

  return (
    <div className={style['message'] + (isOwn ? ' ' + style['message--own'] : '')}>
        <div className={style['message__text']}>{message.text}</div>
        <div className={style['message__time']}>{formattedDate}</div>
    </div>
  )
}
