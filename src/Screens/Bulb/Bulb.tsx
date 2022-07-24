/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useCallback} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Svg, {Line, Path} from 'react-native-svg';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import ColorPicker from './Components/ColorPicker';

const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('window');

const PICKER_WIDTH = SCREEN_WIDTH * 0.9;

const COLORS = [
  'red',
  'purple',
  'blue',
  'cyan',
  'green',
  'yellow',
  'orange',
  'black',
  'white',
];

const AnimatedSVGLIne = Animated.createAnimatedComponent(Line);
const AnimatedSVG = Animated.createAnimatedComponent(Svg);
const AnimatedPATH = Animated.createAnimatedComponent(Path);

type ContextType = {
  translateX: number;
  translateY: number;
  wireTranslateY: number;
};

const Bulb = () => {
  const translateX = useSharedValue(10);
  const translateY = useSharedValue(0);

  const wireTranslateY = useSharedValue(100);
  const pickerValue = useSharedValue(COLORS[0]);

  const bulbAnimatedProps = useAnimatedProps(() => {
    return {
      fill: pickerValue.value,
    };
  });

  const AnimatedIcon = () => {
    return (
      <>
        <Animated.View
          style={{
            transform: [
              {
                rotate: '180deg',
              },
            ],
            shadowOffset: {width: 100, height: 40},
            shadowOpacity: 0.2,
            shadowRadius: 3,
          }}>
          <AnimatedSVG
            width={50}
            height={50}
            color={'pink'}
            viewBox="0 0 16 16">
            <AnimatedPATH
              animatedProps={bulbAnimatedProps}
              d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13h-5a.5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6zm3 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1-.5-.5z"
            />
          </AnimatedSVG>
        </Animated.View>
      </>
    );
  };

  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (event, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
      context.wireTranslateY = wireTranslateY.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
      wireTranslateY.value = event.translationY + context.wireTranslateY;
    },
    onEnd: () => {
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
      wireTranslateY.value = withSpring(100);
    },
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  const animatedLineProps = useAnimatedProps(() => {
    return {
      x2: SCREEN_WIDTH / 2 + translateX.value,
      y2: wireTranslateY.value,
    };
  });

  const onChangeColor = useCallback(
    (color: string) => {
      'worklet';
      pickerValue.value = color;
    },
    [pickerValue.value],
  );

  return (
    <>
      <GestureHandlerRootView style={styles.container}>
        <AnimatedSVG
          style={{
            position: 'absolute',
            height: SCREEN_HEIGHT,
          }}
          width={SCREEN_WIDTH}>
          <AnimatedSVGLIne
            x1={SCREEN_WIDTH / 2}
            y1="0"
            stroke="gray"
            strokeWidth="2"
            animatedProps={animatedLineProps}
          />
        </AnimatedSVG>

        <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.View
            style={[
              {
                height: 250,
                width: SCREEN_WIDTH,
                alignItems: 'center',
              },
              rStyle,
            ]}>
            <AnimatedIcon />
          </Animated.View>
        </PanGestureHandler>
      </GestureHandlerRootView>
      <View
        style={{
          height: 100,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'black',
        }}>
        <ColorPicker
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={COLORS}
          style={styles.gradient}
          maxWidth={PICKER_WIDTH}
          onChangeColor={onChangeColor}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    paddingTop: 100,
  },
  gradient: {
    height: 40,
    width: PICKER_WIDTH,
    borderRadius: 20,
    backgroundColor: 'red',
  },
});

export default Bulb;
