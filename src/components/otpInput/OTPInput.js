import React, {useState, useRef, useEffect} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {COLORS} from '../../../globals/constants/Colors';
import {HEIGHT, SHADOW} from '../../../globals/constants/Styles';
import {FONTS} from '../../../globals/constants/Fonts';

const OtpInput = props => {
  let length = props.length ? props.length : 4;
  const [otp, setOtp] = useState(Array(length).fill(''));
  const inputRefs = useRef(Array(length).fill(null));
  useEffect(() => {
    props.changeOTPText(otp.join(''));
  }, [otp]);
  const handleInputChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (index < length - 1 && value !== '') {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = index => {
    if (index > 0) {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          ref={input => (inputRefs.current[index] = input)}
          style={styles.input}
          value={digit}
          on
          keyboardType="numeric"
          maxLength={1}
          onChangeText={value => handleInputChange(value, index)}
          onKeyPress={({nativeEvent}) => {
            if (nativeEvent.key === 'Backspace') {
              handleBackspace(index);
            }
          }}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  input: {
    width: '20%',
    height: HEIGHT * 0.1,
    margin: 5,
    // borderWidth: 2,
    // borderColor: primaryColor,
    alignSelf: 'center',
    // paddingLeft: 5,
    textAlign: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.whiteColorLight,
    backgroundColor: COLORS.whiteColorLight,
    fontSize: 18,
    fontWeight: '500',
    fontFamily: FONTS.Inter_Bold,
    color: COLORS.blackColor,
    ...SHADOW,
  },
});

export default OtpInput;
