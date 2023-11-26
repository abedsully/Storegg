import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { IHomeRowProps } from './interfaces'

const Homerow = (props: IHomeRowProps) => {
    const {name, image, price} = props

  return (
    <View style={styles.card} key={name}>
        <Image style={styles.tinyLogo} source={{uri: image,}}/>

        <View style={styles.description}>
            <Text style={styles.cardName}>{name}</Text>
            <Text style={styles.cardPrice}>Price: {price}</Text>
        </View>
    </View>

  )
}

export default Homerow

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
        gap: 10,
    },

    description: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 10,
        gap: 20,
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