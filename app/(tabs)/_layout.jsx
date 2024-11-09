import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const TabStructure = () => {
  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarLabel: () => null,
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'black',
          tabBarStyle: styles.tabBar,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color }) => (
              <Ionicons name="home-outline" size={18} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="categories"
          options={{
            tabBarLabel: "Categories",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="category" size={18} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            tabBarLabel: "Cart",
            tabBarIcon: ({ color }) => (
              <Ionicons name="cart-outline" size={18} color={color} />
            ),
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
  tabBar: {
    backgroundColor: '#f8f8f8',  // Set the background color to red
    justifyContent: 'flex-start', 
    paddingLeft: 90, 
    paddingRight: 90,
    paddingBottom: 10, 
    paddingTop: 10, 
  },
});
