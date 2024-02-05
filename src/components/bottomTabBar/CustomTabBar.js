import {Animated, StyleSheet, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {HEIGHT, WIDTH} from '../../../globals/constants/Styles';
import TabBarButton from './TabBarButton';
import {COLORS} from '../../../globals/constants/Colors';
import {useSelector} from 'react-redux';

export const CustomTabBar = props => {
  const appType = useSelector(store => store.module.currentAppType);
  const TabButtonWidth = WIDTH / props.state.routes.length;
  const TabAnimation = useRef(new Animated.ValueXY()).current;

  useEffect(() => {
    Animated.timing(TabAnimation, {
      useNativeDriver: true,
      toValue: {x: props.state.index * TabButtonWidth, y: 0},
      duration: 300,
      delay: 50,
    }).start();
  }, [props.state.index]);

  return (
    <Animated.View
      style={[
        styles.TabBarContainer,
        {backgroundColor: COLORS.primaryColor[appType]},
      ]}>
      {props.state.routes.map((route, i) => {
        const {options} = props.descriptors[route.key];
        const focused = props.state.index === i;

        const onPress = () => {
          const event = props.navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!focused && !event.defaultPrevented) {
            props.navigation.navigate(route.name);
          }
        };

        return (
          <TabBarButton
            key={i}
            icon={options?.tabBarIcon()}
            focused={focused}
            onPress={onPress}
            buttonSize={TabButtonWidth}
          />
        );
      })}

      {/* Animated Selected Tab  */}
      <Animated.View
        style={[
          styles.SelectedTabContainer,
          {
            width: TabButtonWidth,
            transform: [...TabAnimation.getTranslateTransform()],
          },
        ]}>
        {/* Left Round Corner */}
        <View
          style={[
            styles.RoundCorners,
            {
              borderTopLeftRadius: 15,
              transform: [{rotate: '57deg'}],
              backgroundColor: COLORS.primaryColor[appType],
            },
          ]}
        />

        {/* Middle White Circle */}
        <View style={styles.SelectedTab} />

        {/* Right Round Corner */}
        <View
          style={[
            styles.RoundCorners,
            {
              borderTopRightRadius: 15,
              transform: [{rotate: '-57deg'}],
            },
          ]}
        />
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  TabBarContainer: {
    width: WIDTH,
    height: HEIGHT * 0.08,
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 10,
    // paddingTop: 5,
  },
  SelectedTabContainer: {
    position: 'absolute',
    height: '100%',
    top: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: -1,
    overflow: 'hidden',
  },
  SelectedTab: {
    width: 65,
    padding: 8,
    aspectRatio: 1 / 1,
    borderBottomRightRadius: 32,
    borderTopLeftRadius: 40,
    transform: [{rotate: '45deg'}],
    top: -32.5,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1,
    backgroundColor: COLORS.whiteColor,
  },
  RoundCorners: {
    width: 30,
    aspectRatio: 1 / 1,
  },
});
