import { StyleSheet, View, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { IGetProduct} from '.'
import Homerow from './component/Homerow'
import { RootStackScreenProps } from '../config/routeParam';
import SearchButton from '../button/SearchButton';
import OwnedProduct from '../button/OwnedProduct';

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
        const filtered = data?.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()));
        setFilteredData(filtered || []);
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

    const renderGridItem = ({ item } : {item: IGetProduct}) => (
        <TouchableOpacity onPress={() => navigation.navigate('Detail', { url: 'https://fakestoreapi.com/products/' + item.id })}>
            <Homerow name={item.title} image={item.image} price={item.price} isGridView={isGridView} />
        </TouchableOpacity>
    );

    const renderListItem = ({ item } : {item: IGetProduct}) => (
        <TouchableOpacity onPress={() => navigation.navigate('Detail', { url: 'https://fakestoreapi.com/products/' + item.id })}>
            <Homerow name={item.title} image={item.image} price={item.price} isGridView={!isGridView} />
        </TouchableOpacity>
    );

    return (
        <>
            <View style={styles.container}>
                <SearchButton onChangeText={(text: React.SetStateAction<string>) => setSearchQuery(text)} value={searchQuery} onClear={handleClear} />
                <View style={styles.styling}>
                <OwnedProduct bg={'#8775a8'} title={'Owned Products   > '} color={'#fff'} onClick={() => navigation.navigate('MyProduct')}/>
                <TouchableOpacity onPress={toggleView} style={{ padding: 10 }}>
                    {isGridView ? 
                    (
                    <Image source={require('../assets/list.png')} style={styles.gridlistView} />
                    ) : (
                    <Image source={require('../assets/grid.png')} style={styles.gridlistView} /> 
                    )}
                </TouchableOpacity>
                </View>
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
        marginTop: -20,
        alignSelf: 'flex-end',
        width: 30,
        height: 30,
        marginLeft: 10,
    },
    container: {
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 150,
    },
    gridContentContainer: {
        paddingHorizontal: 15,
    },
    styling : {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        gap: 90,
    },
});

export default Home;
