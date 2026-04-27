import React from 'react'
import SearchBar from '../SearchBar/SearchBar'

export default function ChatHead() {
  return (
    <div className='chat-head'>
        <div className='chat-head__companion-name'>Лариса Пєтровна</div>
        <SearchBar></SearchBar>
    </div>
  )
}
