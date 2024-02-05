import {StyleSheet, Platform, Dimensions} from 'react-native';
import {COLORS} from './Colors';

export const WIDTH = Dimensions.get('window').width;
export const HEIGHT = Dimensions.get('window').height;

export const IS_ANDROID = Platform.OS == 'android' ? true : false;
const {primaryColor, blackColor, whiteColorLight, whiteColor} = COLORS;
export const SHADOW = {
  shadowColor: '#161616',
  shadowOffset: {
    width: 5,
    height: 5,
  },
  shadowOpacity: IS_ANDROID ? 0.25 : 0.15,
  shadowRadius: IS_ANDROID ? 3.5 : 2.5,
  elevation: 10,
};

export const STYLES = StyleSheet.create({
  SafeAreaViewContainer: {
    flex: 0,
  },
  mainContainer: {
    flex: 1,
  },
  customHeaderView: {
    height: HEIGHT * 0.09,
    width: WIDTH,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.whiteColorLight,
    paddingHorizontal: 15,
    // marginBottom:5
  },
  LoginBox: {
    width: WIDTH * 0.85,
    backgroundColor: blackColor,
    borderRadius: 10,
    alignSelf: 'center',
    ...SHADOW,
  },
  dashBoardCrdContainer: {
    marginHorizontal: 5,
    height: HEIGHT * 0.2,
    width: WIDTH * 0.31,
    borderRadius: 10,
    backgroundColor: primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOW,
  },
  profileImageView: {
    height: HEIGHT * 0.08,
    width: HEIGHT * 0.08,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    backgroundColor: whiteColorLight,
    ...SHADOW,
  },
  icon: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  title: {
    fontWeight: '600',
    fontSize: 18,
    color: blackColor,
    textAlign: 'center',
  },
  roundedEndBox: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: blackColor,
    borderRadius: 20,
    width: '80%',
    ...SHADOW,
  },
});
