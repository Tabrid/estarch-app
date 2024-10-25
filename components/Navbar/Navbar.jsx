// app/NavBar.js
import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Import the Ionicons library

const NavBar = () => {
    const router = useRouter();

    return (
        <View  style={styles.container}>
            {/* Hamburger Icon */}
            <TouchableOpacity onPress={() => console.log('Menu pressed')}>
                <Ionicons name="menu" size={24} color="black" />
            </TouchableOpacity>

            {/* Logo */}
            <View style={styles.logoContainer}>
                <TouchableOpacity onPress={() =>router.push('/')}>
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
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        elevation: 4,
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

export default NavBar;
