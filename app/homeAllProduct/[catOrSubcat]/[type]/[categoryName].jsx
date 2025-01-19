import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import baseUrl from '../../../../components/services/baseUrl.js';
import Navbar2 from '../../../../components/Navbar/Navbar2.jsx';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import CustomTab from '../../../../components/CustomTab2/CustomTab2.jsx';

const CategoryProducts = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { categoryName, catOrSubcat } = route.params; // Destructure params
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                // Dynamically construct the URL
                const url =
                    catOrSubcat === 'Category'
                        ? `${baseUrl}/api/products/products/category/products/app/${encodeURIComponent(categoryName)}`
                        : `${baseUrl}/api/products/products/subcategory/${encodeURIComponent(categoryName)}`;

                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Error fetching products: ${response.statusText}`);
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [categoryName, catOrSubcat]);

    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
    };

    if (loading) {
        return (
            <View style={{ flex: 1 }}>
                <Navbar2 />
                <SafeAreaView style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#000" />
                </SafeAreaView>
                <CustomTab />
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <Navbar2 />
            <FlatList
                data={products}
                keyExtractor={(item) => item._id}
                numColumns={2}
                columnWrapperStyle={styles.row}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => router.push(`/product/${item.productName}/${item.SKU}`)}
                    >
                        <Image
                            source={{ uri: `${baseUrl}/${item.images[0]}` }}
                            style={styles.productImage}
                            resizeMode="cover"
                        />
                        {item.regularPrice - item.salePrice > 0 && (
                            <Text style={styles.priceOff}>
                                {Math.floor((item.regularPrice - item.salePrice) / item.regularPrice * 100)}% off
                            </Text>
                        )}
                        <Text style={styles.productName}>
                            {truncateText(item.productName, 28)}
                        </Text>
                        {item.regularPrice - item.salePrice > 0 ? (
                            <Text style={styles.priceText}>
                                ৳{item.salePrice}{" "}
                                <Text style={styles.strikeThrough}>৳{item.regularPrice}</Text>
                            </Text>
                        ) : (
                            <Text style={styles.priceText}>৳{item.salePrice}</Text>
                        )}
                    </TouchableOpacity>
                )}
            />
            <CustomTab />
        </View>
    );
};

export default CategoryProducts;

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    row: {
        justifyContent: 'space-between',
        paddingHorizontal: 8,
        backgroundColor: '#ffffff',
    },
    card: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingBottom: 8,
        margin: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        alignItems: 'center',
        width: 168,
        height: 290,
        maxWidth: 168,
    },
    productImage: {
        width: 168,
        maxWidth: 168,
        height: 210,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    productName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 8,
        paddingLeft: 10,
        paddingRight: 10,
        textAlign: 'center',
    },
    priceText: {
        position: 'absolute',
        bottom: 8,
        fontSize: 14,
        color: '#000',
        fontWeight: '700',
    },
    priceOff: {
        position: 'absolute',
        top: 4,
        right: 4,
        fontSize: 12,
        color: '#fff',
        fontWeight: '400',
        zIndex: 99,
        backgroundColor: '#000',
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 2,
        paddingBottom: 2,
        borderRadius: 6,
    },
    strikeThrough: {
        textDecorationLine: 'line-through',
        color: '#999',
        fontSize: 14,
    },
});
