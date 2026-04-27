import React from 'react'
import UsersItem from '../UsersItem/UsersItem'

export default function UsersList() {
  return (
    <ul className='users-list'>
        <li className='users-list__item'>
            <UsersItem></UsersItem>
        </li>
    </ul>
  )
}
