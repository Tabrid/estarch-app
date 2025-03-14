// app/NavBar.js
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
const Navbar3 = () => {
    const router = useRouter();
    const handleGoBack = () => {
        router.push('/home');
    };
    return (
        <View  className='flex pl-2 pb-2 mt-[-15px] justify-center border-b border-gray-300'>
            {/* Hamburger Icon */}
            <TouchableOpacity onPress={() => handleGoBack()}>
                <Ionicons name="chevron-back" size={24} color="black" />

            </TouchableOpacity>
        </View>
    );
};

export default Navbar3;
