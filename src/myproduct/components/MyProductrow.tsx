import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { IProductRowProps } from './interfaces'
import RemoveButton from '../../button/RemoveButton'
import { useProductContext } from '../ProductContext'

const MyProductrow = (props: IProductRowProps) => {
    const {name, image, price} = props
    const { removeProductFromOwned } = useProductContext();

    const handleRemoveProduct = () => {
        Alert.alert(
          'Remove Product',
          'Are you sure you want to remove this product from your owned product list?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Remove',
              onPress: () => {
                removeProductFromOwned(name);
              },
            },
          ]
        );
      };
    

  return (
    <View style={styles.card} key={name}>
        <Image style={styles.tinyLogo} source={{uri: image,}}/>

        <View style={styles.description}>
            <Text style={styles.cardName}>{name}</Text>
            <Text style={styles.cardPrice}>Price: {price}</Text>
        </View>

        <RemoveButton onClick={handleRemoveProduct}/>
    </View>

  )
}

export default MyProductrow

const styles = StyleSheet.create({
    card: {
        borderRadius: 8,
        padding: 25,
        borderWidth: 1,
        borderColor: '#ccc',
        margin: 8,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#fff",
    },

    description: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 10,
        gap: 20,
        paddingRight: 40,
    },

    cardName : {
        fontSize: 17,
        fontWeight: 'bold',
        textTransform: 'capitalize',
        marginLeft: 20,
    },

    cardPrice : {
        fontSize: 16,
        marginLeft: 20,
        fontWeight: 'bold',
        color: 'green',
    },

    tinyLogo : {
        width: 100,
        height: 120,
        resizeMode: 'contain',
    },
})