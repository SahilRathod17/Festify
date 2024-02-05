import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../../globals/constants/Colors';
import {FONTS} from '../../../globals/constants/Fonts';
const {blackColor, lightTextColor} = COLORS;
const {Inter_Semi_Bold, Inter_Regular} = FONTS;
const ListHeadings = ({title, rightText, onPressRight, style}) => {
  return (
    <View
      style={{
        paddingRight: 25,
        paddingLeft: 30,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        ...style,
      }}>
      <Text
        style={{
          color: blackColor,
          fontFamily: Inter_Semi_Bold,
          fontSize: 20,
        }}>
        {title}
      </Text>
      <TouchableOpacity onPress={() => onPressRight()}>
        <Text
          style={{
            color: lightTextColor,
            fontFamily: Inter_Regular,
            fontSize: 10,
          }}>
          {rightText ? rightText : 'View All'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ListHeadings;

const styles = StyleSheet.create({});
