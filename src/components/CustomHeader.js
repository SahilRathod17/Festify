import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {HEIGHT, WIDTH, STYLES} from '../../globals/constants/Styles';
import {COLORS} from '../../globals/constants/Colors';
import {EvilIcons} from '../../globals/constants/Icons';
import { useSelector } from 'react-redux';

const CustomHeader = props => {
  // const user = useSelector(store => store.user?.username);
  return (
    <View
      style={STYLES.customHeaderView}>
      <View>
        {/* Current Page Name  */}
       {
        !(props.title == 'Home') &&
       <Text style={STYLES.title}>{props.title}</Text>
       } 
        {
          props.title == 'Home' &&
          <View style={{maxWidth:WIDTH*0.7 ,flexDirection: 'row',justifyContent:'center',alignItems:'center'}}>
          <EvilIcons name="location" color={COLORS.blackColor} size={25} />

          {/* Location Of College  */}
          <Text style={STYLES.title}>
            {props.title} 
          </Text>
        </View>
        }
       
      </View>

      {/* Profile Image */}
      <View
        style={[STYLES.profileImageView,{backgroundColor:COLORS.primaryColor}]}
      />
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
 customHeaderView: {
    height: HEIGHT * 0.08,
    width: WIDTH,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.whiteColorLight,
    paddingHorizontal:15,
    marginBottom:5
  },
  headerTitle:{
    fontSize: 20,
    color: COLORS.blackColor,
    fontWeight:'600'
  }
});
