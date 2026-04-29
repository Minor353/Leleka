import React from 'react'
import Logo from '../Logo/Logo'
import ChatControls from '../ChatControls/ChatControls'
import ProfileControls from '../ProfileControls/ProfileControls'
import SoundControls from '../SoundControls/SoundControls'
import SearchBar from '../SearchBar/SearchBar'
import UsersList from '../UsersList/UsersList'

import style from './style.module.scss'

export default function UserBar() {
  return (
    <div className={style['user-bar']}>
        <div className={style['user-bar__head']}>
            <div className={style['user-bar__head-item']}>
                <div className={style['user-bar__head-logo']}>
                    <Logo></Logo>
                </div>
                <div className={style['user-bar__head-sound-control']}>
                    <SoundControls></SoundControls>
                </div>
                <div className={style['user-bar__head-chat-controls']}>
                    <ChatControls></ChatControls>
                </div>
                <div className={style['user-bar__head-profile-controls']}>
                    <ProfileControls></ProfileControls>
                </div>
            </div>
        </div>
        <div className={style['user-bar__main']}>
            <div className={style['user-bar__main-search']}>
                <SearchBar></SearchBar>
            </div>
            <div className={style['user-bar__main-users']}>
                <UsersList></UsersList>
            </div>
        </div>
    </div>
  )
}
