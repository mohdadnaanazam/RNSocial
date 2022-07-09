import {StyleSheet, useWindowDimensions} from 'react-native';
import React from 'react';
import {
  Canvas,
  Circle,
  Group,
  mix,
  Oval,
  SweepGradient,
  useComputedValue,
  useLoop,
  vec,
} from '@shopify/react-native-skia';

const RADIUS = 25;
export default function ReactLogo() {
  const {height, width} = useWindowDimensions();
  const center = vec(width / 2, height / 2);
  const OVAL_X = width / 2 - 60;
  const OVAL_Y = height / 2 - 150;
  const progress = useLoop({duration: 10000});
  const transform = useComputedValue(
    () => [{rotate: mix(progress.current, 0, Math.PI * 2)}],
    [progress],
  );
  const Gradient = () => (
    <SweepGradient
      c={vec(128, 128)}
      colors={['cyan', 'magenta', 'yellow', 'cyan']}
    />
  );
  return (
    <Canvas style={styles.container}>
      <Group blendMode="lighten" origin={center} transform={transform}>
        <Circle r={RADIUS} color="lightblue" c={center}>
          <SweepGradient
            c={vec(128, 128)}
            colors={['cyan', 'magenta', 'yellow', 'cyan']}
          />
        </Circle>
        <Group style="stroke" color="lightblue" strokeWidth={18}>
          <Oval x={OVAL_X} y={OVAL_Y} height={300} width={120}>
            <Gradient />
          </Oval>
          <Group
            origin={center}
            transform={[
              {
                rotate: Math.PI / 3,
              },
            ]}>
            <Oval x={OVAL_X} y={OVAL_Y} height={300} width={120}>
              <Gradient />
            </Oval>
          </Group>
          <Group
            origin={center}
            transform={[
              {
                rotate: -Math.PI / 3,
              },
            ]}>
            <Oval x={OVAL_X} y={OVAL_Y} height={300} width={120}>
              <Gradient />
            </Oval>
          </Group>
        </Group>
      </Group>
    </Canvas>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
