import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../../../globals/constants/Colors';
import {navigate} from '../../../navigation/RootNavigation';
import {useDispatch} from 'react-redux';
import {IMAGES} from '../../../../globals/constants/Images';
import {AppTypeAction} from '../../../redux/action';
import {FONTS} from '../../../../globals/constants/Fonts';
const {
  primaryColor,
  whiteColor,
  blackColor,
  whiteColorLight,
  greyColor,
  codes,
} = COLORS;

const AppType = () => {
  const dispatch = useDispatch();
  const modules = [
    {
      name: 'Student',
      icon: IMAGES['Student'].Login,
    },
    {
      name: 'Teacher',
      icon: IMAGES['Teacher'].Login,
    },
  ];
  const GoToLogin = person => {
    dispatch(AppTypeAction(person));
    navigate('Login');
  };
  return (
    <>
      {modules.map((item, index) => {
        return (
          <View
            key={index}
            style={{
              flex: 0.5,
              backgroundColor: primaryColor[item.name],
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.heading}>{item.name}</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{height: '75%', width: '90%'}}
              onPress={() => GoToLogin(item.name)}>
              <Image
                source={item.icon}
                style={{
                  height: '100%',
                  width: '100%',
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          </View>
        );
      })}
    </>
  );
};

export default AppType;

const styles = StyleSheet.create({
  heading: {
    fontSize: 30,
    textAlign: 'center',
    fontFamily: FONTS.Inter_Bold,
    color: blackColor,
  },
});
