import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {IGetProduct} from '.';
import Homerow from './component/Homerow';
import {RootStackScreenProps} from '../config/routeParam';
import SearchButton from '../button/SearchButton';
import OwnedProduct from '../button/OwnedProduct';
import CoinButton from '../button/CoinButton';
import Homerowgrid from './component/Homerowgrid';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type HomeParams = {
  setCoinValue: (value: number) => void;
  currentCoinValue: number;
};

const Home = ({navigation}: RootStackScreenProps<'Home'>) => {
  const [data, setData] = useState<IGetProduct[] | null>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredData, setFilteredData] = useState<IGetProduct[] | null>([]);
  const [isGridView, setIsGridView] = useState<boolean>(false);
  const [coinValue, setCoinValue] = useState<number>(0);

  useEffect(() => {
    fetchProduct();
  }, []);

  useEffect(() => {
    const loadCoinValue = async () => {
      try {
        const savedCoinValue = await AsyncStorage.getItem('coinValue');
        if (savedCoinValue !== null) {
          setCoinValue(parseFloat(savedCoinValue));
        }
      } catch (error) {
        console.error('Error loading coinValue from AsyncStorage:', error);
      }
    };

    loadCoinValue();
  }, []);

  useEffect(() => {
    const filtered = data?.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
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

  const navigateDetail = (item: IGetProduct) => {
    navigation.navigate('Detail', {
      url: 'https://fakestoreapi.com/products/' + item.id,
      setCoinValue,
      currentCoinValue: coinValue,
    });
  };

  const navigateCoin = () => {
    navigation.navigate('MyCoin', {
      setCoinValue,
      currentCoinValue: coinValue,
    });
  };

  const renderGridItem = ({item}: {item: IGetProduct}) => (
    <TouchableOpacity onPress={() => navigateDetail(item)}>
      <Homerowgrid
        name={''}
        image={item.image}
        price={''}
        isGridView={isGridView}
      />
    </TouchableOpacity>
  );

  const renderListItem = ({item}: {item: IGetProduct}) => (
    <TouchableOpacity onPress={() => navigateDetail(item)}>
      <Homerow
        name={item.title}
        image={item.image}
        price={item.price}
        isGridView={!isGridView}
      />
    </TouchableOpacity>
  );

  return (
    <>
      <View style={styles.container}>
        <SearchButton
          onChangeText={(text: React.SetStateAction<string>) =>
            setSearchQuery(text)
          }
          value={searchQuery}
          onClear={handleClear}
        />
        <View style={styles.styling}>
          <OwnedProduct
            bg={'#8775a8'}
            title={'My Products  > '}
            color={'#fff'}
            onClick={() => navigation.navigate('MyProduct')}
          />
          <CoinButton
            bg={'#5a75a8'}
            onClick={navigateCoin}
            coinValue={coinValue.toFixed(2)}
          />
          <TouchableOpacity onPress={toggleView} style={{padding: 10}}>
            {isGridView ? (
              <Image
                source={require('../assets/list.png')}
                style={styles.gridlistView}
              />
            ) : (
              <Image
                source={require('../assets/grid.png')}
                style={styles.gridlistView}
              />
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
    marginLeft: 18,
  },

  product: {
    marginLeft: 30,
  },

  container: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 150,
    marginBottom: 25,
  },

  gridContentContainer: {
    paddingHorizontal: 10,
  },

  styling: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: 10,
    paddingLeft: 10,
  },
});

export default Home;
