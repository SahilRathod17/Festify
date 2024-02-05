import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FlashList} from '@shopify/flash-list';
import {HEIGHT, WIDTH} from '../../../../globals/constants/Styles';
import {COLORS} from '../../../../globals/constants/Colors';
import LinearGradient from 'react-native-linear-gradient';
import {IMAGES} from '../../../../globals/constants/Images';
import {navigate, navigationRef} from '../../../navigation/RootNavigation';

const {primaryColor, blackColor, whiteColorLight, greyColor} = COLORS;

const Bookings = props => {
  // <NewsCards
  // data={}
  // />

  return (
    <View style={styles.FlashListView}>
      <FlashList
        data={[1, 2]}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <View style={[styles.NewsCard]}>
              <View
                style={{
                  flex: 0.7,
                  // ...StyleSheet.absoluteFill,
                  backgroundColor: primaryColor,
                  borderBottomLeftRadius: 20,
                  flexDirection: 'column',
                }}></View>
              <View
                style={{
                  flex: 0.3,
                  flexDirection: 'row',
                  backgroundColor: primaryColor,
                }}>
                <View
                  style={{
                    // flex:0.2,
                    backgroundColor: 'black',
                    width: '45%',
                    borderTopRightRadius: 20,
                    zIndex: 1,
                  }}></View>
                <View
                  style={{
                    // flex:0.2,
                    backgroundColor: 'black',
                    width: '66%',
                    marginLeft: -1,
                    // borderBottomLeftRadius:30,
                  }}>
                  <View
                    style={{
                      // flex:0.2,
                      backgroundColor: primaryColor,
                      height: '100%',
                      width: '100%',
                      borderBottomLeftRadius: 20,
                    }}></View>
                </View>
              </View>
            </View>
          );
        }}
        ListEmptyComponent={() => {
          return (
            <View style={styles.empytListView}>
              <Image
                source={IMAGES.emptyAnnouncement}
                style={styles.emptyListImage}
              />
              <Text
                style={[styles.newsTitle, {color: greyColor}]}
                numberOfLines={2}>
                {'Currently No Updates have been Posted'}
              </Text>
            </View>
          );
        }}
        estimatedItemSize={500}
      />
    </View>
  );
};

export default Bookings;

const styles = StyleSheet.create({
  FlashListView: {
    flex: 1,
    width: WIDTH,
    minHeight: 2,
    backgroundColor: whiteColorLight,
    marginHorizontal: 5,
  },
  triangleCorner: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 100,
    borderTopWidth: 100,
    borderRightColor: 'transparent',
    borderTopColor: 'red',
  },
  NewsCard: {
    flex: 1,
    width: WIDTH * 0.9,
    minHeight: HEIGHT < 750 ? HEIGHT / 3.5 : HEIGHT * 0.23,
    borderRadius: 20,
    backgroundColor: blackColor,
    alignSelf: 'center',
    margin: 10,
    borderColor: blackColor,
    borderWidth: 2,
    overflow: 'hidden',
  },
  description: {
    fontWeight: '600',
    fontSize: 13,
    color: blackColor,
    textAlign: 'center',
  },
  descriptionView: {
    margin: 5,
    marginVertical: 10,
    borderRadius: 10,
    minHeight: '40%',
  },
  newsTitleView: {
    minWidth: '35%',
    padding: 5,
    backgroundColor: blackColor,
    alignSelf: 'center',
    borderRadius: 20,
    margin: 3,
  },
  newsTitle: {
    color: primaryColor,
    fontSize: 16,
    padding: 3,
    fontWeight: '800',
    textAlign: 'center',
  },
  Cardfooter: {
    backgroundColor: blackColor,
    height: '20%',
    // width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  primaryBackground: {
    maxWidth: '70%',
    backgroundColor: primaryColor,
    padding: 5,
    borderRadius: 10,
  },
  primaryBackgroundText: {
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
    color: blackColor,
  },
  empytListView: {
    height: HEIGHT * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: whiteColorLight,
  },
  emptyListImage: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    opacity: 0.5,
    margin: 5,
  },
});
