import React from 'react';
import { View, Text, Button, StatusBar, TouchableOpacity } from 'react-native';
import Carousel from '../../components/Carousel/Carousel'
import { router } from 'expo-router';
const Index = () => {
  return (
    <View className="flex-1 justify-center items-center bg-gray-100">
        <Carousel />
        <TouchableOpacity onPress={()=> router.push('/screen/product')}>
          <Text>product</Text>
        </TouchableOpacity>
    </View>
  );
};

export default Index;