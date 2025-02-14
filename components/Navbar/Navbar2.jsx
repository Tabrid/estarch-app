// app/NavBar.js
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { toggleDrawer } from '../../lib/slices/drawerSlice';
import { useNavigation, useRoute } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Navbar2 = () => {
    const router = useRouter();
    const [user, setUser] = useState(null); // Start with null to differentiate between loading and no user

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('User');
            if (value) {
                setUser(JSON.parse(value)); // Parse the JSON string to an object
            } else {
                setUser(null); // Set explicitly to null if no user data
            }
        } catch (e) {
            console.error('Error reading value from AsyncStorage:', e);
        }
    };

    useEffect(() => {
        getData();
    }, []);
    const handleGoBack = () => {
        router.back();
    };
    return (
        <View style={styles.container}>
            {/* Hamburger Icon */}
            <TouchableOpacity className='flex ml-2' onPress={() => handleGoBack()}>
            <AntDesign name="left" size={24} color="black" />

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
            <Text className='pr-2'>Hi,{user?.fullName}</Text>

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
        paddingTop: 0,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 5,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 0,
        borderBottomWidth: 3,       
        borderColor: "#88888825"
    },
    logoContainer: {
        flex: 1,
        alignItems: 'center',
    },
    logo: {
        width: 110,
        height: 40,  
        resizeMode: 'contain',
        marginRight: 120,
        marginBottom:2
    },
});

export default Navbar2;
