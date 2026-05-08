import React from 'react'

import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { useUser } from "../../context/UserContext"
import { useChat } from "../../context/ChatContext"

import style from './style.module.scss'
import newChatImg from '../../assets/kebab-menu.svg'

export default function ProfileControls() {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const { logout } = useUser();
  const { clearSelectedUser } = useChat();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }

  const handleLogout = () => {
    logout();
    clearSelectedUser();
    navigate('/login');
  }

  return (
    <div className={style['profile-controls']}>
      <button className={style['profile-controls__btn']} onClick={toggleMenu}>
        <img width="28" height="28" src={newChatImg} alt="Profile menu" />
      </button>
      <div className={`${style['profile-controls__list']} ${isOpen ? style['active'] : ''}`}>
        <button onClick={handleLogout}>Вийти з аккаунта</button>
      </div>
    </div>
  )
}
