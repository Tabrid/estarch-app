import React, { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { fetchCartFromStorage } from '@/lib/slices/cartSlice.js';
const StartPage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCartFromStorage());
    }, [dispatch]);
    useEffect(() => {
        const getData = async () => {
            try {
                const value = await AsyncStorage.getItem('User');
                if (value) {
                    setUser(JSON.parse(value));
                }
            } catch (e) {
                console.error('Error reading value from AsyncStorage:', e);
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, []);

    if (loading) return null; // Avoid redirection until AsyncStorage is checked

    return <Redirect href={user ? '/home' : '/Auth/login'} />;
};

export default StartPage;
