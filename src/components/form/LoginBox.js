import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {COLORS} from '../../../globals/constants/Colors';
import {TextInput} from 'react-native-paper';
import {HEIGHT, WIDTH, SHADOW} from '../../../globals/constants/Styles';
import {Ionicons} from '../../../globals/constants/Icons';
import {useSelector} from 'react-redux';
import {FONTS} from '../../../globals/constants/Fonts';

const {
  primaryColor,
  whiteColor,
  blackColor,
  whiteColorLight,
  lightTextColor,
  codes,
} = COLORS;

const LoginBox = props => {
  const {loading, appType, onPasswordReset} = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [changed, setChanged] = useState(false);
  const studentSignIn = appType == 'Student' ? true : false;
  const [touched, setTouched] = useState({email: false, password: false});
  const errorObj = {
    email: '',
    password: '',
  };
  const [errors, setErrors] = useState(errorObj);

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleBlur = values => {
    let touchedObj = {...touched};
    touchedObj[values] = true;
    setTouched(touchedObj);
  };

  const validEmail = email => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
  };
  const validPassword = password => {
    return password.match(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    );
  };

  useEffect(() => {
    // if(edit){
    handleErrors();
    // }
  }, [email, password]);

  const handleErrors = () => {
    if (email == '') {
      errorHandler('email', `*Email is Required*`);
    } else if (!validEmail(email)) {
      errorHandler('email', `*Invalid Email*`);
    } else if (password == '') {
      errorHandler('password', `*Password is Required*`);
    } else if (!validPassword(password)) {
      errorHandler(
        'password',
        `*Password Must Contain Minimum 8 & Maximum 20 Characters, One UpperCase, One Lowercase & One Special Character*`,
      );
    } else {
      setErrors(errorObj);
      setChanged(true);
      return;
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

  return (
    <>
      {/* <View style={[styles.container,{backgroundColor: studentSignIn ? primaryColorStudents :primaryColorTeachers}]}> */}
      <View style={styles.formLayout}>
        <View style={{marginVertical: '10%'}}>
          <Text style={styles.heading}>
            {appType}
            {'\n'}
            <Text style={styles.subHeading}>
              Enter your email below to login
            </Text>
          </Text>
        </View>

        <View style={{marginTop: '5%'}}>
          {/* Email of Institute */}
          <TextInput
            mode="outlined"
            ref={emailRef}
            value={email}
            onChangeText={text => setEmail(text)}
            onBlur={() => handleBlur('email')}
            onSubmitEditing={() => passwordRef.current.focus()}
            style={styles.formInputFields}
            activeUnderlineColor={'transparent'}
            underlineColor="transparent"
            outlineColor="transparent"
            placeholder="name@example.com"
            returnKeyType="next"
            activeOutlineColor={blackColor}
            textColor={blackColor}
            // style={styles.inputFields}
            theme={{roundness: 20}}
          />
          {/* Email Error */}
          {touched.email && errors.email != '' && (
            <Text style={styles.errorText}>{errors.email}</Text>
          )}
          {/* Password of Institute */}
          <TextInput
            mode="outlined"
            ref={passwordRef}
            value={password}
            onChangeText={text => setPassword(text)}
            onBlur={() => handleBlur('password')}
            onSubmitEditing={() => Keyboard.dismiss()}
            secureTextEntry={!showPassword}
            style={styles.formInputFields}
            activeUnderlineColor={'transparent'}
            underlineColor="transparent"
            outlineColor="transparent"
            placeholder="Password"
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
          {/* Password Error */}
          {touched.password && errors.password != '' && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}

          <TouchableOpacity
            onPress={() => props.onSignIn({email: email, password: password})}
            disabled={loading || !changed}
            style={[
              styles.AddButton,
              {
                opacity: loading || !changed ? 0.5 : 1,
                backgroundColor: primaryColor[appType],
                shadowColor: primaryColor[appType],
              },
            ]}>
            {loading ? (
              <ActivityIndicator color={whiteColor} size={'large'} />
            ) : (
              <Text style={styles.AddButtonText}>Login</Text>
            )}
          </TouchableOpacity>

          <View
            style={{flexDirection: 'row', alignSelf: 'center', marginTop: 10}}>
            <Text style={[styles.AddButtonText, {fontSize: 12}]}>
              Forgot Password ?{' '}
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              disabled={loading}
              onPress={() => onPasswordReset()}>
              <Text
                style={[
                  styles.AddButtonText,
                  {color: primaryColor[appType], fontSize: 12},
                ]}>
                Reset Here{' '}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* </View> */}
    </>
  );
};

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
    width: '70%',
  },
  formLayout: {
    flex: 1,
    height: HEIGHT * 0.65,
    backgroundColor: 'red',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    borderColor: 'transparent',
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
    marginLeft: '3%',
  },
  AddButton: {
    alignSelf: 'center',
    width: WIDTH * 0.75,
    padding: 10,
    alignItems: 'center',
    borderRadius: 20,
    marginVertical: 5,
    ...SHADOW,
  },
  AddButtonText: {
    fontSize: 15,
    color: blackColor,
    fontFamily: FONTS.Inter_Medium,
    ...SHADOW,
  },
});

export default LoginBox;
