// app/_layout.jsx
import React from 'react';
import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import store from '../lib/store.js';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar, StyleSheet, View } from 'react-native';
import CustomDrawer from '../components/CustomDrawer/CustomDrawer.jsx';
import Navbar from '../components/Navbar/Navbar.jsx';

export default function RootLayout() {
  return (
    <Provider store={store}>
          {/* <Navbar /> */}
        <SafeAreaView style={styles.safeArea}>
          {/* <Navbar /> */}
          <StatusBar barStyle="dark-content" backgroundColor="white" />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
          </Stack>
          <CustomDrawer />
        </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
  },
});
