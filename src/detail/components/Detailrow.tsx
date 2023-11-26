import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { IDetaiLRowProps } from './interfaces';

const Detailrow = (props: IDetaiLRowProps) => {
  const { title, price, description, category, image } = props;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.image}>
        <Image style={styles.images} source={{ uri: image }} />
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.price}>Price: {price}</Text>
    </ScrollView>
  );
};

export default Detailrow

const styles = StyleSheet.create({

    container: {
        backgroundColor: "#fff",
        paddingBottom: 20,
    },

    image: {
        marginTop: 50,
        flex: 1,
        alignItems: 'center',
    },

    images: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 350,
        height: 350,
        resizeMode: 'contain',
    },

    title: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 40,
        fontSize: 30,
        color: '#000',
        fontWeight: '600',
        textAlign: 'center',
    },

    description: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30,
        fontSize: 16,
        color: 'grey',
        textAlign: 'center',
    },

    price : {
        fontSize: 20,
        marginTop: 30,
        color: 'green',
        textAlign: 'center',
    }


})