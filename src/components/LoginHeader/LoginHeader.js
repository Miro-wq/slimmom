import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.png';
import logo2 from '../../assets/logo2.png';
import loginLeef from '../../assets/loginLeef.png';
import loginLeefSmall from '../../assets/loginLeefSmall.png';
import styles from './LoginHeader.module.css';
import { supabase } from '../../services/supabaseClient';

const Header = () => {
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const getUserName = async () => {
            const { data: { session }, error } = await supabase.auth.getSession();
            if (error) {
                console.error('Error getting session:', error);
            } else if (session) {
                const name = session.user.user_metadata.name || session.user.email;
                setUserName(name);
            }
        };
        getUserName();
    }, []);

    const handleExit = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Error signing out:", error);
        }
        navigate('/login');
    };


    return (
        <>
            <div className={styles.buttonContainer}>
                <img src={logo} alt="SlimMom logo" className={styles.logoImage} onClick={() => navigate('/')} />
                <img src={logo2} alt="SlimMom logo" className={styles.logoImage2} onClick={() => navigate('/')} />
                <div className={styles.calcBtnContainer}>
                    <div className={styles.homeButtonsContainer}>
                        <button
                            className={`${styles.homeButtons} ${location.pathname === '/calculator' ? styles.activeButton : ''
                                }`}
                            onClick={() => navigate('/calculator')}
                        >
                            calculator
                        </button>
                        <button
                            className={`${styles.homeButtons} ${location.pathname === '/diary' ? styles.activeButton : ''
                                }`}
                            onClick={() => navigate('/diary')}
                        >
                            diary
                        </button>
                    </div>
                    <div className={styles.headerRight}>
                        <span className={styles.userName}>{userName}</span>
                        <button className={styles.exitButton} onClick={handleExit}>
                            Exit
                        </button>
                    </div>
                </div>
            </div>
            <img src={loginLeef} alt="frame" className={styles.leefFrame} />
            <img src={loginLeefSmall} alt="smallFrame" className={styles.loginLeefSmall} />
        </>
    );
};

export default Header;