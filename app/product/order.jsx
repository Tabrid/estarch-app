import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Navbar2 from '../../components/Navbar/Navbar2';
import CustomTab2 from '../../components/CustomTab2/CustomTab2';
import { useRouter } from 'expo-router';

const CheckoutPage = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [note, setNote] = useState('');
    const router = useRouter()

    const handleCheckout = () => {
        // Handle checkout logic here, such as validating inputs or sending data to an API
        if (!name || !phone || !address) {
            alert("Name, Phone, and Address are required.");
        } else {
            // Proceed with checkout logic
            console.log("Proceeding with checkout...");
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <Navbar2 />
            <ScrollView style={styles.container}>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Checkout</Text>

                    {/* Name Field */}
                    <Text style={styles.label}>Name</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="Enter your name"
                    />

                    {/* Phone Field */}
                    <Text style={styles.label}>Phone</Text>
                    <TextInput
                        style={styles.input}
                        value={phone}
                        onChangeText={setPhone}
                        placeholder="Enter your phone number"
                        keyboardType="phone-pad"
                    />

                    {/* Email Field (Optional) */}
                    <Text style={styles.label}>Email (Optional)</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Enter your email"
                        keyboardType="email-address"
                    />

                    {/* Address Field */}
                    <Text style={styles.label}>Address</Text>
                    <TextInput
                        style={styles.input}
                        value={address}
                        onChangeText={setAddress}
                        placeholder="Enter your address"
                    />

                    {/* Note Field (Optional) */}
                    <Text style={styles.label}>Note (Optional)</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        value={note}
                        onChangeText={setNote}
                        placeholder="Any additional note?"
                        multiline
                        numberOfLines={4}
                    />
                </View>
            </ScrollView>
            <View className="absolute bottom-16 left-0 right-0 bg-black p-3 flex-row justify-around items-center mx-8 rounded-lg">
                <TouchableOpacity  onPress={() => router.back()}   className=" px-4 py-2 rounded-lg">
                    <Text className="text-white">Back</Text>
                </TouchableOpacity>
                <TouchableOpacity  className="px-4 py-2 rounded-lg">
                    <Text className="text-white">|</Text>
                </TouchableOpacity>
                <TouchableOpacity  className=" px-4 py-2 rounded-lg">
                    <Text className="text-white">Next</Text>
                </TouchableOpacity>
            </View>
            <CustomTab2/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    formContainer: {
        marginTop: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#333',
    },
    input: {
        height: 45,
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 20,
        backgroundColor: '#EEEDEB'
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default CheckoutPage;
