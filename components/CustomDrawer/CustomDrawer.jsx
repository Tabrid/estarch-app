import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { closeDrawer } from '../../lib/slices/drawerSlice';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
const { height: screenHeight, width: screenWidth } = Dimensions.get('window');
const CustomDrawer = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.drawer.isOpen);
  const translateX = useSharedValue(-screenWidth); 
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));
  useEffect(() => {
    translateX.value = withTiming(isOpen ? 0 : -screenWidth, { duration: 300 }); 
  }, [isOpen]);
  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          position: 'absolute',
          top: 26,
          left: 0,
          height: screenHeight,
          width: 256,
          backgroundColor: 'white',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
          padding: 20,
        },
      ]}
    >
      <SafeAreaView>
        <TouchableOpacity onPress={() => dispatch(closeDrawer())}>
          <Text className="text-right text-lg font-bold">Close</Text>
        </TouchableOpacity>

        <View className="mt-5 space-y-4">
          <Text className="text-xl font-semibold">Home</Text>
          <Text className="text-xl font-semibold">Profile</Text>
          <Text className="text-xl font-semibold">Settings</Text>
        </View>
      </SafeAreaView>
    </Animated.View>
  );
};

export default CustomDrawer;
