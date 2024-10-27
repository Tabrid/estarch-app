import React from 'react';
import { View, Text, Button, StatusBar } from 'react-native';
import { decrement, increment, incrementByAmount, reset } from '../../lib/slices/counterSlice';
import { useDispatch, useSelector } from 'react-redux';

const Index = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <View className="flex-1 justify-center items-center bg-gray-100">
    </View>
  );
};

export default Index;
