import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Dimensions, FlatList, Animated, ActivityIndicator } from 'react-native';
import CustomTab from '../../../components/CustomTab/CustomTab';
import Navbar2 from '../../../components/Navbar/Navbar2';
import axios from 'axios';
import baseUrl from '../../../components/services/baseUrl';
import { useRoute } from '@react-navigation/native';
import HTMLView from 'react-native-htmlview';
import { SafeAreaView } from 'react-native-safe-area-context';
const { width: screenWidth } = Dimensions.get('window');

const ProductDetails = () => {
  const route = useRoute();
  const { productName, productSku } = route.params;
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);  // Track loading state
  const [selectedSize, setSelectedSize] = useState(null); // Add selectedSize state

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/products/products/product-details/${productName}/${productSku}`);
        setProduct(response.data);
        setLoading(false);  
      } catch (error) {
        console.error('Error fetching product details:', error);
        setLoading(false);  
      }
    };

    fetchProduct();
  }, [productName, productSku]);

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.floor(contentOffsetX / screenWidth); // Calculate the index of the image currently in view
    setActiveIndex(currentIndex);
  };

  // Define handleSizeSelect function to update selected size
  const handleSizeSelect = (size) => {
    setSelectedSize(size); // Update selectedSize state with the chosen size
  };

  const renderImageItem = ({ item }) => {
    const imageUrl = `${baseUrl}/${item}`;
    return (
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageUrl || 'https://via.placeholder.com/300x300.png' }} 
          style={styles.productImage}
        />
      </View>
    );
  };

  if (loading) {
    return (
      <View style={{ flex: 1 }}>
        <Navbar2 />
        <SafeAreaView style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#000" />
        </SafeAreaView>
      </View>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <Navbar2 />
      <ScrollView style={styles.container}>

        {/* Image Slider */}
        <FlatList
          data={product?.images}
          renderItem={renderImageItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          onScroll={handleScroll} // Track scrolling
          scrollEventThrottle={16} // Adjust frequency of scroll events (16ms for smooth scrolling)
        />

        {/* Pagination Dots */}
        <View style={styles.paginationContainer}>
          {product?.images?.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                index === activeIndex && styles.activeDot, // Highlight the active dot
              ]}
            />
          ))}
        </View>

        {/* Product Details */}
        <View className='space-y-2'>
          <Text className='text-center font-semibold text-sm'>{product?.productName}</Text>
          <Text className='text-center  font-semibold text-sm'>৳ {product?.salePrice}.00</Text>
          <Text className='text-center  font-semibold text-lg'>Select Size</Text>
          {/* Size selection */}
          <View className='flex flex-row justify-center gap-2'>
            {product?.selectedSizes.map((size) => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.sizeButton,
                  selectedSize === size && styles.selectedSizeButton, // Apply selected style if size is selected
                ]}
                onPress={() => handleSizeSelect(size)} // Handle size selection
              >
                <Text style={styles.sizeButtonText}>{size}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.descriptionContainer}>
          <View style={styles.horizontalLine} />
          <Text style={styles.descriptionText}>Descriptions:</Text>
          <View style={styles.horizontalLine} />
        </View>

        <HTMLView style={{ paddingHorizontal: 24 }} value={product?.content || '<p>No content available.</p>'} />

      </ScrollView>
      <CustomTab />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  productImage: {
    width: '100%',
    height: 500,
    resizeMode: 'cover',
  },
  imageContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    width: screenWidth,
    height: 500,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#bbb', // Inactive dot color
    margin: 5,
  },
  activeDot: {
    backgroundColor: '#4CAF50', // Active dot color
  },
  productTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  quantityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  quantityButton: {
    fontSize: 24,
    width: 40,
    textAlign: 'center',
    paddingVertical: 5,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 20,
  },
  descriptionContainer: {
    paddingHorizontal: 24, // Equivalent to 'px-6' in Tailwind
  },
  horizontalLine: {
    height: 1,
    backgroundColor: '#000', // Or any color you prefer for the line
    marginVertical: 8,
  },
  descriptionText: {
    paddingVertical: 8, // Equivalent to 'py-2' in Tailwind
    fontSize: 18, // Equivalent to 'text-lg' in Tailwind
  },
  sizeContainer: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  sizeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sizeButton: {
    backgroundColor: '#eee',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  selectedSizeButton: {
    backgroundColor: '#4CAF50',
  },
  sizeButtonText: {
    fontSize: 16,
    color: '#333',
  },
});
export default ProductDetails;
