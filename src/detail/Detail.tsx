import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView, Alert, View} from 'react-native';
import {IGetProductDetail} from '.';
import Detailrow from './components/Detailrow';
import {RootStackScreenProps} from '../config/routeParam';
import Custombutton from '../button/CustomButton';
import {useProductContext} from '../myproduct/ProductContext';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type DetailParams = {
  url: string;
  setCoinValue: (value: any) => void;
  currentCoinValue: number;
};

const Detail = ({route}: RootStackScreenProps<'Detail'>) => {
  const {addProductToOwned, ownedProducts, removeProductFromOwned} =
    useProductContext();
  const [data, setData] = useState<IGetProductDetail | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    fetchProduct();
  }, [route.params.url]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(route.params.url);
      const productResponse: IGetProductDetail = await response.json();
      setData(productResponse);
    } catch (error) {
      console.log('error');
    }
  };

  const isItemInMyProducts = () => {
    return ownedProducts.some(
      (product: {title: string | undefined; price: string | undefined}) =>
        product.title === data?.title && product.price === data?.price,
    );
  };

  const buyProduct = async () => {
    const itemPrice = Number(data?.price || 0);
    if (route.params.currentCoinValue >= itemPrice) {
      const newCoinValue = (route.params.currentCoinValue - itemPrice).toFixed(
        2,
      );
      route.params.setCoinValue(
        (prevCoinValue: number) => prevCoinValue - itemPrice,
      );

      await AsyncStorage.setItem('coinValue', newCoinValue.toString());

      addProductToOwned(data);
      Alert.alert(
        'Success!',
        `${data?.title} was bought successfully! Your current coin is ${newCoinValue}`,
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('Home', {
                setCoinValue: route.params.setCoinValue,
                currentCoinValue: route.params.currentCoinValue - itemPrice,
              });
            },
          },
        ],
      );
    } else {
      Alert.alert(
        'Insufficient Coins',
        'You do not have enough coins to purchase this item.',
      );
    }
  };

  const sellProduct = async () => {
    if (isItemInMyProducts()) {
      const itemPrice = Number(data?.price || 0);
      const quantitySold = ownedProducts.filter(
        (product: {title: string | undefined; price: string | undefined}) =>
          product.title === data?.title && product.price === data?.price,
      ).length;

      const totalPrice = quantitySold * itemPrice;

      route.params.setCoinValue(route.params.currentCoinValue + totalPrice);

      await AsyncStorage.setItem(
        'coinValue',
        (route.params.currentCoinValue + totalPrice).toString(),
      );

      const newCoinValue = (route.params.currentCoinValue + totalPrice).toFixed(
        2,
      );

      removeProductFromOwned(data?.title, quantitySold);

      Alert.alert(
        'Success!',
        `${quantitySold} ${data?.title} was sold for ${totalPrice} coins, Your current coin is ${newCoinValue}`,
      );
      navigation.navigate('Home', {
        setCoinValue: route.params.setCoinValue,
        currentCoinValue: route.params.currentCoinValue + itemPrice,
      });
    } else {
      Alert.alert('Item Not Found', 'You have not bought this product yet');
    }
  };

  return (
    <>
      <ScrollView style={styles.background}>
        <Detailrow
          title={data?.title ?? '-'}
          price={data?.price ?? '-'}
          description={data?.description ?? '-'}
          category={data?.category ?? '-'}
          image={
            data?.image ||
            'https://southeastasia1-mediap.svc.ms/transform/thumbnail?provider=spo&inputFormat=png&cs=fFNQTw&docid=https%3A%2F%2Fbinusianorg-my.sharepoint.com%3A443%2F_api%2Fv2.0%2Fdrives%2Fb!2QgqfpAKyEOVy8V04OZk6evpuYKML5pCuSDC_u70meQLYk1HpGomTqUi50C22nlc%2Fitems%2F01RFE46HFNYPZOM2XBMZAZONN7XDS62WVZ%3Fversion%3DPublished&access_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvYmludXNpYW5vcmctbXkuc2hhcmVwb2ludC5jb21AMzQ4NWI5NjMtODJiYS00YTZmLTgxMGYtYjVjYzIyNmZmODk4IiwiaXNzIjoiMDAwMDAwMDMtMDAwMC0wZmYxLWNlMDAtMDAwMDAwMDAwMDAwIiwibmJmIjoiMTcwMTM0NTYwMCIsImV4cCI6IjE3MDEzNjcyMDAiLCJlbmRwb2ludHVybCI6ImdBSnJTdS9DKzJza3RkUUNoc2luT3VzT1duaGdST1FxcWNzbDZ2aHlLbUk9IiwiZW5kcG9pbnR1cmxMZW5ndGgiOiIxMjEiLCJpc2xvb3BiYWNrIjoiVHJ1ZSIsInZlciI6Imhhc2hlZHByb29mdG9rZW4iLCJzaXRlaWQiOiJOMlV5WVRBNFpEa3RNR0U1TUMwME0yTTRMVGsxWTJJdFl6VTNOR1V3WlRZMk5HVTUiLCJzaWduaW5fc3RhdGUiOiJbXCJrbXNpXCJdIiwibmFtZWlkIjoiMCMuZnxtZW1iZXJzaGlwfHN0ZWZhbnVzLndpbHNvbkBiaW51cy5hYy5pZCIsIm5paSI6Im1pY3Jvc29mdC5zaGFyZXBvaW50IiwiaXN1c2VyIjoidHJ1ZSIsImNhY2hla2V5IjoiMGguZnxtZW1iZXJzaGlwfDEwMDMyMDAyMjFjODY2OTJAbGl2ZS5jb20iLCJzaWQiOiIzOTdiNGVlNC0zOGZjLTRmZTctYmFjYS0yNjQwNGMxMTQyNjIiLCJ0dCI6IjAiLCJpcGFkZHIiOiIxMTAuMTM2Ljc1LjEwMCIsInNuaWQiOiI2Iiwic3RwIjoidCJ9.JwcMNMQzxKJoMhzYwadQeAcLFHzIQjPrWwvdi7S-htI&cTag=%22c%3A%7BE6F2C3AD-E16A-4166-9735-BFB8E5ED5AB9%7D%2C2%22&encodeFailures=1&width=270&height=270&srcWidth=1080&srcHeight=1080'
          }
        />

        <View style={styles.button}>
          <Custombutton
            bg={'#8775a8'}
            title={'Buy'}
            color={'#fff'}
            onClick={buyProduct}
          />
          <Custombutton
            bg={'#5a75a8'}
            title={'Sell'}
            color={'#fff'}
            onClick={sellProduct}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default Detail;

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#fff',
  },

  button: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
});
