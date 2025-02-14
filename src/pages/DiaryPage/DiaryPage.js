import React, { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import LoginHeader from '../../components/LoginHeader/LoginHeader';
import styles from './DiaryPage.module.css';
import { supabase } from '../../services/supabaseClient';
import products from '../../data/products.json';

const DiaryPage = () => {
    const [currentUserId, setCurrentUserId] = useState(null);
    const [selectedDate, setSelectedDate] = useState(
        new Date().toISOString().substring(0, 10)
    );
    const [productName, setProductName] = useState('');
    const [grams, setGrams] = useState('');
    const [diaryEntries, setDiaryEntries] = useState([]);
    const [foodsNotRecommended] = useState([]);

    useEffect(() => {
        const fetchSession = async () => {
            const { data: { session }, error } = await supabase.auth.getSession();
            if (error) {
                console.error("Error getting session:", error);
            } else if (session) {
                setCurrentUserId(session.user.id);
            }
        };
        fetchSession();
    }, []);

    const loadDiaryEntries = async () => {
        if (!currentUserId) return;
        const { data, error } = await supabase
            .from('diary_entries')
            .select('*')
            .eq('user_id', currentUserId)
            .eq('entry_date', selectedDate);
        if (error) {
            console.error('Error fetching diary entries:', error);
        } else {
            setDiaryEntries(data || []);
        }
    };

    useEffect(() => {
        loadDiaryEntries();
    }, [selectedDate, currentUserId]);

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const handleAddEntry = async () => {
        if (!productName.trim() || !grams.trim() || !currentUserId) return;
        const newEntry = {
            date: selectedDate,
            productName: productName.trim(),
            grams: Number(grams)
        };

        const { error } = await supabase
            .from('diary_entries')
            .insert([
                {
                    user_id: currentUserId,
                    entry_date: newEntry.date,
                    product_name: newEntry.productName,
                    grams: newEntry.grams,
                },
            ]);

        if (error) {
            console.error('Error inserting diary entry:', error);
        } else {
            setProductName('');
            setGrams('');
            loadDiaryEntries();
        }
    };

    const formatDate = (isoDate) => {
        const [year, month, day] = isoDate.split('-');
        return `${day}/${month}/${year}`;
    };


    const totalConsumed = diaryEntries.reduce((sum, entry) => {
        const prod = products.find(
            (p) => p.title.toLowerCase() === entry.product_name.toLowerCase()
        );
        if (prod && prod.calories) {
            return sum + (entry.grams / 100) * prod.calories;
        }
        return sum;
    }, 0);

    const dailyRate = Number(localStorage.getItem('dailyRate'));
    const leftCalories = dailyRate - totalConsumed;
    const percentOfNormal = dailyRate ? ((totalConsumed / dailyRate) * 100).toFixed(0) : 0;

    return (
        <div className={styles.container}>
            <LoginHeader />
            <div className={styles.diaryPage}>
                <div className={styles.leftSection}>
                    <div className={styles.datePicker}>
                        <label htmlFor="diary-date"></label>
                        <input
                            className={styles.datePickerInput}
                            type="date"
                            id="diary-date"
                            value={selectedDate}
                            onChange={handleDateChange}
                        />
                    </div>
                    <div className={styles.entryForm}>
                        <TextField
                            label="Enter product name"
                            variant="standard"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            fullWidth
                            margin="normal"
                            sx={{ width: '240px', marginRight: '20px' }}
                        />
                        <TextField
                            label="Grams"
                            variant="standard"
                            type="number"
                            value={grams}
                            onChange={(e) => setGrams(e.target.value)}
                            fullWidth
                            margin="normal"
                            sx={{ width: '240px', marginRight: '20px' }}
                        />
                        <button
                            className={styles.addButton}
                            type="button"
                            onClick={handleAddEntry}
                        >
                            +
                        </button>
                    </div>
                    <div className={styles.entriesList}>
                        {diaryEntries.length === 0 ? (
                            <p>No entries for this date.</p>
                        ) : (
                            <ul className={styles.diaryFoodList}>
                                {diaryEntries.map((entry, index) => (
                                    <li className={styles.diaryFoods} key={index}>
                                        {entry.product_name} - {entry.grams} grams
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                <div className={styles.vector}></div>
                <div className={styles.rightSection}>
                    <div className={styles.summary}>
                        <div className={styles.summaryHeader}>
                            <h3>Summary for {formatDate(selectedDate)}</h3>
                            <form className={styles.summaryForm}>
                                <div className={styles.summaryItem}>
                                    <label>Left:</label>
                                    <input
                                        className={styles.summaryInput}
                                        type="text"
                                        value={`${leftCalories.toFixed(0)} kcal`}
                                        readOnly
                                    />
                                </div>
                                <div className={styles.summaryItem}>
                                    <label>Consumed:</label>
                                    <input
                                        className={styles.summaryInput}
                                        type="text"
                                        value={`${totalConsumed.toFixed(0)} kcal`}
                                        readOnly
                                    />
                                </div>
                                <div className={styles.summaryItem}>
                                    <label>Daily rate:</label>
                                    <input
                                        className={styles.summaryInput}
                                        type="text"
                                        value={`${dailyRate} kcal`}
                                        readOnly
                                    />
                                </div>
                                <div className={styles.summaryItem}>
                                    <label>n% of normal:</label>
                                    <input
                                        className={styles.summaryInput}
                                        type="text"
                                        value={`${percentOfNormal}%`}
                                        readOnly
                                    />
                                </div>
                            </form>
                        </div>
                        <div className={styles.summaryText}>
                            <h4>Food not recommended:</h4>
                            {foodsNotRecommended.length > 0 ? (
                                <div className={styles.foodsNotRecommended}>
                                    <ul className={styles.foodList}>
                                        {foodsNotRecommended.map((food, index) => (
                                            <li key={index}>{food.title}</li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                <p>No recommendations available.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiaryPage;
