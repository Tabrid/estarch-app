import React from 'react';
import { View, Text, Button, StatusBar } from 'react-native';
import { decrement, increment, incrementByAmount, reset } from '../../../lib/slices/counterSlice';
import { useDispatch, useSelector } from 'react-redux';
import Carousel from '../../../components/Carousel/Carousel'
const Index = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <View className="justify-center items-center bg-[#f0f8ff]">
        <Carousel />
    </View>
  );
};

export default Index;