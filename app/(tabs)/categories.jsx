import React, { useEffect, useState } from 'react';
import { StyleSheet, ImageBackground, Text, View, FlatList, SafeAreaView, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import baseUrl from '../../components/services/baseUrl';
import { Link, router } from 'expo-router';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${baseUrl}/api/categories/categories`);
        if (!response.ok) {
          throw new Error(`Error fetching categories: ${response.statusText}`);
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          const activeCategories = data.filter(category => category.active);
          setCategories(activeCategories);
        } else {
          console.error("Unexpected data format:", data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);
  
  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity  onPress={()=> router.push(`${item?.type?.name}/${item?.name}`)} style={styles.categoryItem}>
      <ImageBackground
        source={{ uri: `${baseUrl}/${item.image}` }}
        style={styles.imageBackground} // Background image styling
        resizeMode="cover"
        className='h-[110px]'
      >
        <View style={styles.overlayMain} />
        <View style={styles.overlay} className='mx-auto text-center mt-[65]'>
          <Text className='text-center' style={styles.categoryName}>{item.name}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>

  );

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {categories.length === 0 ? (
        <Text style={styles.noCategoriesText}>No categories available</Text>
      ) : (
        <FlatList
          data={categories}
          keyExtractor={(item) => item._id}
          renderItem={renderCategoryItem}
          numColumns={2}
          columnWrapperStyle={styles.row}
        />
      )}
    </SafeAreaView>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:10
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    justifyContent: 'space-between',
  },
  categoryItem: {
    flex: 1,
    margin: 5,
    backgroundColor: '#333333',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 10,
  },
  categoryName: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  overlay: {
    borderRadius: 8,
    borderWidth: 2,        // Adds a 2px border
    borderColor: "white",  // Sets the border color to white
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: Adds a translucent black background for contrast
  },

  overlayMain: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Semi-transparent overlay
    borderRadius: 8,
  },
  noCategoriesText: {
    color: '#ffffff',
    textAlign: 'center',
  },
});
