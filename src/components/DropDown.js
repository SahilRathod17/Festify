import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {HEIGHT, SHADOW} from '../../globals/constants/Styles';
import {COLORS} from '../../globals/constants/Colors';

const {primaryColor, whiteColor, whiteColorLight, blackColor, greyColor} =
  COLORS;

const DropDown = props => {
  // const [SelectedValue, setSelectedValue] = useState('');
  const [open, setOpen] = useState(props.open);
  const [value, setValue] = useState(props?.value ? props?.value : '');
  const items = props?.items ? props.items : [];

  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      props.setOpen(!props.open);
      props.setValue(value);
      // onChangeSelect(value, !open);
    }
  }, [value, open]);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.9}
        style={[
          styles.openList,
          {
            borderBottomLeftRadius: open ? 0 : 10,
            borderBottomRightRadius: open ? 0 : 10,
          },
          {
            height: props?.style?.height ? props.style.height : HEIGHT * 0.05,
          },
        ]}
        onPress={() => {
          setOpen(!open);
        }}>
        <Text
          style={[
            styles.textbox,
            {color: value != '' ? blackColor : greyColor},
          ]}>
          {value != '' ? value : props?.placeholder}
        </Text>
        <Entypo
          name={open ? 'cross' : 'chevron-small-down'}
          size={open ? 20 : 25}
          color={blackColor}
        />
      </TouchableOpacity>
      {open ? (
        <View
          style={[
            styles.dropDownView,
            {
              borderBottomRightRadius: 10,
              borderBottomLeftRadius: 10,
              overflow: 'hidden',
              zIndex: 1,
            },
          ]}>
          <ScrollView scrollEnabled={true} style={{width: '100%'}}>
            {items.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.dropdownitems}
                onPress={() => {
                  setOpen(false);
                  setValue(item.label == value ? '' : item.value);
                  // setselect(item.label == value ? '' :item.label);
                }}>
                <Text style={[styles.textbox]}>{item.label}</Text>
                {item.label == value && (
                  <Entypo name={'check'} size={18} color={blackColor} />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      ) : null}
    </View>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    zIndex: 1,
  },
  openList: {
    width: '95%',
    // height: HEIGHT * 0.05,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: whiteColorLight,
    marginTop: 10,
    backgroundColor: whiteColorLight,
    ...SHADOW,
  },
  dropDownView: {
    width: '95%',
    maxHeight: HEIGHT * 0.15,
    elevation: 5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: whiteColorLight,
    alignSelf: 'center',
    overflow: 'hidden',
    ...SHADOW,
  },
  textbox: {
    fontSize: 14,
    fontWeight: '500',
    color: blackColor,
  },
  dropdownitems: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    height: 40,
    borderRadius: 10,
    padding: 5,
    alignSelf: 'center',
    backgroundColor: whiteColorLight,
  },
});
