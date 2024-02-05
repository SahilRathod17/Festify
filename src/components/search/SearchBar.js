import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {FONTS} from '../../../globals/constants/Fonts';
import {useSelector} from 'react-redux';
import {EvilIcons} from '../../../globals/constants/Icons';
import {TextInput} from 'react-native-paper';
import { COLORS } from '../../../globals/constants/Colors';
import { WIDTH } from '../../../globals/constants/Styles';

const {primaryColor, blackColor, whiteColor, lightTextColor} = COLORS;

const SearchBar = props => {
  const appType = useSelector(store => store.module.currentAppType);
  const {value, setValue} = props;
  return (
    <>
      {/* Search an Event */}
      <TextInput
        mode="outlined"
        value={value}
        onChangeText={text => setValue(text)}
        style={styles.formInputFields}
        activeUnderlineColor={'transparent'}
        underlineColor="transparent"
        outlineColor="transparent"
        placeholder="Search"
        returnKeyType="next"
        activeOutlineColor={blackColor}
        textColor={blackColor}
        theme={{roundness: 10}}
        right={
          <TextInput.Icon
            icon={() => (
              <EvilIcons
                name="search"
                size={30}
                color={primaryColor[appType]}
              />
            )}
            color={primaryColor[appType]}
            onPress={() => {
              console.log('Search Presseddd !!!');
            }}
          />
        }
      />
    </>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  formInputFields: {
    width: WIDTH * 0.9,
    height: 50,
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: lightTextColor,
    backgroundColor: whiteColor,
    color: lightTextColor,
  },
});
