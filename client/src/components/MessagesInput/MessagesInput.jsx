import React from 'react'

import style from './style.module.scss'

export default function MessagesInput() {
  return (
    <div className={style['messages-input']}>
        <form className={style['messages-input__form']} action="#" method="post">
            <input type="text" className={style['messages-input__input']} placeholder='Ваше повідомлення...' />
            <label className={style['messages-input__file-label']}>
                <input type="file" name="#" className={style['messages-input__file-input']} />
            </label>
            <button type="submit" className={style['messages-input__button']}>Відправити</button>
        </form>
    </div>
  )
}
