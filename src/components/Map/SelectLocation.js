import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  PermissionsAndroid,
  Image,
  BackHandler,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {HEIGHT, WIDTH, SHADOW} from '../../../globals/constants/Styles';
import {COLORS} from '../../../globals/constants/Colors';

import Geolocation from 'react-native-geolocation-service';
import {Entypo, EvilIcons} from '../../../globals/constants/Icons';
import {IMAGES} from '../../../globals/constants/Images';

const {
  primaryColor,
  whiteColor,
  blackColor,
  whiteColorLight,
  greyColor,
  codes,
} = COLORS;

const SelectLocation = props => {
  const [loading, setLoading] = useState(true);
  const [myLocationText, setmyLocationText] = useState(false);
  const [position, setPosition] = useState({
    latitude: 20.5937,
    longitude: 78.9629,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });
  const getCord = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'Allow Location Permission.',
        },
      );
      if (granted === true || granted === PermissionsAndroid.RESULTS.GRANTED) {
        await Geolocation.getCurrentPosition(
          pos => {
            setPosition({
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
              latitudeDelta: 0.0421,
              longitudeDelta: 0.0421,
            });
            setLoading(false);
            // console.log(pos.coords);
            return pos.coords;
          },
          error => {
            setLoading(false);
            console.log(error.message);
          },
          {showLocationDialog: true, forceRequestLocation: true},
        );
        // console.warn("Permission Granted");
      } else {
        console.warn('Permission Denied');
      }
    } catch (err) {
      setLoading(false);
      console.warn(err);
    }
  };

  useEffect(() => {
    getCord();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const backAction = async () => {
        // console.log('Deleting an Item', removedItemsRef.current);
        let backPressed = props.onChangeMapView();
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }, []),
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator color={primaryColor} size={'large'} />
        </View>
      ) : (
        <>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            camera={{
              center: {
                latitude: position.latitude,
                longitude: position.longitude,
              },
              pitch: 45,
              heading: 90,
              zoom: 19,
            }}
            onPress={e =>
              setPosition({
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
                latitudeDelta: 0.0421,
                longitudeDelta: 0.0421,
              })
            }
            showsMyLocationButton={true}
            followsUserLocation={true}
            showsCompass={false}
            scrollEnabled={true}
            zoomEnabled={true}
            pitchEnabled={true}
            rotateEnabled={true}>
            <Marker
              draggable={true}
              style={styles.mapMarker}
              coordinate={position}>
              <Image
                source={IMAGES.locationPin}
                style={{width: '100%', height: '100%'}}
                resizeMode="contain"
              />
            </Marker>
          </MapView>
          {/* Save / Submit Button */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => props.getPosition(position)}
            style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Save</Text>
          </TouchableOpacity>

          {/* Get Current Location Button  */}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              getCord();
            }}
            style={styles.getlocation}>
            <View
              style={{
                borderRadius: 30,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: whiteColor,
                height: 25,
                width: 25,
              }}>
              <EvilIcons name="location" color={blackColor} size={25} />
            </View>
            <Text style={{fontSize: 12, fontWeight: '600', color: whiteColor}}>
              My Location
            </Text>
          </TouchableOpacity>

          {/* Close MapView  */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => props.onChangeMapView()}
            style={styles.CrossButton}>
            <Entypo name="circle-with-cross" color={primaryColor} size={25} />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default SelectLocation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: HEIGHT * 0.95,
    width: WIDTH * 0.9,
    overflow: 'hidden',
  },
  map: {
    // marginTop: '12%',
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  mapMarker: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
  },
  getlocation: {
    height: 30,
    width: 110,
    borderRadius: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 2,
    top: '1%',
    left: '2%',
    padding: 5,
    flexDirection: 'row',

    backgroundColor: primaryColor,
  },
  CrossButton: {
    height: 40,
    width: 40,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 2,
    right: '1%',
    top: '1%',
  },
  submitButton: {
    position: 'absolute',
    bottom: '5%',
    right: '7%',
    alignSelf: 'center',
    width: 'auto',
    padding: 10,
    backgroundColor: primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    zIndex: 2,
    ...SHADOW,
    shadowColor: primaryColor,
  },
  submitButtonText: {
    fontSize: 15,
    color: whiteColor,
    fontWeight: '800',
    paddingHorizontal: 10,
    ...SHADOW,
  },
});
