import {Image, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

const {height, width} = Dimensions.get('window');

const MIN_HEIGHT = 128;
const MAX_HEIGHT = height / 2;
const TOUCH_SLOP = 5;
const TIME_TO_ACTIVATE_PAN = 400;

const Item = (props: any) => {
  const {item, y, index} = props;

  const touchStart = useSharedValue({x: 0, y: 0, time: 0});
  const rotateX = useSharedValue(0);
  const rotateY = useSharedValue(0);

  const rStyle = useAnimatedStyle(() => {
    const rHeight = interpolate(
      y.value,
      [(index - 1) * MAX_HEIGHT, index * MAX_HEIGHT],
      [MIN_HEIGHT, MAX_HEIGHT],
      Extrapolate.CLAMP,
    );

    const opacity = interpolate(
      y.value,
      [(index - 1) * MAX_HEIGHT, index * MAX_HEIGHT, (index + 1) * MAX_HEIGHT],
      [1, 1, -1],
      Extrapolate.CLAMP,
    );
    return {
      height: rHeight,
      opacity: opacity,
      transform: [
        {
          perspective: 300,
        },
        {
          rotateX: `${rotateX.value}deg`,
        },
        {
          rotateY: `${rotateY.value}deg`,
        },
      ],
    };
  });

  const gesture = Gesture.Pan()
    .onBegin(event => {
      rotateX.value = withTiming(
        interpolate(event.y, [0, MAX_HEIGHT], [8, -8], Extrapolate.CLAMP),
      );
      rotateY.value = withTiming(
        interpolate(event.x, [0, MAX_HEIGHT], [-8, 8], Extrapolate.CLAMP),
      );
    })
    .manualActivation(true)
    .onTouchesDown(e => {
      touchStart.value = {
        x: e.changedTouches[0].x,
        y: e.changedTouches[0].y,
        time: Date.now(),
      };
    })
    .onTouchesMove((e, state) => {
      if (Date.now() - touchStart.value.time > TIME_TO_ACTIVATE_PAN) {
        state.activate();
      } else if (
        Math.abs(touchStart.value.x - e.changedTouches[0].x) > TOUCH_SLOP ||
        Math.abs(touchStart.value.y - e.changedTouches[0].y) > TOUCH_SLOP
      ) {
        state.fail();
      }
    })
    .onUpdate(event => {
      rotateX.value = interpolate(
        event.y,
        [0, MAX_HEIGHT],
        [5, -5],
        Extrapolate.CLAMP,
      );
      rotateY.value = interpolate(
        event.x,
        [0, MAX_HEIGHT],
        [-5, 5],
        Extrapolate.CLAMP,
      );
    })
    .onFinalize(() => {
      rotateY.value = withTiming(0);
      rotateX.value = withTiming(0);
    });
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.imageContainer, rStyle]}>
        <Image source={{uri: item.image}} style={styles.image} />
      </Animated.View>
    </GestureDetector>
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
