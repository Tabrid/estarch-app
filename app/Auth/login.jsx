import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Navbar3 from '../../components/Navbar/Navbar3';
import baseUrl from '../../components/services/baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Login = () => {
    const [isOTPMode, setIsOTPMode] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState('');
    const handleBackClick = () => {
        setIsOTPMode(false);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if ( !password || !email) {
            Alert.alert('All fields are required');
            return;
        } else {

        }
        try {
            const response = await fetch(`${baseUrl}/api/auth/login-app`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
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
    const handleMobileSubmit = async (e) => {
        e.preventDefault();
        if ( !mobile) {
            Alert.alert('mobile number required');
            return;
        }
        try {
            const response = await fetch(`${baseUrl}/api/auth/login-phone-app`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mobile
                }),
                credentials: 'include',
            });
            console.log(response);
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            setIsOTPMode(true);
        } catch (err) {
            console.log(err);
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        if ( !otp) {
            Alert.alert('otp number required');
            return;
        } 
        try {
            const response = await fetch(`${baseUrl}/api/auth/verify-phone-app`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mobile,otp
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
    return (
        <SafeAreaView className="flex-1">
            <Navbar3 />
            <View className="flex-1 items-center justify-center px-4">
                <Image source={require('../../assets/images/LOGO 1.png')} className="w-40 h-24 " resizeMode="contain" />

                <Text className="text-base font-semibold mb-4">Sign In With A Phone Number</Text>
                {!isOTPMode ? (
                    // Phone Number Input View
                    <>
                        <View className="flex-row items-center bg-gray-200 rounded-lg w-full px-4 py-2 mb-4">
                            <FontAwesome5 name="mobile-alt" size={24} color="black" />
                            <TextInput
                                className="flex-1 ml-3 text-base"
                                placeholder="Phone Number"
                                keyboardType="phone-pad"
                                onChangeText={(text) => setMobile(text)}
                                value={mobile}
                            />
                        </View>
                        <TouchableOpacity
                            onPress={handleMobileSubmit}
                            className="w-full bg-black rounded-lg py-3 mb-8"
                        >
                            <Text className="text-white text-center font-semibold">Login</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                        <View className="flex-row items-center bg-gray-200 rounded-lg w-full px-4 py-3 mb-4">
                            <FontAwesome5 name="key" size={24} color="black" />
                            <TextInput
                                className="flex-1 ml-3 text-base"
                                placeholder="OTP Code"
                                keyboardType="numeric"
                                onChangeText={(text) => setOtp(text)}
                                value={otp}
                            />
                        </View>
                        <TouchableOpacity
                            onPress={handleOtpSubmit}
                            className="w-full bg-black rounded-lg py-3 mb-4"
                        >
                            <Text className="text-white text-center font-semibold">Continue</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleBackClick}
                            className="w-full bg-black rounded-lg py-3 mb-5"
                        >
                            <Text className="text-white text-center font-semibold">Back</Text>
                        </TouchableOpacity>
                    </>
                )}
                <View style={styles.container}>
                    <View style={styles.line} />
                    <Text style={styles.text}>Or</Text>
                    <View style={styles.line} />
                </View>
                <Text className="text-base font-semibold mb-4">Sign In With Email & Password</Text>
                <View className="flex-row items-center bg-gray-200 rounded-lg w-full px-4 py-2 mb-4">
                    <MaterialIcons name="email" size={24} color="black" />
                    <TextInput
                        className="flex-1 ml-3 text-base"
                        placeholder="Email"
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                    />
                </View>
                <View className="flex-row items-center bg-gray-200 rounded-lg w-full px-4 py-2 mb-4">
                    <MaterialIcons name="lock" size={24} color="black" />
                    <TextInput
                        className="flex-1 ml-3 text-base"
                        placeholder="Password"
                        secureTextEntry
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                    />
                </View>
                <TouchableOpacity className="w-full bg-black rounded-lg py-3 mb-8" onPress={handleSubmit}>
                    <Text className="text-white text-center font-semibold">Login</Text>
                </TouchableOpacity>

                <Text className="text-center mb-8">
                    New Here? <Text className="font-semibold"
                        onPress={() => router.push(`/Auth/signup`)}
                    >Create A New One</Text>
                </Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10, // Adjust spacing
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: 'black', // Adjust color if needed
    },
    text: {
        marginHorizontal: 10, // Spacing around "Or"
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Login;
