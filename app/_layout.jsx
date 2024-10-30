// app/_layout.jsx
import React from 'react';
import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import store from '../lib/store.js';
import { StatusBar } from 'react-native';
import NavBar from '../components/Navbar/Navbar';
import CustomDrawer from '../components/CustomDrawer/CustomDrawer';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function RootLayout() {
  return (
    <Provider store={store} >
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <NavBar />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
        <CustomDrawer />
      </SafeAreaView>
    </Provider>
  );
}
