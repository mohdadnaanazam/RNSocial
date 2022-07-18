import {Dimensions, StatusBar, StyleSheet} from 'react-native';
import React, {Fragment} from 'react';
import Item from './Components/Item';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: 5 * height,
    backgroundColor: 'black',
  },
});

const data = [
  {
    id: 0,
    image:
      'https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 1,
    image:
      'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 2,
    image:
      'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 3,
    image:
      'https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 4,
    image:
      'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 5,
    image:
      'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 6,
    image:
      'https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

const ChanelScroll = () => {
  const y = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler(event => {
    console.log(event.contentOffset.y);
    y.value = event.contentOffset.y;
  });
  return (
    <Fragment>
      <StatusBar hidden />
      <Animated.ScrollView
        scrollEventThrottle={16}
        snapToInterval={height / 2}
        decelerationRate="fast"
        style={{backgroundColor: 'black'}}
        onScroll={onScroll}>
        <Animated.View style={styles.container}>
          {data.map((item, index) => (
            <Item y={y} index={index} item={item} key={index} />
          ))}
        </Animated.View>
      </Animated.ScrollView>
    </Fragment>
  );
};

export default ChanelScroll;
