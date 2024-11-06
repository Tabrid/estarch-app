import { StyleSheet, useColorScheme, StatusBar,View } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomDrawer from '../../components/CustomDrawer/CustomDrawer';
// import { StatusBar } from 'expo-status-bar'; // Import from expo-status-bar

const TabStructure = () => {
  return (
    <View style={styles.container}>
      {/* Manage status bar appearance */}
      <Tabs
        className='flex'
        screenOptions={{
          headerShown: false, // Hide the header
          tabBarLabel: () => null, // Hide the tab labels
          tabBarActiveTintColor: 'orange',
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
    </View>
  );
};

export default TabStructure;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
