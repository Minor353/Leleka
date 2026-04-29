import React from 'react'

import style from './style.module.scss'

export default function SearchBar() {
  return (
    <div className={style['search-bar']}>
        <form className={style['search-bar__form']} action="#" method="get">
            <input className={style['search-bar__input']} type="search" name="search" placeholder='Пошук...' />
        </form>
    </div>
  )
}
