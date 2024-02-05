import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ScrollView,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import React, {useEffect, useState, useRef} from 'react';
import {COLORS} from '../../../../globals/constants/Colors';
import {WIDTH, SHADOW} from '../../../../globals/constants/Styles';
import {FONTS} from '../../../../globals/constants/Fonts';
import OtpInput from '../../../components/otpInput/OTPInput';
import {useDispatch, useSelector} from 'react-redux';
import {navigate, navigationRef} from '../../../navigation/RootNavigation';
import TextWithLine from '../../../components/CustomText/TextWithLine';
import {IMAGES} from '../../../../globals/constants/Images';
import {ForgotPasswordAPI} from '../../../../globals/constants/APIs';
import {SnackbarOpen} from '../../../redux/action';
import {OpenSnackbar} from '../../../../globals/constants/Function';

const {primaryColor, whiteColor, blackColor, lightTextColor, codes} = COLORS;
const ForgotPassword = props => {
  // Object for changing password ==> {newPassword : true,emailAddress :'USER EMAIL ADDRESS'}
  const forgotPass = ForgotPasswordAPI();
  const handleSnackBar = OpenSnackbar();
  const dispatch = useDispatch();
  const appType = useSelector(store => store.module.currentAppType);
  const [loading, setLoading] = useState(false);
  const newPassword = props?.route?.params?.newPassword == true ? true : false;
  const emailAddress =
    props?.route?.params?.emailAddress != undefined
      ? props?.route?.params?.emailAddress
      : '';

  const [email, setEmail] = useState(emailAddress);
  const [OTP, setOTP] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [emailComp, setEmailComp] = useState(
    newPassword != true ? true : false,
  );
  const [otpSent, setOtpSent] = useState(false);
  const [changePassword, setChangePassword] = useState(
    newPassword == true ? true : false,
  );
  const [changed, setChanged] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();
  const cpasswordRef = useRef();
  const [touched, setTouched] = useState({
    email: false,
    password: false,
    cpassword: false,
  });
  const errorObj = {
    email: '',
    password: '',
    cpassword: '',
  };
  const [errors, setErrors] = useState(errorObj);
  const handleBlur = values => {
    let touchedObj = {...touched};
    touchedObj[values] = true;
    setTouched(touchedObj);
  };
  const validEmail = email => {
    // ONLY ALLOWS COLLEGE EMAILS
    return email.match(
      '^[a-zA-Z0-9._%+-]+@(?!gmail.com)(?!yahoo.com)(?!hotmail.com)(?!yahoo.co.in)(?!aol.com)(?!live.com)(?!outlook.com)[a-zA-Z0-9_-]+.[a-zA-Z0-9-.]{2,61}$',
    );
  };
  const validPassword = password => {
    return password.match(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    );
  };

  useEffect(() => {
    if (emailComp) {
      handleErrors('emailComp');
    } else if (otpSent) {
      handleErrors('otpSent');
    } else {
      handleErrors();
    }
  }, [confirmPassword, password, email, OTP]);
  const handleErrors = comp => {
    if (comp == 'emailComp') {
      if (email == '') {
        errorHandler('email', `*Email is Required*`);
      } else if (!validEmail(email)) {
        errorHandler(
          'email',
          `*Invalid Email, Only College Emails are allowed*`,
        );
      } else {
        setErrors(errorObj);
        setChanged(true);
        return;
      }
    } else if (comp == 'otpSent') {
      if (OTP.length < 4) {
        setChanged(false);
      } else {
        setChanged(true);
      }
    } else {
      if (password == '') {
        errorHandler('password', `*Password is Required*`);
      } else if (confirmPassword != password) {
        errorHandler(
          'cpassword',
          `*Password and Confirm Password does not Match*`,
        );
      } else if (!validPassword(confirmPassword)) {
        errorHandler(
          'cpassword',
          `*Password Must Be Between 8-20 Characters with One UpperCase, Lowercase & A Special Character*`,
        );
      } else {
        setErrors(errorObj);
        setChanged(true);
        return;
      }
    }
  };
  const errorHandler = (key, value) => {
    let newobj = {
      ...errorObj,
    };
    newobj[key] = value;
    setErrors(newobj);
    setChanged(false);
    return;
  };
  const handleSubmit = async () => {
    setLoading(true);
    if (emailComp) {
      let obj = {
        email: email,
        password: '123',
      };
      let res = await forgotPass(appType, obj);
      if (res.status) {
        setEmailComp(false);
        setOtpSent(true);
        setChanged(false);
        handleSnackBar(`OTP sent to ${email}`, 200);
      } else {
        handleSnackBar(res.message, 400);
      }
    } else if (otpSent) {
      if (checkOTP()) {
        setOtpSent(false);
        setChangePassword(true);
        setChanged(false);
      } else {
        setTimeout(() => {
          setLoading(false);
          handleSnackBar('Invalid OTP', 400);
        }, 1500);
      }
    } else {
      let obj = {
        email: email,
        password: password,
      };
      try {
        let res = await forgotPass(appType, obj);
        if (res.status) {
          handleSnackBar(res.message, 200);
          setLoading(false);
          navigate('Login');
        } else {
          handleSnackBar(res.message, 400);
        }
      } catch (e) {
        console.log('Error At Forgot Password :', e);
        handleSnackBar('Something Went Wrong!!', 400);
      }

      // navigate('Login');
    }
    setLoading(false);
  };
  const checkOTP = () => {
    if (OTP == '1234') {
      return true;
    }
    return false;
  };
  const onBackPress = () => {
    if (emailComp) {
      navigate('Login');
    } else if (otpSent) {
      setEmailComp(true);
      setOtpSent(false);
    } else {
      setOtpSent(true);
      setChangePassword(false);
    }
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: whiteColor}}>
      <View style={styles.formLayout}>
        <View style={{flex: 0.4, marginVertical: '15%'}}>
          {emailComp ? (
            <Text
              style={{
                fontSize: 80,
                textAlign: 'center',
                fontFamily: FONTS.Inter_Bold,
                color: primaryColor[appType],
              }}>
              @
            </Text>
          ) : (
            <Image
              source={otpSent ? IMAGES[appType].Otp : IMAGES[appType].Lock}
              style={{
                height: otpSent ? 150 : 100,
                width: otpSent ? 150 : 100,
                resizeMode: 'contain',
              }}
            />
          )}
        </View>
        <View style={{marginVertical: '5%'}}>
          <Text style={styles.heading}>
            {emailComp
              ? 'Forgot Password'
              : otpSent
              ? 'OTP Sent'
              : 'Reset Password'}
          </Text>
          <Text style={[styles.subHeading, {width: WIDTH * 0.7}]}>
            {emailComp
              ? 'Enter your Registered email'
              : otpSent
              ? `Please Enter the OTP Sent on ${email}`
              : ''}
          </Text>
        </View>
        {emailComp && (
          <>
            {/* Email of Institute */}
            <TextInput
              mode="outlined"
              ref={emailRef}
              value={email}
              onChangeText={text => setEmail(text)}
              onBlur={() => handleBlur('email')}
              style={styles.formInputFields}
              activeUnderlineColor={'transparent'}
              underlineColor="transparent"
              outlineColor="transparent"
              placeholder="Enter Your Email"
              returnKeyType="next"
              activeOutlineColor={blackColor}
              textColor={blackColor}
              theme={{roundness: 20}}
            />
            <Text
              style={[styles.subHeading, {width: '80%', marginVertical: 5}]}>
              *Note : If your email is not Registered, Contact your Institute's
              Admin, and only College Emails are allowed here*
            </Text>
          </>
        )}
        {otpSent && (
          <>
            <OtpInput length={4} changeOTPText={otp => setOTP(otp)} />
          </>
        )}
        {changePassword && (
          <>
            {/* Password  */}
            <TextInput
              mode="outlined"
              ref={passwordRef}
              value={password}
              onChangeText={text => setPassword(text)}
              onBlur={() => handleBlur('password')}
              secureTextEntry={true}
              style={styles.formInputFields}
              activeUnderlineColor={'transparent'}
              underlineColor="transparent"
              outlineColor="transparent"
              placeholder="New Password"
              returnKeyType="next"
              activeOutlineColor={blackColor}
              textColor={blackColor}
              maxLength={20}
              // style={styles.inputFields}
              theme={{roundness: 20}}
            />
            {touched.password && errors.password != '' && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
            {/* Confirm Password */}
            <TextInput
              mode="outlined"
              ref={cpasswordRef}
              value={confirmPassword}
              onChangeText={text => setConfirmPassword(text)}
              onBlur={() => handleBlur('cpassword')}
              secureTextEntry={!showPassword}
              style={styles.formInputFields}
              activeUnderlineColor={'transparent'}
              underlineColor="transparent"
              outlineColor="transparent"
              placeholder="Confirm Password"
              returnKeyType="next"
              activeOutlineColor={blackColor}
              textColor={blackColor}
              maxLength={20}
              // style={styles.inputFields}
              theme={{roundness: 20}}
              right={
                <TextInput.Icon
                  icon={showPassword ? 'eye' : 'eye-off'}
                  color={blackColor}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
            />
            {touched.cpassword && errors.cpassword != '' && (
              <Text style={styles.errorText}>{errors.cpassword}</Text>
            )}
          </>
        )}

        <TouchableOpacity
          onPress={() => handleSubmit()}
          disabled={loading || (changePassword == true && changed == false)}
          style={[
            styles.submitButton,
            {
              opacity:
                loading ||
                (emailComp == true && changed == false) ||
                (otpSent == true && changed == false) ||
                (changePassword == true && changed == false)
                  ? 0.5
                  : 1,
              backgroundColor: primaryColor[appType],
              shadowColor: primaryColor[appType],
            },
          ]}>
          {loading ? (
            <ActivityIndicator color={whiteColor} size={'large'} />
          ) : (
            <Text style={styles.submitButtonText}>
              {emailComp ? 'Send OTP' : otpSent ? 'Submit' : 'Reset Password'}
            </Text>
          )}
        </TouchableOpacity>
        {newPassword != true && (
          <>
            <View style={{width: '70%'}}>
              <TextWithLine
                text={'OR CONTINUE WITH'}
                textColor={lightTextColor}
                fontSize={10}
              />
            </View>

            <TouchableOpacity
              onPress={() => navigationRef.current.goBack()}
              disabled={loading}
              style={{
                alignSelf: 'center',
                width: WIDTH * 0.75,
                padding: 10,
                alignItems: 'center',
                borderRadius: 20,
                marginVertical: 5,
                backgroundColor: whiteColor,
                borderColor: blackColor,
                borderWidth: 0.5,
              }}>
              <Text
                style={[
                  styles.submitButtonText,
                  {color: primaryColor[appType]},
                ]}>
                Back To Login
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  heading: {
    fontSize: 30,
    textAlign: 'center',
    fontFamily: FONTS.Inter_Bold,
    color: blackColor,
  },
  subHeading: {
    fontSize: 12,
    textAlign: 'center',
    fontFamily: FONTS.Inter_Regular,
    color: lightTextColor,
  },
  formLayout: {
    flex: 1,
    backgroundColor: whiteColor,
    alignItems: 'center',
    ...SHADOW,
  },
  formInputFields: {
    width: WIDTH * 0.75,
    height: 50,
    alignSelf: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: lightTextColor,
    margin: 5,
    backgroundColor: whiteColor,
    color: lightTextColor,
  },
  errorText: {
    fontSize: 14,
    color: codes[400],
    fontFamily: FONTS.Inter_Semi_Bold,
    alignSelf: 'center',
    width: '70%',
  },
  submitButton: {
    alignSelf: 'center',
    width: WIDTH * 0.75,
    padding: 10,
    alignItems: 'center',
    borderRadius: 20,
    marginVertical: 5,
    marginTop: 10,
    ...SHADOW,
  },
  submitButtonText: {
    fontSize: 15,
    color: blackColor,
    fontFamily: FONTS.Inter_Medium,
    ...SHADOW,
  },
});
