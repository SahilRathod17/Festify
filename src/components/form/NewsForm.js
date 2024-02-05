import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {COLORS} from '../../../globals/constants/Colors';
import {HEIGHT, WIDTH, SHADOW} from '../../../globals/constants/Styles';
import _ from 'lodash';
import DropDown from '../../components/DropDown';
import {Ionicons} from '../../../globals/constants/Icons';
import {navigationRef} from '../../navigation/RootNavigation';

const {
  primaryColor,
  greyColor,
  blackColor,
  whiteColorLight,
  whiteColor,
  codes,
} = COLORS;

const NewsForm = props => {
  const [title, setTitle] = useState(
    props?.route?.params?.title ? props.route.params?.title.trim() : '',
  );
  const [description, setDescription] = useState(
    props?.route?.params?.description
      ? props.route.params?.description.trim()
      : '',
  );
  const [newsType, setNewsType] = useState(
    props?.route?.params?.newsType ? props.route.params?.newsType.trim() : '',
  );
  const [newsTypeOpen, setNewsTypeopen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [types, setTypes] = useState([
    {
      label: 'Quiz',
      value: 'Quiz',
    },
    {
      label: 'Music',
      value: 'Music',
    },
    {
      label: 'Hackathon',
      value: 'Hackathon',
    },
    {
      label: 'Sports',
      value: 'Sports',
    },
    {
      label: 'Other',
      value: 'Other',
    },
  ]);
  const titleRef = useRef();
  const descriptionRef = useRef();

  const [edit, setEdit] = useState(
    props?.route?.params?.editable ? props?.route?.params?.editable : false,
  );
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    if (edit) {
      checkChanged();
    }
  }, [title, description, newsType]);

  const checkChanged = () => {
    let prev = {
      title: props?.route?.params?.title.trim(),
      description: props?.route?.params?.description.trim(),
      newsType: props?.route?.params?.newsType.trim(),
    };
    let current = {
      title: title.trim(),
      description: description.trim(),
      newsType: newsType.trim(),
    };
    if (_.isEqual(prev, current)) {
      setChanged(false);
    } else {
      setChanged(true);
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: whiteColorLight}}>
      {/* Header */}
      <View style={styles.headerContent}>
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => navigationRef.current.goBack()}
          activeOpacity={0.5}
          //     style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={30} color={blackColor} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigationRef.current.goBack()}
          activeOpacity={0.5}
          //     style={{height: 40, width: 40}}
        >
          <Text style={styles.headerTitle}>News</Text>
        </TouchableOpacity>
        <View style={{width: '10%'}} />
      </View>
      <View style={styles.formLayout}>
        <Text style={styles.formInputTitle}>Title*</Text>
        <TextInput
          ref={titleRef}
          selectionColor={primaryColor}
          style={styles.formInputFields}
          returnKeyType="next"
          onSubmitEditing={() => descriptionRef.current.focus()}
          autoCorrect={false}
          underlineColorAndroid="transparent"
          placeholder={`Enter News Title`}
          placeholderTextColor={greyColor}
          // autoCapitalize="words"
          onChangeText={txt => setTitle(txt)}
          blurOnSubmit={false}
          value={title}
        />
        <View
          style={{
            width: '100%',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={styles.formInputTitle}>Description*</Text>
          <Text
            style={[
              {
                fontWeight: '600',
                fontSize: 12,
                color: greyColor,
                marginRight: 10,
              },
            ]}>{`${description.length}/350`}</Text>
        </View>
        <TextInput
          ref={descriptionRef}
          selectionColor={primaryColor}
          style={[
            styles.formInputFields,
            {height: HEIGHT * 0.18, textAlignVertical: 'top'},
          ]}
          returnKeyType="done"
          numberOfLines={7}
          multiline={true}
          // onSubmitEditing={() => }
          autoCorrect={false}
          underlineColorAndroid="transparent"
          placeholder={`Describe the news in maximum 350 Characters`}
          placeholderTextColor={greyColor}
          maxLength={350}
          // autoCapitalize="words"
          onChangeText={txt => setDescription(txt)}
          blurOnSubmit={false}
          value={description}
        />
        <Text style={styles.formInputTitle}>Category*</Text>

        <DropDown
          placeholder="Select News Category Type"
          // tickIconStyle={{color:greyColor}}
          open={newsTypeOpen}
          value={newsType}
          items={types}
          setOpen={setNewsTypeopen}
          setValue={setNewsType}
          setItems={setTypes}
        />

        <TouchableOpacity
          onPress={() => console.log('CREATESS')}
          disabled={loading}
          style={[styles.createButton, {opacity: loading ? 0.5 : 1}]}>
          {loading ? (
            <ActivityIndicator color={whiteColor} size={'large'} />
          ) : (
            <Text style={styles.createButtonText}>Publish</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NewsForm;

const styles = StyleSheet.create({
  headerContent: {
    flexDirection: 'row',
    backgroundColor: whiteColorLight,
    justifyContent: 'space-around',
    alignItems: 'center',
    height: HEIGHT * 0.1,
  },
  //       headerTitle: {
  //         alignSelf: 'center',
  //         marginBottom: '5%',
  //         fontSize: 25,
  //         color: primaryColor,
  //         // fontFamily: Platform.OS == 'android' ? YoungSerif : EFM,
  //       },
  headerTitle: {
    fontSize: 25,
    color: blackColor,
    // fontFamily: Platform.OS == 'android' ? YoungSerif : EFM
  },
  backButton: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    // position: 'absolute',
    // top: 10,
    // left: 20,
    zIndex: 1,
    borderRadius: 30,
  },
  formLayout: {
    width: WIDTH * 0.95,
    alignSelf: 'center',
    backgroundColor: 'red',
    marginVertical: 10,
    padding: 5,
    paddingBottom: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: primaryColor,
    backgroundColor: whiteColor,
  },
  formInputFields: {
    width: '95%',
    alignItems: 'flex-start',
    height: HEIGHT * 0.05,
    // borderWidth: 2,
    // borderColor: primaryColor,
    alignSelf: 'center',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: whiteColorLight,
    marginVertical: 10,
    backgroundColor: whiteColorLight,
    fontSize: 14,
    fontWeight: '500',
    color: blackColor,
    ...SHADOW,
  },
  headerTitle: {
    fontSize: 23,
    color: blackColor,
    fontWeight: '600',
    textAlign: 'center',
    // marginLeft: '3%',
  },
  formInputTitle: {
    fontSize: 15,
    color: blackColor,
    fontWeight: '500',
    marginLeft: '3%',
  },
  dropDownContainerStyle: {
    backgroundColor: whiteColorLight,
    borderBottomEndRadius: 10,
    width: '95%',
    alignSelf: 'center',
    borderColor: 'transparent',
    ...SHADOW,
  },
  createButton: {
    alignSelf: 'center',
    width: 'auto',
    padding: 10,
    backgroundColor: primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 10,
    ...SHADOW,
    shadowColor: primaryColor,
  },
  createButtonText: {
    fontSize: 15,
    color: whiteColor,
    fontWeight: '800',
    paddingHorizontal: 10,
    ...SHADOW,
  },
});
