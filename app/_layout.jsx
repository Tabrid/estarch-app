import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { Provider, useDispatch } from 'react-redux';
import store from '../lib/store.js';
import { SafeAreaView } from 'react-native-safe-area-context';
import {  StatusBar, StyleSheet } from 'react-native';
import CustomDrawer from '../components/CustomDrawer/CustomDrawer.jsx';
import Animated, { Easing, useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import Alert from '../components/Alert/Alert.jsx';

export default function RootLayout() {
  const scale = useSharedValue(0.85); // Start at 85% zoom
  
  // Apply the shared value to transform the view
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  useEffect(() => {
    scale.value = withTiming(1, {
      duration: 500, // Animation duration
      easing: Easing.out(Easing.exp),
    });
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <Animated.View style={[styles.animatedView, animatedStyle]}>
          
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
          </Stack>
          <CustomDrawer />
          <Alert/>
        </Animated.View>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000",
  },
  animatedView: {
    flex: 1,
  },
});
