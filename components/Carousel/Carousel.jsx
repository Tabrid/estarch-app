import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Text, FlatList, Dimensions, SafeAreaView } from 'react-native';
import baseUrl from '../services/baseUrl';
import { router } from 'expo-router';
import Navbar from '../Navbar/Navbar';

const { width: screenWidth } = Dimensions.get('window');

const Carousel = () => {
  const [carouselItems, setCarouselItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsLength = carouselItems.length;

  useEffect(() => {
    const fetchCarouselItems = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/carosul`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCarouselItems(data);
      } catch (error) {
        console.error("Error fetching carousel items:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCarouselItems();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (flatListRef.current && itemsLength) {
        const nextIndex = (currentIndex + 1) % itemsLength; // Calculate the next index
        flatListRef.current.scrollToIndex({ index: nextIndex, animated: true }); // Scroll to the next item
        setCurrentIndex(nextIndex); // Update current index
      }
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(timer); // Cleanup on unmount
  }, [currentIndex, itemsLength]);

  const renderItem = ({ item }) => {
    if (!item || !item.images || item.images.length === 0) return null;

    return (
      <SafeAreaView>
        <TouchableOpacity onPress={() => router.push(`${item.link}`)}>
          <View style={styles.carouselItem}>
            <Image
              source={{ uri: `${baseUrl}/${item.images[0]}` }}
              style={styles.carouselImage}
              resizeMode="cover"
            />
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!carouselItems.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text>No items available</Text>
      </View>
    );
  }

  return (
    <FlatList
      ref={flatListRef}
      data={carouselItems}
      renderItem={renderItem}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onScrollToIndexFailed={() => { }}
      keyExtractor={(item) => item._id}
      style={styles.carousel}
      extraData={currentIndex} // Re-render when currentIndex changes
    />
  );
};

export default Carousel;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carousel: {
    width: '100%',
  },

  carouselItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    width: screenWidth,
    height: 140,
    paddingHorizontal:12

  },
  carouselImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8
  },
});
