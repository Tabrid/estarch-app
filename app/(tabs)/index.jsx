import React from 'react';
import { View, Text, Button, StatusBar } from 'react-native';
import { decrement, increment, incrementByAmount, reset } from '../../lib/slices/counterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'expo-router';

const Index = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <View className="flex-1 justify-center items-center bg-gray-100">
      <Text className="text-4xl font-bold mb-5">Counter: {count}</Text>

      <View className="w-4/5 h-36 justify-around">
        <Button title="Increment" onPress={() => dispatch(increment())} />
        <Button title="Decrement" onPress={() => dispatch(decrement())} />
        <Button title="Reset" onPress={() => dispatch(reset())} />
        <Button title="Increment by 5" onPress={() => dispatch(incrementByAmount(5))} />
      </View>
      <Button
        title="Go to New Screen"
        onPress={() => router.push('/newscreen')}
      />
    </View>
  );
};

export default Index;
