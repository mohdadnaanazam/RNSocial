/* eslint-disable react-native/no-inline-styles */
import {Dimensions, StatusBar, StyleSheet} from 'react-native';
import React from 'react';
import Item from './Components/Item';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';

const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: 5 * height,
    backgroundColor: 'black',
  },
});

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

const data = [
  {
    id: 0,
    image:
      'https://images.pexels.com/photos/1525423/pexels-photo-1525423.jpeg?auto=compress&cs=tinysrgb&w=800',
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
      'https://images.pexels.com/photos/157675/fashion-men-s-individuality-black-and-white-157675.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 4,
    image:
      'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 5,
    image:
      'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 6,
    image:
      'https://images.pexels.com/photos/532220/pexels-photo-532220.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

const ChanelScroll = () => {
  const y = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler(event => {
    y.value = event.contentOffset.y;
  });
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <StatusBar hidden />
      <AnimatedScrollView
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
      </AnimatedScrollView>
    </GestureHandlerRootView>
  );
};

export default ChanelScroll;
