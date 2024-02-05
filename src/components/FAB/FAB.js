import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../../globals/constants/Colors';
import {Entypo} from '../../../globals/constants/Icons';
import {SHADOW} from '../../../globals/constants/Styles';
import {useSelector} from 'react-redux';

const FAB = props => {
  const appType = useSelector(store => store.module.currentAppType);

  return (
    <TouchableOpacity
      onPress={() => props?.onPress()}
      style={{
        position: 'absolute',
        backgroundColor: COLORS.primaryColor[appType],
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        width: 60,
        ...SHADOW,
        bottom: 10,
        right: 10,
        borderRadius: 40,
      }}>
      <Entypo name={'plus'} size={30} color={COLORS.whiteColor} />
    </TouchableOpacity>
  );
};

export default FAB;

const styles = StyleSheet.create({});
