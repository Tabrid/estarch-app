// app/cart.js
import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

const cartData = [
  { id: '1', name: 'Laptop', price: 800 },
  { id: '2', name: 'T-Shirt', price: 20 },
  { id: '3', name: 'Novel', price: 15 },
];

const Cart = () => {
  const totalAmount = cartData.reduce((total, item) => total + item.price, 0);

  return (
    <View style={styles.container}>

      <FlatList
        data={cartData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Text style={styles.cartItemName}>{item.name}</Text>
            <Text style={styles.cartItemPrice}>${item.price.toFixed(2)}</Text>
          </View>
        )}
      />
      <View >
        <Text >Total: ${totalAmount.toFixed(2)}</Text>
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  cartItemName: {
    fontSize: 18,
  },
  cartItemPrice: {
    fontSize: 18,
  },
  totalContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
