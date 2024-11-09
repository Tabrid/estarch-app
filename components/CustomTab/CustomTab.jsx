import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

const CustomTab = () => {
    return (
        <View className=' bg-[#f8f8f8] flex flex-row items-center justify-between' style={styles.container}>
            <View className='flex flex-row gap-8 ml-2 mr-12'>
                <TouchableOpacity onPress={() => router.push(`/home`)} style={styles.navItem}>
                    <Ionicons name="home-outline" size={18} color={'black'} />
                    <Text style={styles.label}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push(`/categories`)} style={styles.navItem}>
                    <MaterialIcons name="category" size={18} color="black" />
                    <Text style={styles.label}>Categories</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push(`/cart`)} style={styles.navItem}>
                    <Ionicons name="cart-outline" size={18} color={'black'} />
                    <Text style={styles.label}>Cart</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity className='' style={[styles.navItem, styles.addToCartButton]}>
                <Text style={styles.addToCartText}>Add To Cart</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    navItem: {
        alignItems: 'center',
    },
    label: {
        fontSize: 12,
        color: 'black',
        marginTop: 4,
    },
    addToCartButton: {
        backgroundColor: '#4CAF50', // Green color for the button
        paddingHorizontal: 40,
        paddingVertical: 16,
    },
    addToCartText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CustomTab;
