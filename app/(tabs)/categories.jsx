import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import baseUrl from '../../components/services/baseUrl';

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
    <TouchableOpacity style={styles.categoryItem}>
      <Image
        source={{ uri: `${baseUrl}/${item.image}` }}
        style={styles.image}
        resizeMode="cover"
        height={100}
        
      />
      <View className='absolute top-1/2 left-1/2 translate-x-1/2 translate-y-1/2' style={styles.overlay}>
        <Text style={styles.categoryName}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
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
          numColumns={2} // Two items per row
          columnWrapperStyle={styles.row} // Optional: spacing between items
        />
      )}
    </SafeAreaView>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  categoryName: {
    color: '#ffffff', // White text color for readability on black background
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
  noCategoriesText: {
    color: '#ffffff', // White text color for "No categories" message
    textAlign: 'center',
  },
});
