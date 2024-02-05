import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../../globals/constants/Colors';
import {FONTS} from '../../../globals/constants/Fonts';

const {primaryColor, blackColor, whiteColor, lightTextColor} = COLORS;
const {Inter_Medium, Inter_Semi_Bold, Inter_Bold, Inter_Regular} = FONTS;
const DetailsHeading = ({heading, length, style}) => {
  return (
    <>
      <Text style={[styles.eventName, {...style}]}>
        {heading}{' '}
        {length != undefined && (
          <Text style={styles.lengthText}>{`(${length})`}</Text>
        )}
      </Text>
    </>
  );
};

export default DetailsHeading;

const styles = StyleSheet.create({
  eventName: {
    color: blackColor,
    fontFamily: Inter_Bold,
    fontSize: 15,
  },
  lengthText: {
    fontSize: 15,
    fontFamily: Inter_Medium,
    color: lightTextColor,
  },
});
