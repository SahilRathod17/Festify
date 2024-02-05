import {Animated, View, TouchableOpacity, Text} from 'react-native';
import {HEIGHT, WIDTH, SHADOW} from '../../../globals/constants/Styles';
import {COLORS} from '../../../globals/constants/Colors';

const CustomTopTab = ({state, descriptors, navigation, position}) => {
  return (
    <View
      style={{
        height: HEIGHT * 0.06,
        width: WIDTH * 0.95,
        flexDirection: 'row',
        borderRadius: 30,
        alignSelf: 'center',
        backgroundColor: COLORS.primaryColor,
        // ...SHADOW
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const inputRange = state.routes.map((_, i) => i);
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map(i => (i === index ? 1 : 0.5)),
        });

        return (
          <TouchableOpacity
            key={index}
            activeOpacity={1}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[
              isFocused
                ? {
                    backgroundColor: COLORS.whiteColorLight,
                    height: '100%',
                    borderRadius: 30,
                    ...SHADOW,
                  }
                : {},
              {
                width: (WIDTH * 0.95) / state.routes.length,
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}>
            <Animated.Text
              style={{
                opacity,
                fontSize: 15,
                color: isFocused ? COLORS.primaryColor : COLORS.whiteColor,
                fontWeight: '700',
              }}>
              {label}
            </Animated.Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
export default CustomTopTab;
