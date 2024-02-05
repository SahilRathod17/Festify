import {StyleSheet, Text, TouchableOpacity, View,Modal} from 'react-native';
import React from 'react';
import { COLORS } from '../../../globals/constants/Colors';
import { HEIGHT, WIDTH } from '../../../globals/constants/Styles';
import PoppinsText from '../CustomText/PoppinsText';

const {primaryColor, greyColor, blackColor, whiteColorLight, whiteColor,codes} =
  COLORS;

const MessageModal = props => {
  //   <MessageModal
  // open={modalOpen}
  // onDismiss={()=>}
  // onPressOK={()=>}
  // okButtonText
  // cancelButtonText
  // cancelable={false}
  // onPressCancel={()=>{}}
  // buttons={['OK']}
  // message={'New Entity Added'}
  // icon={<Feather name="check-circle" size={50} color={'green'} />}
  // />

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props?.open}
      onRequestClose={() => {
        props?.onDismiss();
      }}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => props?.onDismiss()}
        style={styles.modalView}>
        <View style={[styles.modalBox]}>
          {props?.icon}
          <PoppinsText
          fontType={'Italic'}
            style={{
              fontSize: 20,
              fontWeight:'600',
              textAlign: 'center',
              color: blackColor,
              margin: 10,
            }}>
           {props.message}
          </PoppinsText>
          <View style={{flexDirection: 'row', justifyContent: props?.cancelable == true ? 'space-between' : 'center',width:'75%'}}>
          {
                props?.cancelable
                &&
                <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => props?.onPressCancel()}
              style={{
                width: '30%',
                alignSelf: 'center',
                backgroundColor: codes[400],
                padding: 10,
                borderRadius: 10,
                marginVertical: 10,
              }}>
               <PoppinsText
              fontType={'Italic'}
                style={{
                  fontSize: 20,
                  textAlign: 'center',
                  fontWeight: '700',
                  color: whiteColor,
                }}>
                {props?.cancelButtonText ? props?.cancelButtonText : 'Cancel'}
              </PoppinsText>
            </TouchableOpacity>
               
            }
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => props?.onPressOK()}
              style={{
                width: '30%',
                alignSelf: 'center',
                backgroundColor: codes[200],
                padding: 10,
                borderRadius: 10,
                marginVertical: 10,
              }}>
              <PoppinsText
              fontType={'Italic'}
                style={{
                  fontSize: 20,
                  textAlign: 'center',
                  fontWeight: '700',
                  color: whiteColor,
                }}>
                {props?.okButtonText ? props?.okButtonText : 'OK'}
              </PoppinsText>
            </TouchableOpacity>

          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default MessageModal;

const styles = StyleSheet.create({
        modalView: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: blackColor + '75',
              },
              modalBox: {
                minHeight: HEIGHT * 0.25,
                width: WIDTH * 0.9,
                backgroundColor: whiteColorLight,
                borderRadius: 10,
                justifyContent:'center',
                alignItems:'center'
              },
});
