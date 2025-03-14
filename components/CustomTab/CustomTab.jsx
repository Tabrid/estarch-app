import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const CustomTab = ({ selectedSize }) => {
    const router = useRouter();
    const [isAdded, setIsAdded] = useState(false);
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');

    const handlePress = () => {
        if (!selectedSize) {
            setMessage('Please select a size');
            setVisible(true);
            return;
        }
        setIsAdded(true);
    };

    const onDismissSnackBar = () => setVisible(false);

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
            <TouchableOpacity
                style={[styles.navItem, isAdded ? styles.checkoutButton : styles.addToCartButton]}
                onPress={isAdded ? () => router.push('/cart') : handlePress} // Conditionally navigate or add to cart
            >
                <Text style={styles.addToCartText} className="text-center">
                    {isAdded ? "Checkout" : "Add To Cart"}
                </Text>
            </TouchableOpacity>


            {/* Snackbar for error message */}
            <Snackbar
                visible={visible}
                onDismiss={onDismissSnackBar}
                duration={Snackbar.DURATION_SHORT}
                style={styles.snackbar}
                action={{
                    label: 'OK',
                    onPress: onDismissSnackBar,
                }}
            >
                {message}
            </Snackbar>
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
        gap: 35,
        marginLeft: 15,
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
    snackbar: {
        backgroundColor: '#000',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: '90%',
        alignSelf: 'center',
        bottom: 10, // Adjust to show it near the top
    },
});

export default CustomTab;
