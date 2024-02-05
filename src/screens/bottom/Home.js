import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../../../globals/constants/Colors';
import {FONTS} from '../../../globals/constants/Fonts';
import {EvilIcons} from '../../../globals/constants/Icons';
import {useSelector} from 'react-redux';
import {WIDTH} from '../../../globals/constants/Styles';
import {TextInput} from 'react-native-paper';
import {FlashList} from '@shopify/flash-list';
import {IMAGES} from '../../../globals/constants/Images';
import ListHeadings from '../../components/CustomText/ListHeadings';
import EventsCard from '../../components/cards/EventsCard';
import Announcement from '../../components/cards/Announcement';
import SearchBar from '../../components/search/SearchBar';
import {navigate} from '../../navigation/RootNavigation';
import {GetAnnouncements} from '../../../globals/constants/APIs';

const {primaryColor, blackColor, whiteColor, lightTextColor} = COLORS;
const {Inter_Bold, Inter_Medium, Inter_Semi_Bold, Inter_Regular} = FONTS;

const Home = () => {
  const appType = useSelector(store => store.module.currentAppType);
  const user = useSelector(store => store.user.userDetails);
  const [searchText, setSearchText] = useState('');
  const [announcementList, setAnnouncementList] = useState([]);
  const eventList = [
    {
      id: 1,
      eventImage: [
        'https://content.jdmagicbox.com/comp/gandhinagar-gujarat/e8/9999pxx79.xx79.110610112812.e8e8/catalogue/ldrp-institute-of-technology-and-research-gandhinagar-sector-15-gandhinagar-gujarat-mba-institutes-o8hvqnk0om.jpg?clr=',
      ],
      event_name: 'Xenesis',
      college_name: 'LDRP ITR',
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
  const fetchAnnouncement = GetAnnouncements();
  useEffect(() => {
    handleAnnouncement();
  }, []);
  const handleAnnouncement = async () => {
    let res = await fetchAnnouncement({id: user.college_id});
    setAnnouncementList(res.data);
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: whiteColor}}>
      {/* HEADER with Hello (Name) and University */}
      <View
        style={{
          flex: 1,
          height: 90,
          paddingLeft: 25,
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: blackColor,
            fontFamily: Inter_Semi_Bold,
            fontSize: 25,
            alignItems: 'center',
            flexDirection: 'column',
          }}>
          Hello {user.name},{'\n'}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <EvilIcons
              name="location"
              size={13}
              color={primaryColor[appType]}
            />
            <Text
              style={{
                color: lightTextColor,
                fontFamily: Inter_Regular,
                fontSize: 13,
              }}>
              {user.college_name}
            </Text>
          </View>
        </Text>
      </View>
      {/* <SearchBar value={searchText} setValue={(text)=> setSearchText(text)}/> */}

      {/* Announcements */}
      <ListHeadings
        title={'Announcements'}
        onPressRight={() => {
          console.log('Announcements Pressedd !!');
        }}
        // style={{marginTop: 20}}
      />

      <Announcement data={announcementList} />

      {/* Nearby Events */}
      <ListHeadings
        title={appType == 'Student' ? 'Nearby Events' : 'Assigned to you'}
        onPressRight={() => {
          navigate('EventsList');
        }}
      />
      <View
        style={{
          paddingHorizontal: 10,
          marginBottom: 30,
        }}>
        <EventsCard data={eventList} horizontal={false} />
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  formInputFields: {
    width: WIDTH * 0.9,
    height: 50,
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: lightTextColor,
    backgroundColor: whiteColor,
    color: lightTextColor,
  },
  flashListView: {
    minHeight: 2,
    backgroundColor: whiteColor,
  },
});
