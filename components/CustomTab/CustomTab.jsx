import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const CustomTab = () => {
    const router = useRouter(); 

    return (
        <View style={styles.container}>
            <View style={styles.navItems}>
                <TouchableOpacity onPress={() => router.push('/home')} style={styles.navItem}>
                    <Ionicons name="home-outline" size={18} color="black" />
                    <Text style={styles.label}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push('/categories')} style={styles.navItem}>
                    <MaterialIcons name="category" size={18} color="black" />
                    <Text style={styles.label}>Categories</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push('/cart')} style={styles.navItem}>
                    <Ionicons name="cart-outline" size={18} color="black" />
                    <Text style={styles.label}>Cart</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={[styles.navItem, styles.addToCartButton]}>
                <Text style={styles.addToCartText}>Add To Cart</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f8f8f8',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        
    },
    navItems: {
        flexDirection: 'row',
        gap: 16,
        marginLeft: 8,
        marginRight: 16,
        padding: 14,
    },
    navItem: {
        alignItems: 'center',
    },
    label: {
        fontSize: 12,
        color: 'black',
        marginTop: 4,
    },
    addToCartButton: {
        backgroundColor: '#4CAF50',
        paddingHorizontal: 40,
    },
    addToCartText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        height: 64,
    },
});

export default CustomTab;
