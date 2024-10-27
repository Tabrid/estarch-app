// app/_layout.jsx
import React from 'react';
import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import store from '../lib/store.js';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import CustomDrawer from '../components/CustomDrawer/CustomDrawer';
import Navbar from '../components/Navbar/Navbar';

export default function RootLayout() {
  return (
    <Provider store={store} >
      <SafeAreaView style={{flex:1}}>
      <StatusBar barStyle={'light-content'} backgroundColor={'green'} />
      <Navbar/>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
      <CustomDrawer />
      </SafeAreaView>
    </Provider>
  );
}
