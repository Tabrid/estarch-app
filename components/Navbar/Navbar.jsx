// app/NavBar.js
import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { toggleDrawer } from '../../lib/slices/drawerSlice';

const Navbar = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    return (
        <View style={styles.container}>
            {/* Hamburger Icon */}
            <TouchableOpacity onPress={() => dispatch(toggleDrawer())}>
                <Ionicons name="menu" size={24} color="black" />
            </TouchableOpacity>
            {/* Logo */}
            <View style={styles.logoContainer}>
                <TouchableOpacity onPress={() => router.push('/')}>
                    <Image
                        source={require('../../assets/images/LOGO 1.png')} // Replace with your logo path
                        style={styles.logo}
                    />
                </TouchableOpacity>
            </View>

            {/* User Profile Icon */}
            <TouchableOpacity onPress={() => console.log('Profile pressed')}>
                <Ionicons name="person" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'justify-start',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        
        elevation: 6,
    },
    logoContainer: {
        flex: 1,
        alignItems: 'center',
    },
    logo: {
        width: 100, // Adjust according to your logo size
        height: 40,  // Adjust according to your logo size
        resizeMode: 'contain',
    },
});

export default Navbar;
