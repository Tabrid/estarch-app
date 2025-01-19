import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import baseUrl from '../services/baseUrl';
import { router } from 'expo-router';

const CategoryHomeCardTop = () => {
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
                const activeCategories = data.filter(category => category.active);
                setCategory(activeCategories);
            } catch (error) {
                console.error('Error fetching categories:', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const demoData = category.slice(0, 7);

    const handleViewMore = () => {
        console.log('View More Clicked');
    };

    const windowSymbol = '\u229E'; // Unicode for Windows-style "View More" symbol

    // Add the "View More" card as the last item in the list
    const dataWithViewMore = [...demoData, { id: 'view-more', name: 'More', image: null }];

    const renderCard = ({ item }) => {
        if (item.id === 'view-more') {
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
                <Image
                    source={{ uri: `${baseUrl}/${item.image}` }}
                    style={styles.cardImage}
                    resizeMode="cover"
                />
                <View style={styles.overlay}>
                    <Text style={styles.cardText}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={dataWithViewMore}
                renderItem={renderCard}
                keyExtractor={(item) => item.id}
                numColumns={4} // 4 columns
                columnWrapperStyle={styles.row}
            />
        </SafeAreaView>
    );
};

export default CategoryHomeCardTop;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#0000',
        marginTop: -30
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    card: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 12,
        marginHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
        height: Dimensions.get('window').width / 4 - 15, // Make the cards fit in 4 columns
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    cardImage: {
        width: '100%',
        height: '100%',
        borderRadius: 12,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
    },
    cardText: {
        fontSize: 10,
        color: '#fff',
        fontWeight: 'bold',
        marginTop:'50%'
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
