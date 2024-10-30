import { StyleSheet } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
const TabStructure = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarLabel: () => null,
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            height: 50, 
            paddingHorizontal: 5, 
            paddingVertical: 0,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
              <Ionicons name="home-outline" size={24} color={color} />
            ),
            tabBarItemStyle: {
              marginHorizontal: -15,
            },
          }}
        />
        <Tabs.Screen
          name="categories"
          options={{
            tabBarLabel: 'Categories',
            tabBarIcon: ({ color }) => (
              <Ionicons name="grid-outline" size={24} color={color} />
            ),
            tabBarItemStyle: {
              marginHorizontal: -15,
            },
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            tabBarLabel: 'Cart',
            tabBarIcon: ({ color }) => (
              <Ionicons name="cart-outline" size={24} color={color} />
            ),
            tabBarItemStyle: {
              marginHorizontal: -15,
            },
          }}
        />
      </Tabs>  
    </SafeAreaView>
  );
};

export default TabStructure;

const styles = StyleSheet.create({});
