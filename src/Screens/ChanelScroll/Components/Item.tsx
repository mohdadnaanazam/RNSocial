import {Image, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

const {height, width} = Dimensions.get('window');

const MIN_HEIGHT = 128;
const MAX_HEIGHT = height / 2;

const Item = (props: any) => {
  const {item, y, index} = props;

  const rStyle = useAnimatedStyle(() => {
    const hgt = interpolate(
      y.value,
      [(index - 1) * MAX_HEIGHT, index * MAX_HEIGHT],
      [MIN_HEIGHT, MAX_HEIGHT],
      Extrapolate.CLAMP,
    );
    return {
      height: hgt,
    };
  });
  return (
    <Animated.View style={[styles.imageContainer, rStyle]}>
      <Image source={{uri: item.image}} style={styles.image} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    height: MAX_HEIGHT,
    width: width,
  },
  image: {
    height: undefined,
    width: undefined,
    flex: 1,
  },
});

export default Item;
