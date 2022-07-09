import React, {Fragment, useState} from 'react';
import {
  useWindowDimensions,
  StyleSheet,
  FlatList,
  View,
  Pressable,
} from 'react-native';
import {
  Canvas,
  Image,
  useImage,
  ColorMatrix,
  BackdropBlur,
  rect,
  Group,
  Fill,
  rrect,
} from '@shopify/react-native-skia';

const ColorArray = [
  {
    id: 0,
    color_name: 'white',
    color_matrix: [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
  },
  {
    id: 1,
    color_name: 'purple',
    color_matrix: [
      1, -0.2, 0, 0, 0, 0, 1, 0, -0.1, 0, 0, 1.2, 1, 0.1, 0, 0, 0, 1.7, 1, 0,
    ],
  },
  {
    id: 2,
    color_name: 'yellow',
    color_matrix: [
      1, 0, 0, 0, 0, -0.2, 1.0, 0.3, 0.1, 0, -0.1, 0, 1, 0, 0, 0, 0, 0, 1, 0,
    ],
  },
  {
    id: 3,
    color_name: 'cyan',
    color_matrix: [
      1, 0, 0, 1.9, -1.8, 0, 1, 0, 0.0, 0.3, 0, 0, 1, 0, 0.5, 0, 0, 0, 1, 0.2,
    ],
  },
  {
    id: 4,
    color_name: '#3d3d3d',
    color_matrix: [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0],
  },
  {
    id: 5,
    color_name: '#3729B1',
    color_matrix: [
      1, 0, 0, 0, 0, 0, 1, 0, 0, 0, -0.2, 0.2, 0.1, 0.4, 0, 0, 0, 0, 1, 0,
    ],
  },
];

const BLUR_COLOR = 'rgba(122, 122, 122, 0.2)';

export default function Sk() {
  const {width, height} = useWindowDimensions();
  const blurClipPath = rrect(rect(0, height - 100, width, 100), 12, 12);
  const image = useImage('https://picsum.photos/1920/1080');
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <Fragment>
      <Canvas style={styles.container}>
        {image && (
          <Image
            x={0}
            y={0}
            width={width}
            height={height}
            image={image}
            fit={'cover'}>
            <ColorMatrix matrix={ColorArray[activeIndex].color_matrix} />
          </Image>
        )}
        <Group>
          <BackdropBlur blur={5} clip={blurClipPath}>
            <Fill color={BLUR_COLOR} />
          </BackdropBlur>
        </Group>
      </Canvas>
      <View style={styles.bottomContainer}>
        <FlatList
          horizontal
          data={ColorArray}
          renderItem={({item, index}) => (
            <Pressable onPress={() => setActiveIndex(index)}>
              <View
                key={item.id}
                style={[styles.filter, {backgroundColor: item.color_name}]}
              />
            </Pressable>
          )}
        />
      </View>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    height: 100,
    justifyContent: 'center',
    width: '100%',
    paddingLeft: 15,
    paddingTop: 20,
  },
  filter: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: 10,
    borderWidth: 10,
    borderColor: '#fff',
  },
});
