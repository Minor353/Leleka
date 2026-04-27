import React from 'react'
import ChatHead from '../ChatHead/ChatHead'
import ChatMain from '../ChatMain/ChatMain'

export default function ChatWrap() {
  return (
    <div className='chat-wrap'>
        <ChatHead></ChatHead>
        <ChatMain></ChatMain>
    </div>
  )
}
