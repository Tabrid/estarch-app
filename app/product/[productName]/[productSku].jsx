import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Dimensions, FlatList, ActivityIndicator } from 'react-native';
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
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setErrorMessage(null); // Clear error when size is selected
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setErrorMessage('Please select a size before adding to cart.');
      return;
    }
    
    // Clear error message if size is selected
    setErrorMessage(null);

    // Implement your add-to-cart logic here
    console.log(`Added ${product.productName} (Size: ${selectedSize}) to cart.`);
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
          onMomentumScrollEnd={(event) => {
            const newIndex = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
            setActiveIndex(newIndex);
          }}
          scrollEventThrottle={16}
        />

        {/* Pagination Dots */}
        <View style={styles.paginationContainer}>
          {product?.images?.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                index === activeIndex && styles.activeDot,
              ]}
            />
          ))}
        </View>

        {/* Product Details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.productTitle}>{product?.productName}</Text>
          <Text style={styles.productPrice}>৳ {product?.salePrice}.00</Text>

          {/* Size Selection */}
          <Text style={styles.sizeTitle}>Select Size</Text>
          <View style={styles.sizeContainer}>
            {product?.selectedSizes.map((size) => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.sizeButton,
                  selectedSize === size && styles.selectedSizeButton,
                ]}
                onPress={() => handleSizeSelect(size)}
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
      <CustomTab selectedSize={selectedSize} />
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
    backgroundColor: '#bbb',
    margin: 5,
  },
  activeDot: {
    backgroundColor: '#4CAF50',
  },
  detailsContainer: {
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    marginVertical: 5,
  },
  sizeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  sizeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginTop: 10,
  },
  sizeButton: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    minWidth: 50,
  },
  selectedSizeButton: {
    backgroundColor: '#4CAF50',
  },
  sizeButtonText: {
    fontSize: 16,
    color: '#333',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 14,
  },
  descriptionContainer: {
    paddingHorizontal: 24,
  },
  horizontalLine: {
    height: 1,
    backgroundColor: '#000',
    marginVertical: 8,
  },
  descriptionText: {
    paddingVertical: 8,
    fontSize: 18,
  },
});

export default ProductDetails;
