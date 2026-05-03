import React from 'react'
import SearchBar from '../SearchBar/SearchBar'

import style from './style.module.scss'

export default function ChatHead() {
  return (
    <div className={style['chat-head']}>
        <div className={style['chat-head__companion-name']}>Віктор Вран</div>
        <div className={style['chat-head__search']}> 
            <SearchBar></SearchBar>
        </div>
    </div>
  )
}
