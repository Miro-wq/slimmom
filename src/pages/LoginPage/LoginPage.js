import React, { useState } from 'react';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import Header from '../../components/Header/Header';
import styles from './LoginPage.module.css';
import { supabase } from '../../services/supabaseClient';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.error('Eroare la logare:', error.message);
    } else {
      console.error("Login error:", error);
      console.log('Logare reușită:', data);
      navigate('/calculator'); // redirect după logare
    }
  };

  return (
    <>
      <div className={styles.container}>
        <Header />
        <div className={styles.loginContainer}>
          <h2 className={styles.loginPage}>log in</h2>
          <form className={styles.formGroupLogin} onSubmit={handleLogin}>
            <TextField
              label="Email"
              variant="standard"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            <div className={styles.btnContainer}>
              <button className={styles.logBtn} type="submit">Log in</button>
              <button className={styles.regBtn} onClick={() => navigate('/register')}>Register</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
