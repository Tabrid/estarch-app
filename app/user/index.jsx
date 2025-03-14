import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { styled } from 'nativewind';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
import Navbar2 from '../../components/Navbar/Navbar2';
import CustomTab2 from '../../components/CustomTab2/CustomTab2';
import AsyncStorage from '@react-native-async-storage/async-storage';
const User = () => {
  const navigation = useNavigation();
  const [user] = useState({
    name: 'Riyadh',
    phone: '8801786563606',
    email: '01786563606@nowhere.xyz',
    registeredAgo: '4 months ago',
  });
  const getRandomColor = () => {
    const colors = [
      "bg-red-500",
      "bg-green-500",
      "bg-blue-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-teal-500",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  const initials = user.name ? user.name.substring(0, 2).toUpperCase() : "??";
  const bgColor = getRandomColor();
  const handleLogout = async () => {
    await AsyncStorage.removeItem('User');
    router.replace('/Auth/login');
  }
  return (
    <View style={styles.container}>
      <Navbar2 />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <StyledView className="flex-1 bg-white px-4 py-6">
          {/* Profile Header */}
          <StyledView className="flex-row items-center  gap-5 mb-5">
            <StyledView className={`w-20 h-20 ${bgColor} rounded-full flex items-center justify-center`}>
              <StyledText className="text-white text-3xl font-bold">{initials}</StyledText>
            </StyledView>
            <StyledView>
              <StyledText className="text-xl font-semibold mt-2">{user.name}</StyledText>
              <StyledText className="text-gray-500">Registered {user.registeredAgo}</StyledText>
            </StyledView>
          </StyledView>

          {/* Profile Details */}
          <StyledView className="bg-gray-200 p-3 rounded-lg flex-row items-center mb-3 gap-1">
            <Ionicons name="call" size={20} color="black" className="mr-2" />
            <StyledText className="text-black">{user.phone}</StyledText>
          </StyledView>

          <StyledView className="bg-gray-200 p-3 rounded-lg flex-row items-center mb-6 gap-1">
            <MaterialIcons name="email" size={20} color="black" className="mr-2" />
            <StyledText className="text-black">{user.email}</StyledText>
          </StyledView>

          {/* Options */}
          <StyledTouchableOpacity className="bg-gray-200 p-3 rounded-lg flex-row items-center mb-3 gap-1" onPress={() => navigation.navigate('UpdateProfile')}>
            <Ionicons name="person" size={20} color="black" className="mr-2" />
            <StyledText className="text-black">Update Profile</StyledText>
          </StyledTouchableOpacity>
          <StyledTouchableOpacity className="bg-gray-200 p-3 rounded-lg flex-row items-center mb-3 gap-1" onPress={() => navigation.navigate('OrderHistory')}>
            <Ionicons name="list" size={20} color="black" className="mr-2" />
            <StyledText className="text-black">Order History</StyledText>
          </StyledTouchableOpacity>

          <StyledTouchableOpacity className="bg-gray-200 p-3 rounded-lg flex-row items-center mb-6 gap-1" onPress={() => navigation.navigate('DataDeletion')}>
            <Ionicons name="cut" size={20} color="black" className="mr-2" />
            <StyledText className="text-black">Data Deletion</StyledText>
          </StyledTouchableOpacity>

          {/* Logout Button */}
          <StyledTouchableOpacity className="bg-black p-3 rounded-lg flex-row items-center justify-center" onPress={handleLogout}>
            <Ionicons name="power" size={20} color="white" className="mr-2" />
            <StyledText className="text-white font-semibold">Logout</StyledText>
          </StyledTouchableOpacity>
        </StyledView>
      </ScrollView>
      <CustomTab2 style={styles.customTab} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  customTab: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default User;
