import { StyleSheet, Text, TouchableOpacity, Image} from 'react-native'
import React from 'react'

const CoinButton = ({ onClick, bg }) => {
  return (
    <TouchableOpacity activeOpacity={1} style={[styles.button, {backgroundColor: bg}]} onPress={() => onClick()}>
        <Image source={require('../assets/coin.png')} style={styles.coinIcon} />
        <Text style={styles.amount}>10000</Text>
    </TouchableOpacity>
  )
}

export default CoinButton

const styles = StyleSheet.create({
    button: {
      marginLeft: 10,
      marginBottom: 20,
        width: 130,
        height: 53,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius: 10,
    },

    coinIcon: {
        width: 70,
        height: 70,
        marginLeft: -5,
    },

    amount: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    }

})