import React from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  useDerivedValue,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';
import LinearGradient, {
  LinearGradientProps,
} from 'react-native-linear-gradient';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

const CIRCLE_PICKER_SIZE = 45;
const INTERNAL_PICKER_SIZE = CIRCLE_PICKER_SIZE / 2;

interface ColoPickerProps extends LinearGradientProps {
  colors: string[];
  maxWidth: number;
  onChangeColor: (color: string) => void;
}

const ColorPicker: React.FC<ColoPickerProps> = ({
  style,
  colors,
  start,
  end,
  maxWidth,
  onChangeColor,
}) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const adjustTranslateX = useDerivedValue(() => {
    return Math.min(
      Math.max(translateX.value, 0),
      maxWidth - CIRCLE_PICKER_SIZE,
    );
  });

  const gestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {
      translateX: number;
    }
  >({
    onStart: (event, context) => {
      context.translateX = adjustTranslateX.value;
      translateY.value = withTiming(-CIRCLE_PICKER_SIZE);
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
    },
    onEnd: () => {
      translateY.value = withTiming(0);
    },
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: adjustTranslateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  const internalPicker = useAnimatedStyle(() => {
    const inputRange = colors.map(
      (_, index) => (index / colors.length) * maxWidth,
    );
    const backgroundColor = interpolateColor(
      adjustTranslateX.value,
      inputRange,
      colors,
    );
    onChangeColor(backgroundColor);

    return {
      backgroundColor: backgroundColor,
    };
  });

  return (
    <PanGestureHandler onGestureEvent={gestureEvent}>
      <Animated.View style={{justifyContent: 'center'}}>
        <LinearGradient start={start} end={end} colors={colors} style={style} />
        <Animated.View style={[styles.picker, rStyle]}>
          <Animated.View style={[styles.innerCircle, internalPicker]} />
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  picker: {
    height: CIRCLE_PICKER_SIZE,
    width: CIRCLE_PICKER_SIZE,
    borderRadius: CIRCLE_PICKER_SIZE,
    position: 'absolute',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    height: INTERNAL_PICKER_SIZE,
    width: INTERNAL_PICKER_SIZE,
    borderRadius: INTERNAL_PICKER_SIZE / 2,
    backgroundColor: 'green',
  },
});

export default ColorPicker;
