import React from 'react'

import style from './style.module.scss'

export default function Message({ isOwn = false }) {
  return (
    <div className={style['message'] + (isOwn ? ' ' + style['message--own'] : '')}>
        <div className={style['message__text']}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. At magni atque inventore deleniti dignissimos accusantium eum amet optio animi pariatur? Nulla molestias velit deleniti! Sit suscipit mollitia officia harum illo.</div>
        <div className={style['message__time']}>27.04.2026 18:05</div>
    </div>
  )
}
