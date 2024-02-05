import {Animated, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {COLORS} from '../../../globals/constants/Colors';
import {useSelector} from 'react-redux';

export default TabBarButton = ({icon, onPress, focused, buttonSize}) => {
  const appType = useSelector(store => store.module.currentAppType);

  const Animation = useRef(new Animated.Value(0)).current;
  const AnimationUp = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(Animation, {
      toValue: focused ? 1 : 0,
      useNativeDriver: true,
      duration: 300,
    }).start(
      Animated.spring(AnimationUp, {
        toValue: focused ? 1 : 0,
        useNativeDriver: true,
        delay: 200,
        friction: 7,
      }).start(),
    );
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={[styles.TabButtonView, {width: buttonSize}]}>
      {/* Active Icon */}
      <Animated.View
        style={[
          styles.Icon,
          {
            backgroundColor: COLORS.primaryColor[appType],
            transform: [
              {
                translateY: AnimationUp.interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, -30],
                }),
              },
            ],
          },
          !focused && {opacity: 0},
        ]}>
        {icon}
      </Animated.View>

      {/* Deactive Icon */}
      <Animated.View
        style={[
          styles.Icon,
          {
            backgroundColor: COLORS.primaryColor[appType],
            position: 'absolute',
            transform: [
              {
                translateY: Animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 20],
                }),
              },
            ],
            opacity: Animation.interpolate({
              inputRange: [0.3, 1],
              outputRange: [1, 0],
            }),
          },
        ]}>
        {icon}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  TabButtonView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  Icon: {
    width: 50,
    aspectRatio: 1 / 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 60,
  },
});
