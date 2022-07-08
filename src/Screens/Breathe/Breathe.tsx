import React, {useEffect} from 'react';
import {
  BlurMask,
  Canvas,
  Circle,
  Group,
  mix,
  useComputedValue,
  useSharedValueEffect,
  useValue,
} from '@shopify/react-native-skia';
import {Dimensions, StyleSheet} from 'react-native';
import {useSharedValue, withRepeat, withTiming} from 'react-native-reanimated';

const {height, width} = Dimensions.get('screen');

const OFFSET = 80;
const RADIUS = 80;
const RING_COLOR = '#90D5E0';

export default function App() {
  const skValue = useValue(0);
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, {duration: 5000}), -1, true);
  }, [progress]);

  useSharedValueEffect(() => {
    skValue.current = progress.value;
  }, progress);

  const transform = useComputedValue(
    () => [{rotate: mix(skValue.current, -Math.PI * 2, 0)}],
    [skValue],
  );

  const Ring = ({x, index}: any) => {
    const ringTransform = useComputedValue(
      () => [
        {scale: mix(x.current, 1, 0.6)},
        {
          rotate: (Math.PI / 3) * (index + 1),
        },
        {
          translateX: mix(x.current, 0, -OFFSET),
        },
      ],
      [x],
    );

    return (
      <Group origin={{x: width / 2, y: height / 2}} transform={ringTransform}>
        <Circle
          opacity={index % 2 ? 1 : 0.8}
          cx={width / 2 + OFFSET}
          cy={height / 2}
          r={RADIUS}
          color={RING_COLOR}
        />
      </Group>
    );
  };
  return (
    <Canvas style={styles.container}>
      <Group
        blendMode="multiply"
        transform={transform}
        origin={{x: width / 2, y: height / 2}}>
        <BlurMask blur={5} />
        {new Array(6).fill(0).map((_, index) => {
          return <Ring key={index} index={index} x={skValue} />;
        })}
      </Group>
    </Canvas>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
