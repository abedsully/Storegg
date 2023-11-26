import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useProductContext } from './ProductContext';
import MyProductrow from './components/MyProductrow';

interface Product {
    title: string;
    image: string;
    price: string;
}


const MyProduct = () => {
  const { ownedProducts } = useProductContext();
  const [isGridView] = useState<boolean>(false);

  return (
    <ScrollView>
      {ownedProducts.map((product: Product, index: number) => (
        <View key={index}>
            <MyProductrow name={product.title} image={product.image} price={product.price} />
        </View>

      ))}
    </ScrollView>
  );
};

export default MyProduct;

const styles = StyleSheet.create({});