import {
  StyleSheet,
  SafeAreaView,
  Text,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {HEIGHT, WIDTH, STYLES, SHADOW} from '../../globals/constants/Styles';
import SplashScreen from '../screens/stack/oneTime/SplashScreen';
import Login from '../screens/stack/Login/Login';
import {COLORS} from '../../globals/constants/Colors';
import Home from '../screens/bottom/Home';
import {Ionicons, SnackbarIcons} from '../../globals/constants/Icons';
import {IMAGES} from '../../globals/constants/Images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import OnBoarding from '../screens/stack/oneTime/OnBoarding';
import {Snackbar} from 'react-native-paper';
import {SnackbarClose} from '../redux/action';

import CustomHeader from '../components/CustomHeader';
import {CustomTabBar} from '../components/bottomTabBar/CustomTabBar';
import CustomTopTab from '../components/topTabBar/CustomTopTab';
import AppType from '../screens/stack/Login/AppType';
import ForgotPassword from '../screens/stack/Login/ForgotPassword';
import CreateEvent from '../screens/bottom/CreateEvent';
import Profile from '../screens/bottom/Profile';
import EventsList from '../screens/stack/Events/EventsList';
import EventDetails from '../screens/stack/Events/EventDetails';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

const NavigationHandler = () => {
  //TO CLEAR CACHE MEMORY

  // const clearAsyncStorage = async () => {
  //   AsyncStorage.clear();
  // };
  // useEffect(() => {
  //   clearAsyncStorage();
  // }, []);

  const dispatch = useDispatch();

  const user = useSelector(store => store.user);
  const onBoarding = useSelector(store => store.tutorials);
  const snackbarContent = useSelector(store => store.snackbar);
  const Splash = useSelector(store => store.splash.splashDisplay);

  // let icon = (
  //   <Feather name="check-circle" size={25} color={COLORS.whiteColorLight} />
  // );
  return (
    <>
      <SafeAreaView style={STYLES.SafeAreaViewContainer} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={{flex: 1}}>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
          }}>
          {Splash && <Stack.Screen name="Splash" component={SplashScreen} />}
          {onBoarding.onBoardingTutorial && (
            <Stack.Screen name="OnBoarding" component={OnBoarding} />
          )}
          {user.isLoggedIn == false && (
            <>
              <Stack.Screen name="AppType" component={AppType} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="ForgotPass" component={ForgotPassword} />
            </>
          )}
          {user.isLoggedIn == true && (
            <>
              <Stack.Screen name="Tabs" component={TabNavigator} />
              <Stack.Screen name="EventsList" component={EventsList} />
              <Stack.Screen name="EventDetails" component={EventDetails} />
            </>
          )}

          {/* {user.isLoggedIn == false && (
          <Stack.Screen name="Tabs" component={TabNavigator} />
        )} */}
        </Stack.Navigator>
      </KeyboardAvoidingView>
      <Snackbar
        visible={snackbarContent?.visible}
        icon={() => {
          return SnackbarIcons(snackbarContent?.code);
        }}
        rippleColor={'transparent'}
        onIconPress={() => {}}
        onDismiss={() => dispatch(SnackbarClose())}
        duration={2500}
        elevation={3}
        style={{
          alignSelf: 'center',
          width: WIDTH * 0.85,
          backgroundColor: snackbarContent?.color
            ? snackbarContent.color
            : COLORS.codes[snackbarContent?.code],
          bottom: '5%',
        }}>
        <Text style={{color: COLORS.whiteColorLight}}>
          {snackbarContent?.message} {}
        </Text>
      </Snackbar>
    </>
  );
};

export default NavigationHandler;

const TabNavigator = ({navigation}) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
      initialRouteName="Home"
      tabBar={props => <CustomTabBar {...props} />}
      // ... other navigation options
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: focused => {
            return (
              <Ionicons
                name={focused ? 'home' : 'home-outline'}
                color={focused ? COLORS.whiteColorLight : COLORS.blackColor}
                size={30}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="CreateEvent"
        component={CreateEvent}
        options={{
          tabBarIcon: focused => {
            return (
              <Image
                source={IMAGES.announcement}
                style={{height: 30, width: 30, resizeMode: 'contain'}}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: focused => {
            return (
              <Image
                source={IMAGES.event}
                style={{height: 30, width: 30, resizeMode: 'contain'}}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const TopTabNavigator = ({navigation}) => {
  return (
    <TopTab.Navigator
      initialRouteName="Ongoing"
      tabBar={props => <CustomTopTab {...props} />}>
      <TopTab.Screen
        name="Ongoing"
        component={OnGoing}
        options={{title: 'Ongoing'}}
        listeners={({navigation, route}) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate({name: route.name, merge: true});
          },
        })}
      />
      <TopTab.Screen
        name="Upcoming"
        component={Upcoming}
        options={{title: 'Upcoming'}}
        listeners={({navigation, route}) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate({name: route.name, merge: true});
          },
        })}
      />
      <TopTab.Screen
        name="Finished"
        component={Finished}
        options={{title: 'Finished'}}
        listeners={({navigation, route}) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate({name: route.name, merge: true});
          },
        })}
      />
    </TopTab.Navigator>
  );
};

const styles = StyleSheet.create({});
