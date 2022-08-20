import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

const SCREEN_HEIGHT = Dimensions.get('window').height / 2;
console.log(SCREEN_HEIGHT);

const StyledAnimatedText = (props: any) => {
  const {item, index, translateX, translateY, width} = props;

  const isInRange = useDerivedValue(() => {
    if (
      translateY.value > SCREEN_HEIGHT - 80 &&
      translateY.value < SCREEN_HEIGHT + 80
    ) {
      return true;
    } else {
      return false;
    }
  }, []);

  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      [(index - 1) * width, index * width, (1 + index) * width],
      [1, 2.5, 1],
      Extrapolate.CLAMP,
    );

    return {
      transform: [
        {
          scale: isInRange.value ? scale : withTiming(1),
        },
      ],
    };
  }, [translateX]);
  return (
    <Animated.View style={[styles.container, {width: width}]}>
      <Animated.Text style={[styles.textStyle, rStyle]}>
        {item.alphabet}
      </Animated.Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: 'white',
    fontSize: 30,
    letterSpacing: 10,
  },
});

export default StyledAnimatedText;
