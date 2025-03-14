import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import baseUrl from '../services/baseUrl';
import { router } from 'expo-router';

const CategoryHomeCard = () => {
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${baseUrl}/api/categories/categories`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const data = await response.json();
                setCategory(data);
            } catch (error) {
                console.error('Error fetching categories:', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const demoData = category.slice(0, 5);

    const handleViewMore = () => {
        console.log('View More Clicked');
    };

    const windowSymbol = '\u229E'; // Unicode for Windows-style "View More" symbol

    // Add the "View More" card as the last item in the list
    const dataWithViewMore = [...demoData, { _id: 'view-more', name: 'View More', image: null }];

    const renderCard = ({ item }) => {
        if (item._id === 'view-more') {
            return (
                <TouchableOpacity
                    style={[styles.card, styles.viewMoreCard]}
                    onPress={() => { router.push(`/categories`) }}
                >
                    <Text style={styles.viewMoreText}>{windowSymbol} {item.name}</Text>
                </TouchableOpacity>
            );
        }

        return (
            <TouchableOpacity
                onPress={() => router.push(`/homeAllProduct/Category/${item?.type?.name}/${item?.name}`)}
                style={styles.card}>
                <View style={styles.cardImageContainer}>
                    <Image
                        source={{ uri: `${baseUrl}/${item.image}` }}
                        style={styles.cardImage}
                        resizeMode="cover"
                    />
                    <View style={styles.overlay}>
                        <Text style={styles.cardText}>{item.name}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header Text */}
            <Text style={styles.headerText}>BROWSE OUR CATEGORY</Text>

            {/* Category Cards */}
            <FlatList
                data={dataWithViewMore}
                renderItem={renderCard}
                keyExtractor={(item) => item._id}
                numColumns={2}
                columnWrapperStyle={styles.row}
            />
        </SafeAreaView>
    );
};

export default CategoryHomeCard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#0000',
    },
    headerText: {
        textAlign: 'center',
        marginVertical: 16,
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    card: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginHorizontal: 5,
        // padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: Dimensions.get('window').width / 2 - 90, // Make the cards responsive
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    cardImageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative', // So text can be absolutely positioned on top of the image
        width: '100%',
        height: '100%',
    },
    cardImage: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject, // Cover the entire card
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Dark overlay
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    cardText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        borderWidth: 1,
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderColor: '#fff',
        borderRadius: 4
    },
    viewMoreCard: {
        backgroundColor: '#007BFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewMoreText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
});
