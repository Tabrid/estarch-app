import React, { useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, Animated, ActivityIndicator, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import baseUrl from '../services/baseUrl';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router, useFocusEffect } from 'expo-router';
import Carousel from '../Carousel/Carousel';

const ExtraSection5 = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [extraSection, setExtraSection] = useState(null);
    const [typeName, setTypeName] = useState(null);
    const [categoryName, setCategoryName] = useState(null);
    const [category, setCategory] = useState(null);

    const screenWidth = Dimensions.get('window').width; // Get screen width
    const numColumns = 3; // Set number of columns (3 per row)
    const cardWidth = (screenWidth - 50) / numColumns; // Calculate card width based on screen size

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Fetch extra section
                const extraSectionRes = await fetch(`${baseUrl}/api/extra-section`);
                const extraSectionData = await extraSectionRes.json();
                setExtraSection(extraSectionData);

                // Fetch products and related data based on extraSection type
                if (extraSectionData?.type5 === 'Category') {
                    const productsRes = await fetch(`${baseUrl}/api/products/products/category/products/home/${encodeURIComponent(extraSectionData?.name5)}`);
                    const productsData = await productsRes.json();
                    setProducts(productsData);
                    // Fetch category details
                    const categoryRes = await fetch(`${baseUrl}/api/categories/find/${extraSectionData?.id5}`);
                    const categoryData = await categoryRes.json();
                    setCategory(categoryData);
                } else if (extraSectionData?.type5 === 'Subcategory') {
                    const subcategoryRes = await fetch(`${baseUrl}/api/products/products/subcategory/home/${encodeURIComponent(extraSectionData?.name5)}`);
                    const subcategoryData = await subcategoryRes.json();
                    setProducts(subcategoryData.products);
                    setCategoryName(subcategoryData.subcategory?.category?.name);

                    const typeRes = await fetch(`${baseUrl}/api/types/${subcategoryData.subcategory?.category?.type}`);
                    const typeData = await typeRes.json();
                    setTypeName(typeData.name);

                    // Fetch Subcategory details
                    const subcategoryResponse = await fetch(`${baseUrl}/api/categories/subcategories/find/${extraSectionData?.id5}`);
                    const subcategoryInfo = await subcategoryResponse.json();
                    setCategory(subcategoryInfo);

                } else {
                    console.log("Not accepted");
                }



            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [extraSection?.id5, extraSection?.name5, extraSection?.type5]);


    // useFocusEffect(
    //     React.useCallback(() => {
    //         setLoading(true);
    //         fetch(`${baseUrl}/api/extra-section`)
    //             .then((response) => response.json())
    //             .then((data) => {
    //                 setExtraSection(data);
    //                 setLoading(false);
    //             })
    //             .catch((error) => {
    //                 console.error("Error fetching extra section:", error);
    //                 setLoading(false);
    //             });
    //     }, [])
    // );

    // useFocusEffect(
    //     React.useCallback(() => {
    //         setLoading(true);
    //         if (extraSection?.type5 === 'Category') {
    //             fetch(`${baseUrl}/api/products/products/category/products/home/${encodeURIComponent(extraSection?.name5)}`)
    //                 .then((res) => res.json())
    //                 .then((data) => {
    //                     setProducts(data);
    //                     setLoading(false);
    //                 })
    //                 .catch((error) => {
    //                     console.error("Error fetching products:", error);
    //                     setLoading(false);
    //                 });

    //         } else if (extraSection?.type5 === 'Subcategory') {
    //             fetch(`${baseUrl}/api/products/products/subcategory/home/${encodeURIComponent(extraSection?.name5)}`)
    //                 .then((res) => res.json())
    //                 .then((data) => {
    //                     setProducts(data.products);
    //                     setCategoryName(data.subcategory?.category?.name);
    //                     fetch(`${baseUrl}/api/types/${data.subcategory?.category?.type}`)
    //                         .then((res) => res.json())
    //                         .then((typeData) => {
    //                             setTypeName(typeData.name);
    //                             setLoading(false);
    //                         })
    //                         .catch((error) => {
    //                             console.error("Error fetching type data:", error);
    //                             setLoading(false);
    //                         });
    //                 })
    //                 .catch((error) => {
    //                     console.error("Error fetching products:", error);
    //                     setLoading(false);
    //                 });

    //         } else {
    //             console.log("Not accepted");
    //         }
    //     }, [])
    // );

    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
    };

    // Only show the first 6 products
    const displayedProducts = products.slice(0, 6);

    const shimmerAnim = useRef(new Animated.Value(0)).current;

    const SkeletonCard = () => (
        <View style={[styles.card, { width: cardWidth }]}>
            <Animated.View
                style={[
                    styles.skeleton,
                    {
                        opacity: shimmerAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0.3, 1],
                        }),
                    },
                ]}
            />
            <View style={styles.skeletonText} />
            <View style={styles.skeletonTextSmall} />
        </View>
    );

    if (loading) {
        return (
            <SafeAreaView style={{ flex: 1, padding: 12 }}>
                <View style={styles.skeletonContainer}>
                    <View style={styles.skeletonImage} />
                    <View style={styles.skeletonRow}>
                        {Array.from({ length: numColumns }).map((_, index) => (
                            <SkeletonCard key={index} />
                        ))}
                    </View>
                </View>
            </SafeAreaView>
        );
    }


    console.log();


    return (
        <View className='mx-4'>
            <Text className='text-center my-4 font-semibold text-[16px]'>{extraSection?.name5}</Text>
            <TouchableOpacity
                onPress={() => {
                    router.push(`/homeAllProduct/${extraSection?.type5}/${products[0]?.selectedType}/${extraSection?.name5}`); // Navigate to a special category     
                }}
            >
                <Image
                    source={{ uri: `${baseUrl}/${category.image}` }}
                    style={styles.coverImage}
                    resizeMode="cover"
                />
            </TouchableOpacity>

            <View className='-mt-12'>
                <FlatList
                    data={displayedProducts}
                    keyExtractor={(item) => item._id}
                    numColumns={numColumns}  // Static number of columns
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
                                {truncateText(item.productName, 21)}
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
            </View>
        </View>
    );
};

export default ExtraSection5;

const styles = StyleSheet.create({
    skeletonContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    skeletonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    skeletonImage: {
        height: 200,
        backgroundColor: '#E0E0E0',
        borderRadius: 8,
        marginBottom: -36,
    },
    skeleton: {
        height: 140,
        backgroundColor: '#E0E0E0',
        borderRadius: 8,
    },
    skeletonText: {
        height: 20,
        backgroundColor: '#E0E0E0',
        borderRadius: 4,
        marginTop: 10,
        width: '80%',
        alignSelf: 'center',
    },
    skeletonTextSmall: {
        height: 15,
        backgroundColor: '#E0E0E0',
        borderRadius: 4,
        marginTop: 5,
        width: '60%',
        alignSelf: 'center',
    },
    row: {
        justifyContent: 'space-between',
        paddingHorizontal: 0,
        backgroundColor: '#0000',

    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingBottom: 0,
        margin: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        alignItems: 'center',
        height: 220,
    },
    productImage: {
        width: '100%',
        height: 139,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    coverImage: {
        width: '100%',
        height: 210,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    productName: {
        fontSize: 12,
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
