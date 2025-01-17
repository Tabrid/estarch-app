import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, StyleSheet, Image, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import baseUrl from '../services/baseUrl';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const ExtraSection2 = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { catName } = route.params;
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [extraSection, setExtraSection] = useState(null);
    const [typeName, setTypeName] = useState(null);
    const [categoryName, setCategoryName] = useState(null);

    const screenWidth = Dimensions.get('window').width; // Get screen width
    const numColumns = 2; // Set number of columns (2 per row)
    const cardWidth = (screenWidth - 50) / numColumns; // Calculate card width based on screen size

    useEffect(() => {
        setLoading(true);
        fetch(`${baseUrl}/api/extra-section`)
            .then((response) => response.json())
            .then((data) => {
                setExtraSection(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching extra section:", error);
                setLoading(false);
            });
    }, [extraSection?.type2]);

    useEffect(() => {
        setLoading(true);
        if (extraSection?.type2 === 'Category') {
            fetch(`${baseUrl}/api/products/products/category/products/${encodeURIComponent(extraSection?.name2)}`)
                .then((res) => res.json())
                .then((data) => {
                    setProducts(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching products:", error);
                    setLoading(false);
                });
        } else if (extraSection?.type1 === 'Subcategory') {
            fetch(`${baseUrl}/api/products/products/subcategory/home/${encodeURIComponent(extraSection?.name2)}`)
                .then((res) => res.json())
                .then((data) => {
                    setProducts(data.products);
                    setCategoryName(data.subcategory?.category?.name);
                    fetch(`${baseUrl}/api/types/${data.subcategory?.category?.type}`)
                        .then((res) => res.json())
                        .then((typeData) => {
                            setTypeName(typeData.name);
                            setLoading(false);
                        })
                        .catch((error) => {
                            console.error("Error fetching type data:", error);
                            setLoading(false);
                        });
                })
                .catch((error) => {
                    console.error("Error fetching products:", error);
                    setLoading(false);
                });
        } else {
            console.log("Not accepted");
        }
    }, [extraSection?.name1, extraSection?.type1]);

    // Only show the first 6 products
    const displayedProducts = products.slice(0, 4);

    if (loading) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#000" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className='mx-4 mb-16'>
            <Text className='text-center my-4 font-semibold text-[16px]'>{extraSection?.name2}</Text>
            <FlatList
                data={displayedProducts}
                keyExtractor={(item) => item._id}
                numColumns={numColumns}  // Static number of columns (2 items per row)
                columnWrapperStyle={styles.row}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[styles.card, { width: cardWidth }]}  // Dynamically set card width based on screen size
                        onPress={() => router.push(`/product/${item.productName}/${item.SKU}`)}
                    >
                        <Image
                            source={{ uri: `${baseUrl}/${item.images[0]}` }}
                            style={styles.productImage}
                            resizeMode="contain"
                        />
                        {item.regularPrice - item.salePrice > 0 && (
                            <Text style={styles.priceOff}>
                                {Math.floor((item.regularPrice - item.salePrice) / item.regularPrice * 100)}% off
                            </Text>
                        )}
                        <Text style={styles.productName}>
                            {item.productName.length > 21 ? `${item.productName.slice(0, 28)}...` : item.productName}
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
        </SafeAreaView>
    );
};

export default ExtraSection2;

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    row: {
        justifyContent: 'space-between',
        paddingHorizontal: 0,  // Adjust for better spacing between columns
        backgroundColor: '#eee',
        // marginTop:-150,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingBottom: 8,
        margin: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        alignItems: 'center',
        height: 280,
    },
    productImage: {
        width: '100%',
        height: 209,
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
        borderRadius: 6
    },
    strikeThrough: {
        textDecorationLine: 'line-through',
        color: '#999',
        fontSize: 14,
    },
});
