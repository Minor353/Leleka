import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import { users } from "../../mock/users";
import { useUser } from "../../context/UserContext";

import logo from '../../assets/logo.png';

import styles from './style.module.css';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { login } = useUser();

  const handleSubmit = (e) => {
    e.preventDefault();

    const foundUser = users.find(
      (user) =>
        user.username === username &&
        user.password === password
    );

    if (!foundUser) {
      alert('Невірний логін або пароль');
      return;
    }

    login(foundUser);

    navigate('/chat');
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <img src={logo} alt="Лелека Лого" className={styles.logo} />
        
        <div className={styles.inputGroup}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
            required
            placeholder='Логін:'
          />
        </div>

        <div className={styles.inputGroup}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
            placeholder='Пароль:'
          />
        </div>

        <button type="submit" className={styles.button}>
          Вхід
        </button>
      </form>
    </div>
  );
};
