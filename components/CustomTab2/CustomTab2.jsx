import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

const CustomTab = () => {
    return (
        <View className=' bg-[#f8f8f8] flex flex-row items-center justify-between' style={styles.container}>
            <View className='flex flex-row gap-8 ml-[18%] mb-2'>
                <TouchableOpacity onPress={() => router.push(`/home`)} style={styles.navItem} className='pt-4'>
                    <Ionicons  name="home-outline" size={18} color={'black'} />
                    <Text  style={styles.label}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push(`/categories`)} style={styles.navItem} className='pt-4'>
                    <MaterialIcons name="category" size={18} color="black" />
                    <Text style={styles.label}>Categories</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push(`/cart`)} style={styles.navItem} className='pt-4'>
                    <Ionicons name="cart-outline" size={18} color={'black'} />
                    <Text style={styles.label}>Cart</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    navItem: {
        alignItems: 'center',
        justifyContent:'center',
    },
    label: {
        fontSize: 10,
        color: 'black',
        marginTop: 0,
    },
});

export default CustomTab;
