import React from 'react'
import Message from '../Message/Message'

import style from './style.module.scss'

export default function MessagesBox() {
  return (
    <div className={style['messages-box']}>
        <ul className={style['messages-box__list']}>
            <li className={style['messages-box__list-item']}>
                <Message key={1} isOwn={false}></Message>
            </li>
            <li className={style['messages-box__list-item']}>
                <Message key={2} isOwn={true}></Message>
            </li>
            <li className={style['messages-box__list-item']}>
                <Message key={3} isOwn={true}></Message>
            </li>
            <li className={style['messages-box__list-item']}>
                <Message key={4} isOwn={false}></Message>
            </li>
            <li className={style['messages-box__list-item']}>
                <Message key={5} isOwn={false}></Message>
            </li>
        </ul>
    </div>
  )
}
