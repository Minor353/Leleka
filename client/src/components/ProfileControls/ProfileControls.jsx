import React from 'react'

import style from './style.module.scss'
import newChatImg from '../../assets/kebab-menu.svg'

export default function ProfileControls() {
  return (
    <div className={style['profile-controls']}>
      <button className={style['profile-controls__btn']}>
        <img width="28" height="28" src={newChatImg} alt="Profile menu" />
      </button>
      <div className={style['profile-controls__list']}>
        <button>Додати фото</button>
        <button>Вийти з аккаунта</button>
      </div>
    </div>
  )
}
