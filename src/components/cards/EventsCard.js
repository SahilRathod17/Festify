import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {WIDTH} from '../../../globals/constants/Styles';
import {COLORS} from '../../../globals/constants/Colors';
import {FONTS} from '../../../globals/constants/Fonts';
import {useSelector} from 'react-redux';
import {FlashList} from '@shopify/flash-list';
import {EvilIcons} from '../../../globals/constants/Icons';
import {navigate, navigationRef} from '../../navigation/RootNavigation';
import {useNavigation} from '@react-navigation/native';

const {primaryColor, blackColor, whiteColor, lightTextColor} = COLORS;
const {Inter_Medium, Inter_Semi_Bold} = FONTS;

const EventsCard = props => {
  const appType = useSelector(store => store.module.currentAppType);
  const {data, style, horizontal} = props;
  const navigation = useNavigation();
  return (
    <View style={[styles.flashListView, {...style}]}>
      <FlashList
        data={data}
        horizontal={horizontal}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          let {eventImage, event_name, college_name, event_time, event_date} =
            item;
          let date = 30;
          let month = 'Aug';
          return (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigation.push('EventDetails', {event: item})}>
              <ImageBackground
                key={index + 90877}
                resizeMode={'cover'}
                source={{
                  uri: eventImage[0],
                  // uri: 'https://content.jdmagicbox.com/comp/gandhinagar-gujarat/e8/9999pxx79.xx79.110610112812.e8e8/catalogue/ldrp-institute-of-technology-and-research-gandhinagar-sector-15-gandhinagar-gujarat-mba-institutes-o8hvqnk0om.jpg?clr=',
                }}
                style={[
                  styles.eventCardView,
                  horizontal
                    ? {
                        marginLeft: index == 0 ? 40 : 10,
                        marginHorizontal: 10,
                        width: WIDTH * 0.8,
                      }
                    : {},
                ]}>
                {/*  Transparent Layer : Black */}
                <View style={styles.blackLayer} />
                {/* Event Description */}
                <View style={styles.descriptionView}>
                  {/* Event Name */}
                  <Text numberOfLines={1} style={styles.eventName}>
                    {event_name}
                  </Text>
                  {/* Location and Location */}
                  <View>
                    <View style={styles.timeLocationView}>
                      <EvilIcons name="location" size={10} color={whiteColor} />
                      <Text numberOfLines={1} style={styles.mediumText}>
                        {college_name}
                      </Text>
                    </View>
                    <View style={styles.timeLocationView}>
                      <EvilIcons name="clock" size={10} color={whiteColor} />
                      <Text style={styles.mediumText}>{event_time}</Text>
                    </View>
                  </View>
                </View>
                {/* Date Container */}
                <View style={styles.dateContainer}>
                  <View style={styles.dateView}>
                    <Text
                      style={[styles.dateText, {color: primaryColor[appType]}]}>
                      {date}
                      {'\n'}
                      <Text style={styles.monthText}>{month}</Text>
                    </Text>
                  </View>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={() => {
          return <></>;
        }}
        estimatedItemSize={500}
      />
    </View>
  );
};

export default EventsCard;

const styles = StyleSheet.create({
  flashListView: {
    minHeight: 2,
    backgroundColor: whiteColor,
  },
  eventCardView: {
    width: WIDTH * 0.9,
    height: 120,
    alignSelf: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 5,
    flexDirection: 'row',
  },
  blackLayer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: blackColor + 50,
    zIndex: 1,
  },
  descriptionView: {
    height: '100%',
    width: '65%',
    zIndex: 2,
    paddingLeft: 15,
    paddingVertical: 15,
    justifyContent: 'space-between',
  },
  eventName: {
    color: whiteColor,
    fontFamily: Inter_Semi_Bold,
    fontSize: 18,
  },
  timeLocationView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mediumText: {
    color: whiteColor,
    fontFamily: Inter_Medium,
    fontSize: 12,
    includeFontPadding: false,
  },
  dateContainer: {
    width: '35%',
    zIndex: 2,
    padding: 10,
  },
  dateView: {
    flex: 1,
    backgroundColor: whiteColor,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    fontFamily: Inter_Semi_Bold,
    fontSize: 30,
  },
  monthText: {
    color: blackColor,
    fontFamily: Inter_Medium,
    fontSize: 20,
  },
});
