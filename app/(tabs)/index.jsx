import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { decrement, increment, incrementByAmount, reset } from '../../lib/slices/counterSlice';
import { useDispatch, useSelector } from 'react-redux';

const index = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.counterText}>Counter: {count}</Text>

      <View style={styles.buttons}>
        <Button title="Increment" onPress={() => dispatch(increment())} />
        <Button title="Decrement" onPress={() => dispatch(decrement())} />
        <Button title="Reset" onPress={() => dispatch(reset())} />
        <Button title="Increment by 5" onPress={() => dispatch(incrementByAmount(5))} />
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  counterText: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttons: {
    width: '80%',
    justifyContent: 'space-around',
    height: 150,
  },
});
