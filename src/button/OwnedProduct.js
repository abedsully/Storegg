import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const OwnedProduct = ({bg, title, onClick, color}) => {
  return (
    <TouchableOpacity activeOpacity={1} style={[styles.button, {backgroundColor: bg}]} onPress={() => onClick()}>
        <Text style={{color: color, fontSize: 18, fontWeight: '600'}}>
            {title}
        </Text>
    </TouchableOpacity>
  )
}

export default OwnedProduct

const styles = StyleSheet.create({
    button: {
      marginBottom: 20,
        width: 150,
        height: 53,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 10,
    }
})