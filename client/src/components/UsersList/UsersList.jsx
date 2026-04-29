import React from 'react'
import UsersItem from '../UsersItem/UsersItem'

import style from './style.module.scss'

export default function UsersList() {
  return (
    <ul className={style['users-list']}>
        <li className={style['users-list__item']}>
            <UsersItem key={'1'}></UsersItem>
        </li>
        <li className={style['users-list__item']}>
            <UsersItem key={'2'}></UsersItem>
        </li>
        <li className={style['users-list__item']}>
            <UsersItem key={'3'}></UsersItem>
        </li>
    </ul>
  )
}
