import React from 'react'

export default function UsersItem() {
  return (
    <div className='users-item'>
        <div className='users-item__side'>
            <div className='users-item__avatar'>
                <img src="#" alt="avatar" />
            </div>
        </div>
        <div className='users-item__side'>
            <div className='users-item__side-box'>
                <span className='users-item__name'>Віктор Вран</span>
                <span className='users-item__date'>27.04.2026 18:11</span>
            </div>
            <div className='users-item__side-box'>
                <div className='users-item__preview-msg'>
                    Можливо так, а можливо і ні...
                </div>
            </div>
        </div>
    </div>
  )
}
