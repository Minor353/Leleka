import React from 'react'
import MessagesBox from '../MessagesBox/MessagesBox'
import MessagesInput from '../MessagesInput/MessagesInput'

export default function ChatMain() {
  return (
    <div className='chat-main'>
        <MessagesBox></MessagesBox>
        <MessagesInput></MessagesInput>
    </div>
  )
}
