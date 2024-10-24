import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

const TabStructure = () => {
  return (
    <Tabs>
        <Tabs.Screen name='index' options={{tabBarLabel:"Home"}}/>
    </Tabs>
  )
}

export default TabStructure

const styles = StyleSheet.create({})