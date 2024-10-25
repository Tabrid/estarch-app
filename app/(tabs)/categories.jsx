import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import baseUrl from '../../components/services/baseUrl';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${baseUrl}/api/categories/categories`);

        // Check if the response is ok (status in the range 200-299)
        if (!response.ok) {
          throw new Error(`Error fetching categories: ${response.statusText}`);
        }

        const data = await response.json();

        // Log the response data
        console.log(data);

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

  if (loading) {
    return (
      <SafeAreaView>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      {categories.length === 0 ? (
        <Text>No categories available</Text>
      ) : (
        <FlatList
          data={categories}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View >
              <Text className='text-3xl text-rose-600'>{item.name} </Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default Categories;

const styles = StyleSheet.create({

});
