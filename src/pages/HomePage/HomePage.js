import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
// import logo from '../../assets/logo.png';
// import logo2 from '../../assets/logo2.png';
// import leef from '../../assets/leef.png';
// import leefFrameSmall from '../../assets/leefFrameSmall.png';
// import banana from '../../assets/banana.png';
// import strawberry from '../../assets/strawberry.png';
// import vector from '../../assets/vector.png';
import Header from '../../components/Header/Header';
import styles from './HomePage.module.css';

const HomePage = () => {
  // const navigate = useNavigate();
  const [form, setForm] = useState({
    height: '',
    desiredWeight: '',
    age: '',
    bloodType: '',
    currentWeight: ''
  });

  const handleChange = (prop) => (event) => {
    setForm({ ...form, [prop]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // aici pt logica de validare sau trimiterea datelor catre endpoint
    console.log('Form data:', form);
  };

  return (
    <div className={styles.container}>
      <Header />
      {/* <div className={styles.buttonContainer}>
        <img src={logo} alt="SlimMom logo" className={styles.logoImage} />
        <img src={logo2} alt="SlimMom logo" className={styles.logoImage2} />
        <div className={styles.homeButtonsContainer}>
          <button className={styles.homeButtons} onClick={() => navigate('/login')}>log in</button>
          <button className={styles.homeButtons} onClick={() => navigate('/register')}>registration</button>
        </div>
      </div>
      <img src={leef} alt="frame" className={styles.leefFrame} />
      <img src={leefFrameSmall} alt="frame" className={styles.leefFrameSmall} />
      <img src={banana} alt="banana" className={styles.banana} />
      <img src={strawberry} alt="strawberry" className={styles.strawberry} />
      <img src={vector} alt="vector" className={styles.vector} /> */}
      <div className={styles.formContainer}>
        <h1 className={styles.homeDescription}>Calculate your daily calorie intake right now</h1>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Height*"
            variant="standard"
            value={form.height}
            onChange={handleChange('height')}
            fullWidth
            margin="normal"
            required
            sx={{ width: '240px', marginRight: '20px' }}
          />
          <TextField
            label="Desired weight*"
            variant="standard"
            value={form.desiredWeight}
            onChange={handleChange('desiredWeight')}
            fullWidth
            margin="normal"
            required
            sx={{ width: '240px', marginRight: '20px' }}
          />
          <TextField
            label="Age*"
            variant="standard"
            type="number"
            value={form.age}
            onChange={handleChange('age')}
            fullWidth
            margin="normal"
            required
            sx={{ width: '240px', marginRight: '20px' }}
          />
          <TextField
            label="Blood type*"
            variant="standard"
            value={form.bloodType}
            onChange={handleChange('bloodType')}
            fullWidth
            margin="normal"
            select
            SelectProps={{ native: true }}
            required
            sx={{ width: '240px', marginRight: '20px' }}
          >
            <option value="" />
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="AB">AB</option>
            <option value="O">O</option>
          </TextField>
          <TextField
            label="Current weight*"
            variant="standard"
            value={form.currentWeight}
            onChange={handleChange('currentWeight')}
            fullWidth
            margin="normal"
            required
            sx={{ width: '240px', marginRight: '20px' }}
          />
          {/* </div> */}
          <button className={styles.submitButton} type="submit">
            Start losing weight
          </button>
        </form>
      </div>
    </div>

  );
};

export default HomePage;
