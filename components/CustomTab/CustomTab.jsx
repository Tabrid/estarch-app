import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const CustomTab = () => {
    const router = useRouter();
    const [isAdded, setIsAdded] = useState(false);
    const handlePress = () => {
        setIsAdded(true); // Change state on press
    };
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

            <TouchableOpacity style={[styles.navItem, isAdded ? styles.checkoutButton : styles.addToCartButton]} onPress={handlePress}>
                <Text style={styles.addToCartText} className='text-center '>{isAdded ? "Checkout" : "Add To Cart"}</Text>
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
        gap: 20,
        marginLeft: 10,
        marginRight: 16,
        padding: 8,
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4CAF50',
        paddingHorizontal: 40,
    },
    checkoutButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#2ecc71", // Green when added (Checkout)
        paddingHorizontal: 50,
    },
    addToCartText: {
        color: '#fff',
        alignItems: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        paddingVertical: 16,
    },
});

export default CustomTab;
