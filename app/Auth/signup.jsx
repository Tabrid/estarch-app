import { router } from 'expo-router';
import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, ScrollView, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import baseUrl from '../../components/services/baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function SignUp() {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const handleTogglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !address || !phone || !email || !password) {
            Alert.alert('All fields are required');
            return;
        } else {

        }
        try {
            const response = await fetch(`${baseUrl}/api/auth/register-app`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullName: name,
                    address,
                    mobile: phone,
                    email,
                    password
                }),
                credentials: 'include',
            });
            console.log(response);
            
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            await AsyncStorage.setItem('User', JSON.stringify(data.user));
            router.push(`/home`)
        } catch (err) {
            console.log(err);
        }
    };
    const handleGoBack = () => {
        router.back();
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >

                <ScrollView contentContainerStyle={{  }}
                    showsVerticalScrollIndicator={false}
                >
                    <View className='flex pl-2 p-2 justify-center border-b border-gray-300'>
                        {/* Hamburger Icon */}
                        <TouchableOpacity onPress={() => handleGoBack()}>
                            <Ionicons name="chevron-back" size={24} color="black" />

                        </TouchableOpacity>
                    </View>
                    {/* Profile Details Section */}

                    <View style={{ marginBottom: 12 , marginTop: 20 ,padding: 16, flex: 1, justifyContent: 'center', paddingHorizontal: 30}}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>Profile Details</Text>
                        <TextInput
                            placeholder="Full name"
                            style={{
                                backgroundColor: '#e2e2e2',
                                borderRadius: 8,
                                padding: 10,
                                marginBottom: 16,
                            }}
                            onChangeText={(text) => setName(text)}
                            value={name}
                        />
                        <TextInput
                            placeholder="Address"
                            style={{
                                backgroundColor: '#e2e2e2',
                                borderRadius: 8,
                                padding: 10,
                                marginBottom: 16,
                            }}
                            onChangeText={(text) => setAddress(text)}
                            value={address}
                        />

                    </View>

                    {/* Account Details Section */}
                    <View style={{ marginBottom: 12 , padding: 16, flex: 1, justifyContent: 'center', paddingHorizontal: 30 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>Account Details</Text>
                        <TextInput
                            placeholder="Phone"
                            keyboardType="phone-pad"
                            style={{
                                backgroundColor: '#e2e2e2',
                                borderRadius: 8,
                                padding: 10,
                                marginBottom: 16,
                            }}
                            onChangeText={(text) => setPhone(text)}
                            value={phone}
                        />
                        <TextInput
                            placeholder="Email"
                            keyboardType="email-address"
                            style={{
                                backgroundColor: '#e2e2e2',
                                borderRadius: 8,
                                padding: 10,
                                marginBottom: 16,
                            }}
                            onChangeText={(text) => setEmail(text)}
                            value={email}
                        />
                        {/* Sign Up Button */}
                        <View style={{ position: 'relative' }}>
                            <TextInput
                                placeholder="Password"
                                secureTextEntry={!isPasswordVisible} // Toggle visibility based on state
                                style={{
                                    backgroundColor: '#e2e2e2',
                                    borderRadius: 8,
                                    padding: 10,
                                    paddingRight: 40, // Ensure space for the icon
                                    marginBottom: 8,
                                }}
                                onChangeText={(text) => setPassword(text)}
                                value={password}
                            />
                            {/* Eye Icon for toggling visibility */}
                            <TouchableOpacity
                                style={{
                                    position: 'absolute',
                                    right: 16,
                                    top: '50%',
                                    transform: [{ translateY: -12 }], // Center the icon vertically
                                }}
                                onPress={handleTogglePasswordVisibility}
                            >
                                <Ionicons
                                    name={isPasswordVisible ? 'eye-off' : 'eye'} // Toggle between eye and eye-off icon
                                    size={24}
                                    color="gray"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Sign Up Button */}
                    <TouchableOpacity
                        style={{
                            backgroundColor: 'black',
                            borderRadius: 8,
                            padding: 10,
                            marginHorizontal: 30,
                          
                        }}
                        onPress={handleSubmit}
                    >
                        <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Sign Up</Text>
                    </TouchableOpacity>
                    <Text className="text-center my-8">
                        Already Account Here? <Text className="font-semibold"
                            onPress={() => router.push(`/Auth/login`)}
                        >Login</Text>
                    </Text>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
