import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const RemoveButton = ({onClick}) => {
  return (
    <View>
        <TouchableOpacity activeOpacity={1} onPress={() => onClick()}>
            <Image source={require('../assets/close.png')} style={styles.clearIcon} />
        </TouchableOpacity>
    </View>
  )
}

export default RemoveButton

const styles = StyleSheet.create({
    clearIcon: {
        width: 20,
        height: 20,
    },
})