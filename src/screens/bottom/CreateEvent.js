import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

import SearchBar from '../../components/search/SearchBar';
import EventsCard from '../../components/cards/EventsCard';
import {COLORS} from '../../../globals/constants/Colors';
import {FONTS} from '../../../globals/constants/Fonts';
import FAB from '../../components/FAB/FAB';

const {primaryColor, blackColor, whiteColor, lightTextColor} = COLORS;
const {Inter_Semi_Bold, Inter_Medium} = FONTS;

const CreateEvent = () => {
  const [searchText, setSearchText] = useState('');
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
      id: 3,
      eventImage: [
        'https://www.collegebatch.com/static/clg-gallery/ldrp-institute-of-technology-research-gandhinagar-272339.jpg',
      ],
      event_name: 'Hackathon',
      college_name: 'LDRP ITR',
      event_time: '07:00 PM',
      event_date: '02 FEB',
    },
  ];
  return (
    <>
      <ScrollView style={{flex: 1, backgroundColor: whiteColor}}>
        {/* HEADER  */}
        <View
          style={{
            flex: 1,
            height: 90,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: whiteColor,
          }}>
          <Text
            style={{
              color: blackColor,
              fontFamily: Inter_Semi_Bold,
              fontSize: 28,
            }}>
            Host An Event
          </Text>
        </View>
        <SearchBar value={searchText} setValue={text => setSearchText(text)} />
        <Text
          style={{
            color: blackColor,
            fontFamily: Inter_Semi_Bold,
            fontSize: 20,
            marginLeft: '5%',
            marginTop: 10,
          }}>
          Events Available :
        </Text>
        <EventsCard data={eventList} style={{marginTop: 10}} />
      </ScrollView>
      <FAB onPress={() => navigate('NewEvent')} />
    </>
  );
};

export default CreateEvent;
