import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {FlashList} from '@shopify/flash-list';
import {HEIGHT, WIDTH} from '../../../globals/constants/Styles';
import {COLORS} from '../../../globals/constants/Colors';
import LinearGradient from 'react-native-linear-gradient';
import {
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons,
} from '../../../globals/constants/Icons';
import {IMAGES} from '../../../globals/constants/Images';
import {navigate, navigationRef} from '../../navigation/RootNavigation';

const {primaryColor, blackColor, whiteColorLight, greyColor} = COLORS;

const NewsCards = props => {
  // <NewsCards
  // data={}
  // />
  return (
    <View style={styles.FlashListView}>
      <FlashList
        data={props?.data}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <View
              // colors={['#FE7A63', '#FE6363']}
              style={[styles.GradientCard, {backgroundColor: '#FE6363'}]}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '20%',
                  // paddingHorizontal:5
                }}>
                {/* <View style={{width:'5%'}} 
                /> */}
                <View style={styles.newsTitleView}>
                  <Text style={styles.newsTitle}>Title</Text>
                </View>
                {props?.editable == true && (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      position: 'absolute',
                      right: 5,
                      alignSelf: 'center',
                    }}>
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() =>
                        navigationRef.navigate('CreateUpdate', {
                          edit: true,
                          title: 'Title',
                          description:
                            'Description of max 350 Words Description',
                          newsType: 'Quiz',
                        })
                      }>
                      <FontAwesome name={'edit'} color={blackColor} size={20} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.9}
                      style={{marginHorizontal: 5}}
                      onPress={() => {}}>
                      <MaterialCommunityIcons
                        name={'delete'}
                        color={blackColor}
                        size={20}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </View>

              {/* 350 Charcters for Description */}
              <View style={styles.descriptionView}>
                <Text style={styles.description}>
                  Description of max 350 Words Description
                </Text>
              </View>

              <View style={{marginBottom: '10%'}} />

              <View style={styles.Cardfooter}>
                <Text
                  style={{
                    // flex:1,
                    color: primaryColor,
                    fontSize: 13,
                    fontWeight: '800',
                  }}>
                  Posted On :{'\n'}01/01/2024
                </Text>

                <View style={styles.primaryBackground}>
                  <Text style={styles.primaryBackgroundText}>Quiz</Text>
                </View>
              </View>
              {/* </View> */}
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

export default NewsCards;

const styles = StyleSheet.create({
  FlashListView: {
    flex: 1,
    width: WIDTH,
    minHeight: 2,
    backgroundColor: whiteColorLight,
    marginHorizontal: 5,
  },
  GradientCard: {
    flex: 1,
    width: WIDTH * 0.9,
    minHeight: HEIGHT < 750 ? HEIGHT / 3.5 : HEIGHT * 0.23,
    borderRadius: 20,
    // backgroundColor: primaryColor,
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
    width: '100%',
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
