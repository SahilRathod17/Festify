// components/LoginScreen.js
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';

import React, {useEffect, useState, useCallback} from 'react';
import {navigate} from '../../../navigation/RootNavigation';

import Carousel from '../../../components/Carousel';
import {useDispatch, useSelector} from 'react-redux';
import {SnackbarOpen, loginAction} from '../../../redux/action';
import LoginBox from '../../../components/form/LoginBox';
import {COLORS} from '../../../../globals/constants/Colors';
import OtpInput from '../../../components/otpInput/OTPInput';
import ForgotPassword from './ForgotPassword';
import {HEIGHT, WIDTH} from '../../../../globals/constants/Styles';
import {Ionicons} from '../../../../globals/constants/Icons';
import {FONTS} from '../../../../globals/constants/Fonts';
import {navigationRef} from '../../../navigation/RootNavigation';
import {IMAGES} from '../../../../globals/constants/Images';
import {StudentSignIn, TeacherSignIn} from '../../../../globals/constants/APIs';
import {OpenSnackbar} from '../../../../globals/constants/Function';

const {primaryColor, blackColor} = COLORS;
const Login = () => {
  const [loading, setLoading] = useState(false);
  const [signIn, setSignIn] = useState(true);
  const [resetPassword, setResetPassword] = useState(false);
  const [studentSignIn, setStudentSignIn] = useState();

  const appType = useSelector(store => store.module.currentAppType);

  const SLogin = StudentSignIn();
  const Tlogin = TeacherSignIn();
  const handleSnackBar = OpenSnackbar();
  const dispatch = useDispatch();
  const handleLogin = async data => {
    setLoading(true);
    try {
      let response = '';
      if (appType == 'Student') {
        response = await SLogin(data);
      } else {
        response = await Tlogin(data);
      }
      console.log(response);
      if (response.status) {
        handleSnackBar(response.message, 200);
        dispatch(loginAction(response.data));
        setLoading(false);
        navigate('Tabs', {screen: 'Home'});
      } else {
        handleSnackBar(response?.message || response?.error, 200);
        setLoading(false);
      }
    } catch (e) {
      console.log(` Login Error :`, e);
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: primaryColor[appType]}}>
      <View
        style={[styles.container, {backgroundColor: primaryColor[appType]}]}>
        <View style={styles.headerContent}>
          {/* Back Button */}
          <TouchableOpacity
            onPress={() => navigationRef.current.goBack()}
            activeOpacity={0.5}
            //style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={30} color={blackColor} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            activeOpacity={0.5}
            //     style={{height: 40, width: 40}}
          >
            <Text style={styles.headerTitle}>Login</Text>
          </TouchableOpacity>
          <View style={{width: '10%'}} />
        </View>
        <Image
          source={IMAGES[appType].Login}
          style={{
            height: '75%',
            width: '100%',
            resizeMode: 'contain',
            position: 'absolute',
            bottom: 0,
          }}
        />
      </View>
      <LoginBox
        appType={appType}
        loading={loading}
        onSignIn={data => handleLogin(data)}
        onPasswordReset={() => navigate('ForgotPass')}
      />
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    height: HEIGHT * 0.35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    width: WIDTH,
    backgroundColor: 'transparent',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: HEIGHT * 0.1,
  },
  headerTitle: {
    fontSize: 25,
    color: blackColor,
    fontFamily: FONTS.Inter_Bold,
  },
});
