import { StyleSheet } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavBar from '../../components/Navbar/Navbar';

const TabStructure = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
        <NavBar />
      <Tabs
        screenOptions={{
          headerShown: false, // Hide the header
          tabBarLabel: () => null, // Hide the tab labels
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',

        }}>
        <Tabs.Screen
          name="index"
          options={{
            tabBarLabel: "Home",
            tabBarIcon: () => <Ionicons name="home-outline" size={24} color="black" />
          }}
        />
        <Tabs.Screen
          name="categories"
          options={{
            tabBarLabel: "Categories",
            tabBarIcon: () => <Ionicons name="grid-outline" size={24} color="black" />
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            tabBarLabel: "Cart",
            tabBarIcon: () => <Ionicons name="cart-outline" size={24} color="black" />
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
};

export default TabStructure;

const styles = StyleSheet.create({});
