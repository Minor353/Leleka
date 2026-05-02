import React, { useState } from 'react';
import logo from '../../assets/logo.png';
import styles from './style.module.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Дані для входу:', { username, password });
    alert(`Спроба входу для: ${username}`);
  };

  return (
    // 2. Використовуємо className замість style
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <img src={logo} alt="Лелека Лого" className={styles.logo} />
        
        <div className={styles.inputGroup}>
          <label>Логін:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Пароль:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />
        </div>

        <button type="submit" className={styles.button}>
          Вхід
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
