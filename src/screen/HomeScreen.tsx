import React, { useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHomeData, deleteProduct } from '../helper/userSlice'; 
import { RootState, AppDispatch } from '../store/roodReducer';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';

const HomeScreen = () => {
    const dispatch: AppDispatch = useDispatch();
    const { data, status, error } = useSelector((state: RootState) => state.home);

    useEffect(() => {
        dispatch(fetchHomeData());
    }, [dispatch]);

    const renderRightActions = (itemId: number) => {
        return (
            <RectButton
                style={styles.deleteButton}
                onPress={() => dispatch(deleteProduct(itemId))} 
            >
                <Text style={styles.deleteText}>Delete</Text>
            </RectButton>
        );
    };

    if (status === 'failed') {
        return <Text>Error: {error}</Text>;
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Swipeable
                        renderRightActions={() => renderRightActions(item.id)} 
                    >
                        <View style={styles.card}>
                            <Image style={styles.image} source={{ uri: item.image }} />
                            <View style={styles.info}>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.price}>Price: ${item.price}</Text>
                                <Text style={styles.description}>{item.description}</Text>
                                <Text style={styles.category}>Category: {item.category}</Text>
                                <View style={styles.rating}>
                                    <Text style={styles.rate}>Rating: {item.rating.rate}</Text>
                                    <Text style={styles.count}>Count: {item.rating.count}</Text>
                                </View>
                            </View>
                        </View>
                    </Swipeable>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#795757',
    },
    card: {
        backgroundColor: '#FFF0D1',
        borderRadius: 10,
        marginVertical: 20,
        marginHorizontal: 20,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    image: {
        width: '70%',
        height: 350,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    info: {
        marginTop: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    price: {
        fontSize: 16,
        color: 'green',
        marginTop: 5,
    },
    description: {
        fontSize: 14,
        color: 'gray',
        marginTop: 5,
    },
    category: {
        fontSize: 14,
        color: '#444',
        marginTop: 5,
    },
    rating: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    rate: {
        fontSize: 14,
        color: '#333',
    },
    count: {
        fontSize: 14,
        color: '#333',
    },
    deleteButton: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'flex-end',
        padding: 20,
        borderRadius: 10,
    },
    deleteText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default HomeScreen;
