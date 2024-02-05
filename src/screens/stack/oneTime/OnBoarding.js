import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {navigate} from '../../../navigation/RootNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {HEIGHT, WIDTH, STYLES} from '../../../../globals/constants/Styles';
import {onBoardingTutorial} from '../../../redux/action';
import {COLORS} from '../../../../globals/constants/Colors';
import {FONTS} from '../../../../globals/constants/Fonts';

const OnBoarding = props => {
  const dispatch = useDispatch();

  const handleGetStarted = async () => {
    dispatch(onBoardingTutorial(false));
    navigate('AppType');
  };

  const onboardingData = [
    {
      title: 'Welcome to App',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      //     image: require('./assets/onboarding1.png'),
    },
    {
      title: 'Explore Features',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      //     image: require('./assets/onboarding2.png'),
    },
    {
      title: 'Get Started',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      //     image: require('./assets/onboarding3.png'),
    },
  ];

  return (
    <FlatList
      data={onboardingData}
      horizontal
      pagingEnabled={true}
      renderItem={({item, index}) => {
        return (
          <View style={styles.slide} key={index}>
            {/* <Image source={item.image} style={styles.image} /> */}
            <Text style={styles.title}>ONBOARDING PAGE :{index + 1}</Text>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            {index === onboardingData.length - 1 && (
              <TouchableOpacity
                onPress={() => handleGetStarted()}
                style={styles.getStartedButton}>
                <Text style={styles.getStartedButtonText}>Get Started</Text>
              </TouchableOpacity>
            )}
          </View>
        );
      }}
    />
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    height: HEIGHT,
    width: WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.whiteColor,
    //     margin:5
  },
  image: {
    width: '80%',
    height: 200,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontFamily: FONTS.Inter_Bold,
    marginTop: 20,
    color: COLORS.blackColor,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 40,
    marginTop: 10,
    color: COLORS.blackColor,
  },
  getStartedButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 30,
  },
  getStartedButtonText: {
    color: COLORS.whiteColor,
    fontSize: 18,
    fontFamily: FONTS.Inter_Bold,
  },
});
