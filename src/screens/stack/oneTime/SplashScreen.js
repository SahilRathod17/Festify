import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {navigate} from '../../../navigation/RootNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS} from '../../../../globals/constants/Colors';
import {FONTS} from '../../../../globals/constants/Fonts';

const SplashScreen = () => {
  const user = useSelector(store => store.user);
  const onBoarding = useSelector(store => store.tutorials);
  const dispatch = useDispatch();

  const nextScreen = async () => {
    try {
      setTimeout(() => {
        if (onBoarding.onBoardingTutorial == true) {
          dispatch({type: 'SPLASH_DISPLAY'});
          navigate('OnBoarding');
        } else if (user.isLoggedIn == false) {
          dispatch({type: 'SPLASH_DISPLAY'});
          navigate('AppType');
        } else {
          dispatch({type: 'SPLASH_DISPLAY'});
          navigate('Tabs', {screen: 'Home'});
        }
      }, 1500);
    } catch (e) {
      console.log('ERROR IN SPLASHSCREEN : ', e);
      // saving error
    }
  };
  useEffect(() => {
    nextScreen();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.whiteColor,
      }}>
      <Text style={{fontFamily: FONTS.Inter_Bold, color: COLORS.blackColor}}>
        SplashScreen
      </Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
