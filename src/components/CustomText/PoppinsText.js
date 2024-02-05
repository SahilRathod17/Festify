import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {FONTS} from '../../../globals/constants/Fonts';
import {COLORS} from '../../../globals/constants/Colors';

const {
  Inter_Bold,
  Inter_Semi_Bold,
  Poppins_Bold_Italic,
  Inter_Medium,
  Inter_Regular,
} = FONTS;
const {blackColor} = COLORS;

const PoppinsText = props => {
  const {fontType} = props;
  // const fontType ='Medium'
  return (
    <>
      <Text style={[styles[fontType?.toLowerCase()], props?.style]}>
        {props.children}
      </Text>
      {/* <Text style={[styles['regular'],props?.style]}>{props.children}</Text> */}
    </>
  );
};

export default PoppinsText;

const styles = StyleSheet.create({
  bold: {
    fontFamily: Inter_Bold,
    fontSize: 15,
    includeFontPadding: false,
    color: blackColor,
  },
  italic: {
    fontFamily: Inter_Semi_Bold,
    fontSize: 15,
    includeFontPadding: false,
    color: blackColor,
  },
  italicbold: {
    fontFamily: Poppins_Bold_Italic,
    fontSize: 15,
    includeFontPadding: false,
    color: blackColor,
  },
  medium: {
    fontFamily: Inter_Medium,
    fontSize: 15,
    includeFontPadding: false,
    color: blackColor,
  },
  regular: {
    fontFamily: Inter_Regular,
    fontSize: 15,
    includeFontPadding: false,
    color: blackColor,
  },
});
