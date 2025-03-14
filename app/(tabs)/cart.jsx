import { View, Text, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useState } from 'react';
import { FontAwesome, Feather } from '@expo/vector-icons';
import Navbar2 from '../../components/Navbar/Navbar2.jsx';

const Cart = () => {
  const [cart, setCart] = useState([{ id: 1, name: 'Mens Premium T-Shirt-Anti', price: 599, quantity: 1, size: 'M' }]);

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const updateQuantity = (id, action) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + action) } : item
      )
    );
  };

  const removeItem = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  return (
    <View className='flex-1 bg-white'>
      <Navbar2 />
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} className="p-4 min-h-screen">
        
        {/* Search Bar */}
        <View className="flex-row items-center bg-gray-100 p-3 rounded-lg mb-4">
          <TextInput placeholder="Search For Products" className="flex-1 text-gray-600" />
        </View>

        {/* Cart Header */}
        <View className="flex-row items-center justify-center mb-4">
          <FontAwesome name="shopping-cart" size={24} color="black" />
          <Text className="ml-2 text-lg font-semibold">My Cart</Text>
        </View>

        {/* Cart Items */}
        {cart.length > 0 ? (
          cart.map(item => (
            <View key={item.id} className="bg-gray-100 p-4 rounded-xl shadow-2xl flex-row items-center mb-4">
              <Image
                source={{ uri: 'https://via.placeholder.com/100' }}
                className="w-20 h-20 rounded-lg"
              />
              <View className="flex-1 ml-4">
                <Text className="text-lg font-semibold">{item.name}</Text>
                <Text className="text-gray-600">৳{item.price.toFixed(2)}</Text>
                <Text className="text-gray-600">Size: {item.size}</Text>
                <View className="flex-row items-center mt-2">
                  <TouchableOpacity
                    onPress={() => updateQuantity(item.id, -1)}
                    className="bg-gray-200 px-3 py-1 rounded-lg">
                    <Text className="text-lg">-</Text>
                  </TouchableOpacity>
                  <Text className="mx-4 text-lg">{item.quantity}</Text>
                  <TouchableOpacity
                    onPress={() => updateQuantity(item.id, 1)}
                    className="bg-gray-200 px-3 py-1 rounded-lg">
                    <Text className="text-lg">+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity onPress={() => removeItem(item.id)}>
                <Feather name="trash-2" size={24} color="black" />
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text className="text-center text-gray-500 mt-4">Your cart is empty.</Text>
        )}

        {/* Discount Info */}
        <Text className="text-center text-gray-600 mt-4">5% discount applied for app users.</Text>
      </ScrollView>

      {/* Footer */}
      {cart.length > 0 && (
        <View className="absolute bottom-0 left-0 right-0 bg-black p-4 flex-row justify-between items-center">
          <Text className="text-white text-lg">Total Price - ৳{totalPrice.toFixed(2)}</Text>
          <TouchableOpacity className="bg-white px-4 py-2 rounded-lg">
            <Text className="text-black">Next ➜</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Cart;
