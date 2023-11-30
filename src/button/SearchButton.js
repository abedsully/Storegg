import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';

const SearchButton = ({onChangeText, value, onClear}) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchView}>
        <Image source={require('../assets/search.png')} style={styles.icon} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          styles={styles.input}
          placeholder="Search items here"
        />
        <TouchableOpacity onPress={onClear} style={styles.clearButton}>
          <Image
            source={require('../assets/close.png')}
            style={styles.clearIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchButton;

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
    marginTop: 10,
  },

  clearButton: {
    marginTop: 13,
    position: 'absolute',
    right: 20,
  },

  clearIcon: {
    width: 20,
    height: 20,
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 100,
  },
  searchView: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    alignSelf: 'center',
    marginTop: 20,
    paddingLeft: 20,
    flexDirection: 'row',
    gap: 20,
  },
  input: {
    width: '60%',
  },
});
