import {Dimensions, StyleSheet, View} from 'react-native';
import React from 'react';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import StyledAnimatedText from './Components/StyledAnimatedText';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const TEXT_DATA = [
  {
    id: 0,
    alphabet: 'H',
  },
  {
    id: 1,
    alphabet: 'O',
  },
  {
    id: 2,
    alphabet: 'V',
  },
  {
    id: 3,
    alphabet: 'E',
  },
  {
    id: 4,
    alphabet: 'R',
  },
];

type ContextType = {
  translateX: number;
  translateY: number;
};

const SCREEN_WIDTH = Dimensions.get('window').width;
const SPACER = 80;

const Hover = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (event, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
    onEnd: () => {
      translateX.value = 0;
      translateY.value = 0;
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

  const tapGestureEvent =
    useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
      onStart: event => {
        translateY.value = event.absoluteY - 40;
        translateX.value = event.absoluteX - 40;
      },
      onEnd: _ => {},
    });

  return (
    <View style={styles.container}>
      <TapGestureHandler onGestureEvent={tapGestureEvent}>
        <Animated.View>
          <PanGestureHandler onGestureEvent={panGestureEvent}>
            <Animated.View style={styles.panInnerWrapper}>
              <Animated.View style={styles.textContainer}>
                {TEXT_DATA.map((item, index) => (
                  <StyledAnimatedText
                    width={SCREEN_WIDTH / TEXT_DATA.length}
                    translateX={translateX}
                    translateY={translateY}
                    item={item}
                    index={index}
                    key={index}
                  />
                ))}
              </Animated.View>
              <Animated.View style={[styles.hiddenSelector, rStyle]} />
            </Animated.View>
          </PanGestureHandler>
        </Animated.View>
      </TapGestureHandler>
    </View>
  );
};

export default Hover;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  textContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'black',
  },
  panInnerWrapper: {
    height: '100%',
    width: '100%',
  },
  hiddenSelector: {
    height: 60,
    width: (SCREEN_WIDTH - SPACER) / TEXT_DATA.length,
    position: 'absolute',
    top: 0,
  },
});
