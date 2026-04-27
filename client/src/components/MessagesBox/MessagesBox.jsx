import React from 'react'
import Message from '../Message/Message'

export default function MessagesBox() {
  return (
    <div className='messages-box'>
        <ul className='messages-box__list'>
            <li className='messages-box__list-item'>
                <Message></Message>
            </li>
        </ul>
    </div>
  )
}
