import { SafeAreaView, StyleSheet, Text, View, FlatList, TouchableOpacity, Button, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { IGetProduct, IHomeScreenProps } from '.'
import Homerow from './component/Homerow'
import { RootStackScreenProps } from '../config/routeParam';
import SearchButton from '../button/SearchButton';

export type HomeParams = undefined;

const Home = ({ navigation }: RootStackScreenProps<'Home'>) => {
    const [data, setData] = useState<IGetProduct[] | null>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredData, setFilteredData] = useState<IGetProduct[] | null>([]);
    const [isGridView, setIsGridView] = useState<boolean>(false);

    useEffect(() => {
        fetchProduct();
    }, []);

    useEffect(() => {
        const filtered = data.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()));
        setFilteredData(filtered);
    }, [searchQuery, data]);

    const fetchProduct = async () => {
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            const productResponse: IGetProduct[] = await response.json();
            setData(productResponse);
            setFilteredData(productResponse);
        } catch (error) {
            console.log('error');
        }
    };

    const handleClear = () => {
        setSearchQuery('');
    };

    const toggleView = () => {
        setIsGridView(!isGridView);
    };

    const renderGridItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Detail', { url: 'https://fakestoreapi.com/products/' + item.id })}>
            <Homerow name={item.title} image={item.image} price={item.price} isGridView={isGridView} />
        </TouchableOpacity>
    );

    const renderListItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Detail', { url: 'https://fakestoreapi.com/products/' + item.id })}>
            <Homerow name={item.title} image={item.image} price={item.price} isGridView={!isGridView} />
        </TouchableOpacity>
    );

    return (
        <>
            <View style={styles.container}>
                <SearchButton onChangeText={(text: React.SetStateAction<string>) => setSearchQuery(text)} value={searchQuery} onClear={handleClear} />

                <TouchableOpacity onPress={toggleView} style={{ padding: 10 }}>
                    {isGridView ? 
                    (
                    <Image source={require('../assets/list.png')} style={styles.gridlistView} />
                    ) : (
                    <Image source={require('../assets/grid.png')} style={styles.gridlistView} /> 
                    )}
                </TouchableOpacity>

                {isGridView ? (
                    <FlatList
                        key="grid"
                        data={filteredData}
                        numColumns={2}
                        renderItem={renderGridItem}
                        contentContainerStyle={styles.gridContentContainer}
                    />
                ) : (
                    <FlatList
                        key="list"
                        data={filteredData}
                        renderItem={renderListItem}
                    />
                )}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    gridlistView: {
        alignSelf: 'flex-end',
        width: 30,
        height: 30,
    },
    container: {
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 150,
    },
    gridContentContainer: {
        paddingHorizontal: 15, // Adjust the padding as needed for your design
    },
});

export default Home;
