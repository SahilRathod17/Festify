import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import React from 'react';
import {COLORS} from '../../../globals/constants/Colors';
import {FONTS} from '../../../globals/constants/Fonts';
import {IMAGES} from '../../../globals/constants/Images';

const {blackColor, whiteColor, lightTextColor} = COLORS;
const {Inter_Medium, Inter_Semi_Bold, Inter_Bold} = FONTS;
const ProfileImages = ({dataList}) => {
  return (
    <>
      {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={styles.title}>{title}</Text>
        <Text
          style={{
            fontSize: 15,
            fontFamily: Inter_Medium,
            color: lightTextColor,
          }}>{` (${dataList.length})`}</Text>
      </View> */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{marginTop: 10}}>
        {dataList.map((item, index) => {
          return (
            <View
              key={item._id}
              style={{
                flex: 1,
                minHeight: 100,
                minWidth: 100,
                marginHorizontal: 5,
                marginLeft: index == 0 ? 20 : 5,
                alignItems: 'center',
                padding: 10,
              }}>
              <View
                style={{
                  height: 60,
                  width: 60,
                  borderRadius: 100,
                  backgroundColor: 'red',
                  marginHorizontal: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  overflow: 'hidden',
                }}>
                <Image
                  source={IMAGES.LDRP}
                  style={{
                    height: '100%',
                    width: '100%',
                    resizeMode: 'cover',
                  }}
                />
              </View>
              <Text style={styles.name}>{item.name}</Text>
            </View>
          );
        })}
      </ScrollView>
    </>
  );
};

export default ProfileImages;

const styles = StyleSheet.create({
  title: {
    color: blackColor,
    fontFamily: Inter_Bold,
    fontSize: 15,
  },
  name: {
    color: blackColor,
    fontFamily: Inter_Medium,
    fontSize: 15,
    includeFontPadding: false,
    textAlign: 'center',
    width: 80,
    marginVertical: 3,
  },
});
