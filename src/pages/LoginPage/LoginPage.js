import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import Header from '../../components/Header/Header';
import styles from './LoginPage.module.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/login', { username, password });
      console.log(response.data);
      navigate('/diary');
    } catch (error) {
      console.error('Eroare la logare', error);
    }
  };

  return (
    <>
    <Header />
    <div className={styles.loginContainer}>
      <h2 className={styles.loginPage}>log in</h2>
      <form className={styles.formGroupLogin} onSubmit={handleLogin}>
          <TextField
            label="Username"
            variant="standard"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            margin="normal"
            sx={{ width: '240px' }}
            required
          />

          <TextField
            label="Password"
            variant="standard"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            sx={{ width: '240px' }}
            required
          />
        <button type="submit">Log in</button>
        <button className={styles.regBtn} onClick={() => navigate('/register')}>registration</button>
      </form>
    </div>
    </>
  );
};

export default LoginPage;
