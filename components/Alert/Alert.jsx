import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { hideAlert } from '@/lib/slices/alertSlice';
import { styled } from 'nativewind';
const StyledTouchableOpacity = styled(TouchableOpacity);
const Alert = () => {
    const dispatch = useDispatch();
    const { visible, message } = useSelector((state) => state.alert);
    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => {
                dispatch(hideAlert()); // Hide alert after 2 seconds
            }, 2000);

            return () => clearTimeout(timer); // Cleanup timer if component unmounts
        }
    }, [visible, dispatch]);

    if (!visible) return null;


    return (
        <StyledTouchableOpacity className="absolute top-10 left-5 right-5 bg-gray-900 rounded-lg p-4 flex-row items-center justify-between px-5" onPress={() => dispatch(hideAlert())} >
            <Text className="text-white ">{message}</Text>
            <View className='bg-white rounded-full '>
                <Ionicons name="alert" size={20} color="black" className="mr-2" />
            </View>
        </StyledTouchableOpacity>
    );
};

export default Alert;
