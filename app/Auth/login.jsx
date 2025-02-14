import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import {router } from 'expo-router';
const Login = () => {
    const [isOTPMode, setIsOTPMode] = useState(false);
    const handleLoginClick = () => {
        setIsOTPMode(true);
    };
    const handleBackClick = () => {
        setIsOTPMode(false);
    };
    return (
        <SafeAreaView className="flex-1 bg-white justify-center items-center px-8">
            <Image source={require('../../assets/images/LOGO 1.png')} className="w-48 h-24 mb-4" resizeMode="contain" />

            <Text className="text-lg font-semibold mb-4">Sign In With A Phone Number</Text>
            {!isOTPMode ? (
                // Phone Number Input View
                <>
                    <View className="flex-row items-center bg-gray-200 rounded-lg w-full px-4 py-3 mb-4">
                        <FontAwesome5 name="mobile-alt" size={24} color="black" />
                        <TextInput
                            className="flex-1 ml-3 text-base"
                            placeholder="Phone Number"
                            keyboardType="phone-pad"
                        />
                    </View>
                    <TouchableOpacity
                        onPress={handleLoginClick}
                        className="w-full bg-black rounded-lg py-3 mb-8"
                    >
                        <Text className="text-white text-center font-semibold">Login</Text>
                    </TouchableOpacity>
                </>
            ) : (
                // OTP Input View
                <>
                    <View className="flex-row items-center bg-gray-200 rounded-lg w-full px-4 py-3 mb-4">
                        <FontAwesome5 name="key" size={24} color="black" />
                        <TextInput
                            className="flex-1 ml-3 text-base"
                            placeholder="OTP Code"
                            keyboardType="numeric"
                        />
                    </View>
                    <TouchableOpacity
                        onPress={() => console.log("Continue clicked")}
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

            <Text className="text-center mb-8">Or</Text>

            <Text className="text-lg font-semibold mb-4">Sign In With Email & Password</Text>
            <View className="flex-row items-center bg-gray-200 rounded-lg w-full px-4 py-3 mb-4">
                <MaterialIcons name="email" size={24} color="black" />
                <TextInput
                    className="flex-1 ml-3 text-base"
                    placeholder="Username or Email"
                />
            </View>

            <View className="flex-row items-center bg-gray-200 rounded-lg w-full px-4 py-3 mb-4">
                <MaterialIcons name="lock" size={24} color="black" />
                <TextInput
                    className="flex-1 ml-3 text-base"
                    placeholder="Password"
                    secureTextEntry
                />
            </View>
            <TouchableOpacity className="w-full bg-black rounded-lg py-3 mb-8">
                <Text className="text-white text-center font-semibold">Login</Text>
            </TouchableOpacity>

            <Text className="text-center mb-8">
                New Here? <Text className="font-semibold"
                onPress={() => router.push(`/Auth/signup`)} 
                >Create A New One</Text>
            </Text>
        </SafeAreaView>
    );
};

export default Login;
