import {View, StyleSheet, Image} from 'react-native';
import React from 'react';
import Ring from './Ring';

const COLOR = '#6E01EF';
const SIZE = 100;

const PhoneRing = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.dot, styles.center]}>
        {[...Array(3).keys()].map((_, index) => (
          <Ring key={index} index={index} />
        ))}
        <Image source={require('../../Assets/phone.png')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    height: SIZE,
    width: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: COLOR,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PhoneRing;
