import React from 'react'

import style from './style.module.scss'
import avatar from '../../assets/avatar.png'

export default function UsersItem({ user }) {
  return (
    <div className={style['users-item']}>
        <div className={style['users-item__side']}>
            <div className={style['users-item__avatar']}>
                <img width="50" height="50" src={avatar} alt="avatar" />
            </div>
        </div>
        <div className={style['users-item__side']}>
            <div className={style['users-item__side-box']}>
                <span className={style['users-item__name']}>{user.displayName}</span>
                <span className={style['users-item__date']}>27.04.2026 18:11</span>
            </div>
            <div className={style['users-item__side-box']}>
                <div className={style['users-item__preview-msg']}>
                    Можливо так, а можливо і не так. Тут не вгадаєш
                </div>
            </div>
        </div>
    </div>
  )
}
