import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {HEIGHT, WIDTH} from '../../../globals/constants/Styles';
import {COLORS} from '../../../globals/constants/Colors';
import {FONTS} from '../../../globals/constants/Fonts';
import {useSelector} from 'react-redux';
import {FlashList} from '@shopify/flash-list';
import {EvilIcons} from '../../../globals/constants/Icons';
import {IMAGES} from '../../../globals/constants/Images';

const {primaryColor, blackColor, whiteColor, lightTextColor} = COLORS;
const {Inter_Medium, Inter_Semi_Bold, Inter_Bold} = FONTS;

const Announcement = props => {
  const appType = useSelector(store => store.module.currentAppType);
  const {data} = props;

  return (
    <View style={styles.flashListView}>
      <FlatList
        data={data}
        horizontal
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          // let startDate = item.date.startDate;
          // let endDate = item.date.endDate;
          return (
            <View
              style={{
                flex: 1,
                minHeight: 180,
                width: data.length > 1 ? WIDTH * 0.8 : WIDTH * 0.9,
                backgroundColor: '#1E1E1E',
                borderRadius: 20,
                margin: 10,
                marginLeft: index == 0 ? 20 : 10,
                overflow: 'hidden',
              }}>
              <View
                style={{position: 'absolute', bottom: 0, right: 0, zIndex: 1}}>
                <Image
                  source={IMAGES[appType].announcements[item.announcement_type]}
                  style={{
                    height: 150,
                    width: 150,
                    resizeMode: 'center',
                    marginRight: 5,
                  }}
                />
              </View>
              <View
                style={{
                  width: '60%',
                  paddingLeft: 10,
                  paddingVertical: 10,
                }}>
                <Text style={[styles.title, {color: primaryColor[appType]}]}>
                  {item.announcement_title}
                </Text>
                <Text style={[styles.mediumText, {width: '95%'}]}>
                  {item.short_description}
                </Text>

                {/* <View style={styles.dateView}>
                  {item.datesAvailable ? (
                    <>
                      <Text
                        style={[
                          styles.dateText,
                          {color: primaryColor[appType]},
                        ]}>
                        {startDate.split(' ')[0]}
                        {'\n'}
                        <Text style={styles.monthText}>{startDate.split(' ')[1]}</Text>
                      </Text>

                      {(endDate != '' && (endDate != startDate) )&& (
                        <>
                          <Text
                            style={[styles.dateText, {color: lightTextColor}]}>
                            {'-'}
                          </Text>

                          <Text
                            style={[
                              styles.dateText,
                              {color: primaryColor[appType]},
                            ]}>
                            {endDate.split(' ')[0]}
                            {'\n'}
                            <Text style={styles.monthText}>{endDate.split(' ')[1]}</Text>
                          </Text>
                        </>
                      )}
                    </>
                  ) : (
                    <Text style={[styles.dateText, {color: blackColor}]}>
                      {`Coming\nSoon...`}
                    </Text>
                  )}
                </View> */}
              </View>
            </View>
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

export default Announcement;

const styles = StyleSheet.create({
  flashListView: {
    minHeight: 2,
    backgroundColor: whiteColor,
  },
  title: {
    color: primaryColor,
    fontFamily: Inter_Bold,
    fontSize: 20,
  },
  mediumText: {
    color: whiteColor,
    fontFamily: Inter_Medium,
    fontSize: 12,
    marginVertical: 3,
    lineHeight: 20,
    includeFontPadding: false,
  },
  dateView: {
    width: '70%',
    backgroundColor: whiteColor,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 3,
  },
  dateText: {
    fontFamily: Inter_Semi_Bold,
    fontSize: 15,
    textAlign: 'center',
    marginHorizontal: 5,
  },
  monthText: {
    color: blackColor,
    fontFamily: Inter_Medium,
    fontSize: 12,
  },
});
