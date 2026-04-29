import React from 'react'

import style from './style.module.scss'
import soundIcon from '../../assets/sound.png'

export default function SoundControls() {
  return (
    <div className={style['sound-control']}>
      <button className={style['sound-control__btn']}>
        <img width="28" height="28" src={soundIcon} alt="New chat" />
      </button>
    </div>
  )
}
