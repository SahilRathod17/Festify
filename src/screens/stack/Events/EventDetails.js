import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS} from '../../../../globals/constants/Colors';
import {FONTS} from '../../../../globals/constants/Fonts';
import Carousel from '../../../components/Carousel';
import {FlashList} from '@shopify/flash-list';
import {HEIGHT, WIDTH, SHADOW} from '../../../../globals/constants/Styles';
import {IMAGES} from '../../../../globals/constants/Images';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {
  AntDesign,
  EvilIcons,
  Ionicons,
} from '../../../../globals/constants/Icons';
import {useSelector} from 'react-redux';
import ProfileImages from '../../../components/list/ProfileImages';
import EventsCard from '../../../components/cards/EventsCard';
import {navigationRef} from '../../../navigation/RootNavigation';
import DetailsHeading from '../../../components/CustomText/DetailsHeading';

const {primaryColor, blackColor, whiteColor, lightTextColor} = COLORS;
const {Inter_Medium, Inter_Semi_Bold, Inter_Bold, Inter_Regular} = FONTS;

const EventDetails = () => {
  const appType = useSelector(store => store.module.currentAppType);
  const event_host = [
    {
      _id: 1,
      profileImage: IMAGES.LDRP,
      name: 'Patel Devarshi',
    },
    {
      _id: 2,
      profileImage: IMAGES.LDRP,
      name: 'Miral Kadia',
    },
    {
      _id: 3,
      profileImage: IMAGES.LDRP,
      name: 'Kevin Miyani',
    },
    {
      _id: 4,
      profileImage: IMAGES.LDRP,
      name: 'Sahil Rathod',
    },
  ];
  const event_coordinator = [
    {
      _id: 20,
      profileImage: IMAGES.LDRP,
      name: 'Shreya Patel',
    },
  ];
  const eventList = [
    {
      id: 1,
      eventImage: [
        'https://content.jdmagicbox.com/comp/gandhinagar-gujarat/e8/9999pxx79.xx79.110610112812.e8e8/catalogue/ldrp-institute-of-technology-and-research-gandhinagar-sector-15-gandhinagar-gujarat-mba-institutes-o8hvqnk0om.jpg?clr=',
      ],
      event_name: 'Xenesis On the Rockksssssfbhffbdhfabshedfiu',
      college_name: 'LDRP ITR GAndhinagar Bbhai bhaiiii aai jaajo',
      event_time: '07:00 PM',
      event_date: '25 FEB',
    },
    {
      id: 2,
      eventImage: [
        'https://content.jdmagicbox.com/comp/gandhinagar-gujarat/s3/9999pxx79.xx79.110526135636.x2s3/catalogue/gandhinagar-institute-of-technology-kalol-gandhinagar-gujarat-institutes-0p5kfuv.jpg',
      ],
      event_name: 'Jigardan Gadhvi',
      college_name: 'Gandhinagar University',
      event_time: '07:00 PM',
      event_date: '30 JAN',
    },
    {
      id: 1,
      eventImage: [
        'https://www.collegebatch.com/static/clg-gallery/ldrp-institute-of-technology-research-gandhinagar-272339.jpg',
      ],
      event_name: 'Hackathon',
      college_name: 'LDRP ITR',
      event_time: '07:00 PM',
      event_date: '02 FEB',
    },
  ];
  const location = {
    latitude: 37.42187437350253,
    longitude: -122.08275798708202,
    latitudeDelta: 0.0421,
    longitudeDelta: 0.0421,
  };

  const eventDetails = {
    _id: {
      $oid: '65acdc6da8841c0fa13915c4',
    },
    event_name: 'XENESISW',
    college_id: '123456',
    college_name: 'LDRP-ITR',
    restriction: 'PRIVATE',
    charge: 'FREE',
    fee: 0,
    event_visiblity: 'PENDING',
    type_of_event: 'FEST',
    event_description:
      'Description of this event must be written here by anyone who created this event',
    main_event_id: '1',
    is_this_subEvent: false,
    can_participate: true,
    registerations_open: true,
    can_host_subEvent: false,
    sub_events: 'true',
    event_date: '22 Jan 2024',
    event_time: '07:00 PM',
    event_place: 'LDRP-ITR, KH-5 circle, Sector-15, Gandhinagar',
    event_location_coords: {
      latitude: 37.4219406,
      latitudeDelta: 0.0421,
      longitude: -122.0841298,
      longitudeDelta: 0.0421,
    },
    number_of_registration: 10,
    number_of_attendees: 1,
    events_host: [],
    images: [],
    sub_events_list: [
      {
        event_id: 111234,
        name: 'Laser Gun',
        event_Image: '',
        charge: 'PAID',
        fee: 150,
      },
    ],
    event_coordinators: [
      {
        id: 10201,
        name: 'Prof. Viru Shahstra Buddhe',
        profileImage: '',
        approved: true,
        department: 'Information Technology',
        entity: 'TEACHER',
      },
    ],
    created_by: [
      {
        id: 1234,
        name: 'Devarshi Patel',
        profileImage: '',
        entity: 'STUDENT',
        department: 'Information Technology',
      },
    ],
    __v: 0,
  };
  return (
    <>
      <ScrollView
        nestedScrollEnabled={true}
        style={{flex: 1, backgroundColor: whiteColor}}>
        <View style={styles.flashListView}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigationRef.current.goBack()}
            style={styles.backButton}>
            <Ionicons
              name={'arrow-back-outline'}
              color={blackColor}
              size={25}
            />
          </TouchableOpacity>
          {/* Event Banner Images  */}
          <FlashList
            data={[1, 2, 3]}
            horizontal
            pagingEnabled
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            estimatedItemSize={500}
            renderItem={({item, index}) => {
              return (
                <View
                  key={index}
                  style={{
                    flex: 1,
                    height: HEIGHT * 0.4,
                    width: WIDTH,
                    backgroundColor: whiteColor,
                  }}>
                  <Image
                    source={IMAGES.LDRP}
                    style={{
                      height: '100%',
                      width: '100%',
                      resizeMode: 'cover',
                    }}
                  />

                  {/* <Text>{item.image}</Text> */}
                </View>
              );
            }}
          />
        </View>

        <View style={styles.curvedDescriptionView}>
          <View style={{flex: 1, backgroundColor: whiteColor}}>
            <View style={styles.headingContent}>
              <View>
                <Text style={[styles.eventName, {fontSize: 25}]}>
                  DJ Snacks
                </Text>
                <View style={styles.rowContent}>
                  <EvilIcons
                    name="location"
                    size={15}
                    color={primaryColor[appType]}
                  />
                  <Text style={styles.mediumText}>Gandhinagar University</Text>
                </View>
                <View style={styles.rowContent}>
                  <EvilIcons
                    name="calendar"
                    size={15}
                    color={primaryColor[appType]}
                  />
                  <Text style={styles.mediumText}>26 Jan </Text>
                </View>
                <View style={styles.rowContent}>
                  <EvilIcons
                    name="clock"
                    size={15}
                    color={primaryColor[appType]}
                  />
                  <Text style={styles.mediumText}>07:00 PM</Text>
                </View>
              </View>
              {/* <View
                style={{
                  width: 80,
                  height: 50,
                  borderRadius: 10,
                  backgroundColor: primaryColor[appType] + 88,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: Inter_Bold,
                    fontSize: 25,
                    color: blackColor,
                  }}>
                  ₹300
                </Text>
              </View> */}
            </View>
            <View style={{marginVertical: 20}}>
              <DetailsHeading heading={'Description'} />

              <Text style={styles.eventDescriptionText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Text>
            </View>
            <View style={styles.blackLine} />
            <View style={{marginVertical: 20}}>
              <DetailsHeading heading={'Location'} />
              <Text
                style={[
                  styles.eventDescriptionText,
                  {
                    fontFamily: Inter_Semi_Bold,
                  },
                ]}>
                Room : 203, LDRP ITR, Kh-5 Circle, Sector 15, Gujarat,
                Gandhinagar
              </Text>
              {location != null ? (
                <View style={styles.mapParentView}>
                  <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    pitchEnabled={false}
                    showsMyLocationButton={false}
                    showsCompass={false}
                    scrollEnabled={false}
                    zoomEnabled={false}
                    rotateEnabled={false}
                    camera={{
                      center: {
                        latitude: location.latitude,
                        longitude: location.longitude,
                      },
                      pitch: 45,
                      heading: 90,
                      zoom: 18,
                    }}>
                    <Marker
                      draggable={false}
                      style={styles.mapMarker}
                      coordinate={location}>
                      <Image
                        source={IMAGES.locationPin}
                        style={{width: '100%', height: '100%'}}
                        resizeMode="contain"
                      />
                    </Marker>
                  </MapView>
                </View>
              ) : null}
            </View>
            <View style={styles.blackLine} />
          </View>
        </View>
        <View style={{bottom: 20, marginBottom: '15%'}}>
          <DetailsHeading
            heading={'Hosted By'}
            length={event_host.length}
            style={{marginLeft: '10%'}}
          />
          <ProfileImages title={'Hosted By'} dataList={event_host} />

          <DetailsHeading
            heading={'Co-ordinators'}
            length={event_coordinator.length}
            style={{marginLeft: '10%'}}
          />
          <ProfileImages title={'Co-ordinators'} dataList={event_coordinator} />
          <DetailsHeading
            heading={'Sub Events'}
            length={eventList.length}
            style={{marginLeft: '10%', marginBottom: '3%'}}
          />
          <EventsCard data={eventList} horizontal={true} />
        </View>
      </ScrollView>
      <View style={styles.footerContent}>
        <View>
          <Text
            style={{
              fontFamily: Inter_Semi_Bold,
              fontSize: 15,
              color: blackColor,
            }}>
            Total Price
          </Text>
          <Text
            style={{
              fontFamily: Inter_Bold,
              fontSize: 20,
              color: blackColor,
            }}>
            ₹0
            <Text
              style={{
                fontFamily: Inter_Regular,
                fontSize: 13,
                color: lightTextColor,
              }}>
              /person
            </Text>
          </Text>
        </View>
        <View
          style={[
            styles.particpateButton,
            {backgroundColor: primaryColor[appType]},
          ]}>
          <Text style={styles.particpateButtonText}>Become a Host</Text>
        </View>
      </View>
    </>
  );
};

export default EventDetails;

const styles = StyleSheet.create({
  flashListView: {
    minHeight: 2,
    backgroundColor: whiteColor,
  },
  backButton: {
    position: 'absolute',
    zIndex: 1,
    top: '5%',
    left: '5%',
    backgroundColor: whiteColor,
    padding: 3,
    borderRadius: 30,
    ...SHADOW,
  },
  curvedDescriptionView: {
    // flex: 1,
    width: WIDTH,
    backgroundColor: whiteColor,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    // position: 'absolute',
    bottom: 40,
    padding: '10%',
    paddingBottom: '0%',
  },
  headingContent: {
    justifyContent: 'center',
  },
  eventName: {
    color: blackColor,
    fontFamily: Inter_Bold,
    fontSize: 20,
  },
  rowContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mediumText: {
    color: blackColor,
    fontFamily: Inter_Medium,
    fontSize: 13,
    includeFontPadding: false,
  },
  eventDescriptionText: {
    fontFamily: Inter_Medium,
    includeFontPadding: false,
    color: lightTextColor,
    lineHeight: 20,
    fontSize: 13,
    marginLeft: 5,
    marginTop: 5,
    marginBottom: 10,
  },
  blackLine: {
    height: 1,
    width: '95%',
    alignSelf: 'center',
    backgroundColor: blackColor,
  },
  footerContent: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: whiteColor,
    height: 70,
    width: WIDTH,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  particpateButton: {
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  particpateButtonText: {
    fontFamily: Inter_Semi_Bold,
    fontSize: 15,
    color: blackColor,
  },
  mapParentView: {
    overflow: 'hidden',
    borderRadius: 10,
    marginVertical: 5,
    height: 170,
    width: '100%',
    alignSelf: 'center',
  },
  map: {
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
});
