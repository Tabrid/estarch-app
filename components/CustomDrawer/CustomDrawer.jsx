import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, Text, TouchableOpacity, SafeAreaView, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { closeDrawer } from '../../lib/slices/drawerSlice';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import baseUrl from '../services/baseUrl';
const { height: screenHeight, width: screenWidth } = Dimensions.get('window');
const CustomDrawer = () => {
  const [categories, setCategories] = useState({});
  const [openTypes, setOpenTypes] = useState([]);
  const [openCategories, setOpenCategories] = useState([]);
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.drawer.isOpen);
  const translateX = useSharedValue(-screenWidth);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/categories/categories`);
        const groupedCategories = response.data.reduce((acc, category) => {
          const typeName = category.type.name;

          if (!acc[typeName]) {
            acc[typeName] = [];
          }

          acc[typeName].push(category);
          return acc;
        }, {});

        setCategories(groupedCategories);
        // setOpenTypes(Object.keys(groupedCategories));

      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleTypeToggle = (typeName) => {
    setOpenTypes(prevTypes =>
      prevTypes.includes(typeName) ? prevTypes.filter(type => type !== typeName) : [...prevTypes, typeName]
    );
  };

  const handleCategoryToggle = (categoryId) => {
    setOpenCategories(prevCategories =>
      prevCategories.includes(categoryId) ? prevCategories.filter(id => id !== categoryId) : [...prevCategories, categoryId]
    );
  };

  useEffect(() => {
    translateX.value = withTiming(isOpen ? 0 : -screenWidth, { duration: 300 });
  }, [isOpen]);
  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          position: 'absolute',
          top: 0,
          left: 0,
          height: screenHeight,
          width: 256,
          backgroundColor: 'white',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
          padding: 20,
        },
      ]}
    >
      <SafeAreaView>
        <TouchableOpacity onPress={() => dispatch(closeDrawer())}>
          <Text className="text-right text-lg font-bold">Close</Text>
        </TouchableOpacity>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}>
          {Object.keys(categories).map((typeName) => (
            <View key={typeName} style={styles.categoryContainer}>
              {/* Main Category Type */}
              <TouchableOpacity
                onPress={() => handleTypeToggle(typeName)}
                style={styles.categoryType}
              >
                <Text style={styles.categoryText}>{typeName.toUpperCase()}</Text>
                <Text style={[styles.icon, openTypes.includes(typeName) && styles.iconOpen]}>
                  {openTypes.includes(typeName) ? '-' : '+'}
                </Text>
              </TouchableOpacity>

              {/* Categories under the selected type */}
              {openTypes.includes(typeName) && (
                <View style={styles.subCategoryContainer}>
                  {categories[typeName].map((category) => (
                    <View key={category._id}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('CategoryScreen', { typeName, category: category.name })
                        }
                        style={styles.subCategory}
                      >
                        <Text style={styles.subCategoryText}>{category.name}</Text>
                        {category.subcategories.length > 0 && (
                          <TouchableOpacity onPress={() => handleCategoryToggle(category._id)}>
                            <Text style={[styles.icon, openCategories.includes(category._id) && styles.iconOpen]}>
                              {openCategories.includes(category._id) ? '-' : '+'}
                            </Text>
                          </TouchableOpacity>
                        )}
                      </TouchableOpacity>

                      {/* Subcategories under the selected category */}
                      {openCategories.includes(category._id) && category.subcategories && (
                        <View style={styles.subCategoryList}>
                          {category.subcategories.map((subcategory) => (
                            <TouchableOpacity
                              key={subcategory._id}
                              onPress={() =>
                                navigation.navigate('SubcategoryScreen', {
                                  typeName,
                                  category: category.name,
                                  subcategory: subcategory.name,
                                })
                              }
                            >
                              <Text style={styles.subCategoryItemText}>{subcategory.name}</Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      )}
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  categoryContainer: {
    marginBottom: 16,
  },
  categoryType: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryText: {
    fontSize: 20,
    color: '#3d3d3d',
    fontWeight: 'bold',
  },
  icon: {
    fontSize: 24,
    transitionProperty: 'transform',
    transitionDuration: '300ms',
  },
  iconOpen: {
    transform: [{ rotate: '180deg' }],
  },
  subCategoryContainer: {
    marginLeft: 12,
  },
  subCategory: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subCategoryText: {
    fontSize: 18,
    color: '#3d3d3d',
  },
  subCategoryList: {
    marginLeft: 12,
  },
  subCategoryItemText: {
    fontSize: 17,
    color: '#3d3d3d',
    fontStyle: 'italic',
    opacity: 0.8,
  },
});

export default CustomDrawer;
