import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RootStackScreenProps} from '../config/routeParam';
import Custombutton from '../button/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyCoin = ({route}: RootStackScreenProps<'MyCoin'>) => {
  const {setCoinValue, currentCoinValue} = route.params;
  const [coinValue, setLocalCoinValue] = useState<number>(
    currentCoinValue || 0,
  );
  const [isEggBroken, setIsEggBroken] = useState<boolean>(false);
  const [earnedCoins, setEarnedCoins] = useState<number>(0);

  useEffect(() => {
    const loadCoinValue = async () => {
      try {
        const savedCoinValue = await AsyncStorage.getItem('coinValue');
        if (savedCoinValue !== null) {
          setLocalCoinValue(parseFloat(savedCoinValue));
        }
      } catch (error) {
        console.error('Error loading coinValue from AsyncStorage:', error);
      }
    };

    loadCoinValue();
  }, []);

  useEffect(() => {
    const saveCoinValue = async () => {
      try {
        await AsyncStorage.setItem('coinValue', coinValue.toFixed(2));
      } catch (error) {
        console.error('Error saving coinValue to AsyncStorage:', error);
      }
    };

    saveCoinValue();
  }, [coinValue]);

  useEffect(() => {
    setCoinValue(coinValue);
  }, [coinValue, setCoinValue]);

  const handlePress = () => {
    if (!isEggBroken) {
      const randomValue = Math.floor(Math.random() * 1000) + 1;
      const newCoinValue = coinValue + randomValue;

      const nonNegativeCoinValue = Math.max(0, newCoinValue);

      setLocalCoinValue(nonNegativeCoinValue);
      setIsEggBroken(true);
      setEarnedCoins(randomValue);
    }
  };

  const handlePlayAgain = () => {
    setIsEggBroken(false);
    setEarnedCoins(0);
  };

  return (
    <View style={styles.background}>
      <View style={styles.myCoin}>
        <Image source={require('../assets/coin.png')} style={styles.coinIcon} />
        <Text style={styles.coinText}>{coinValue.toFixed(2)}</Text>
      </View>

      <View style={styles.textContainer}>
        <Text
          style={[styles.guiding, isEggBroken && styles.congratulationsText]}>
          {' '}
          {!isEggBroken
            ? 'Click on the egg to get your prize!'
            : 'Congratulations!'}{' '}
        </Text>
        {isEggBroken && (
          <Text style={styles.message}>
            {' '}
            You have received <Text style={styles.boldText}>
              {earnedCoins}
            </Text>{' '}
            coins!{' '}
          </Text>
        )}
      </View>

      <TouchableOpacity onPress={handlePress}>
        <Image
          source={
            isEggBroken
              ? require('../assets/egg-broken.png')
              : require('../assets/egg-full.png')
          }
          style={styles.imageEgg}
        />
      </TouchableOpacity>
      {isEggBroken && (
        <View style={styles.playButton}>
          <Custombutton
            bg={'#d99564'}
            title={'Play Again'}
            color={'#fff'}
            onClick={handlePlayAgain}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#fff',
  },

  myCoin: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },

  coinIcon: {
    width: 60,
    height: 60,
  },

  coinText: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  textContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
  },

  guiding: {
    marginTop: 50,
    textAlign: 'center',
    fontSize: 24,
  },

  congratulationsText: {
    fontSize: 30,
    fontWeight: 'bold',
  },

  message: {
    fontSize: 24,
  },

  boldText: {
    fontWeight: 'bold',
  },

  imageEgg: {
    width: 200,
    height: 250,
    marginTop: 100,
    justifyContent: 'center',
    alignSelf: 'center',
  },

  playButton: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 100,
  },
});

export default MyCoin;
