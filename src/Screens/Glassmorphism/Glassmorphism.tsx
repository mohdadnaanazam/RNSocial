import {
  BackdropBlur,
  Canvas,
  Fill,
  Group,
  Image,
  mix,
  rect,
  Rect,
  useComputedValue,
  useImage,
  useLoop,
  vec,
} from '@shopify/react-native-skia';
import React from 'react';
import {StyleSheet, useWindowDimensions} from 'react-native';

const Glassmorphism = () => {
  const {width, height} = useWindowDimensions();
  const center = vec(width / 2, height / 2);
  const blurClipPath = rect(0, center.y, width, 500);
  const image = useImage('https://picsum.photos/1920/1080');
  const blurProgress = useLoop({duration: 2000});
  const blur = useComputedValue(
    () => mix(blurProgress.current, 0, 10),
    [blurProgress],
  );
  return (
    <Canvas style={styles.container}>
      <Group>
        <Rect x={0} y={0} width={width} height={height} />
        {image && (
          <Image
            x={0}
            y={0}
            width={width}
            height={height}
            image={image}
            fit={'cover'}
          />
        )}
      </Group>
      <Group>
        <BackdropBlur blur={blur} clip={blurClipPath}>
          <Fill color={'rgba(122, 122, 154, 0.2)'} />
        </BackdropBlur>
      </Group>
    </Canvas>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Glassmorphism;
