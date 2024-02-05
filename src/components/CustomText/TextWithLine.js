import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {STYLES} from '../../../globals/constants/Styles';
import {COLORS} from '../../../globals/constants/Colors';
const {blackColor} = COLORS;
const TextWithLine = props => {
  const {text} = props;
  return (
    <View
      style={{flexDirection: 'row', alignItems: 'center', marginVertical: 10}}>
      <View
        style={[
          styles.line,
          {backgroundColor: props?.textColor ? props?.textColor : blackColor},
        ]}
      />
      <View>
        <Text
          style={[
            styles.textBetweenLine,
            {
              color: props?.textColor ? props?.textColor : blackColor,
              fontSize: props?.fontSize ? props?.fontSize : 15,
            },
          ]}>
          {text}
        </Text>
      </View>
      <View
        style={[
          styles.line,
          {backgroundColor: props?.textColor ? props?.textColor : blackColor},
        ]}
      />
    </View>
  );
};

export default TextWithLine;

const styles = StyleSheet.create({
  line: {
    flex: 1,
    height: 2,
    backgroundColor: blackColor,
  },
  textBetweenLine: {
    fontWeight: '600',
    fontSize: 10,
    color: blackColor,
    textAlign: 'center',
    marginHorizontal: 10,
  },
});
