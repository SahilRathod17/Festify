import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React, {useRef, useState, useCallback} from 'react';
import {HEIGHT, WIDTH} from '../../globals/constants/Styles';
import {useFocusEffect} from '@react-navigation/native';
import { Image } from 'react-native-elements';
import { IMAGES } from '../../globals/constants/Images';

const Carousel = props => {
  // data*
  // loop*
  // duration (only will be applicable if loop is TRUE)
  // indexColors
  // style :{height,width,borderRadius,elevation}
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timer, setTimer] = useState(props?.duration ? props?.duration : 3);

  const flatListRef = useRef();
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
    waitForInteraction: true,
    minimumViewTime: 5,
  });
  const onViewableItemsChanged = useRef(({viewableItems, changed}) => {
    if (changed && changed.length > 0) {
      // console.log(changed[0].index);
      setCurrentIndex(changed[0].index);
    }
  });

  const ScrollToIndex = index => {
    flatListRef?.current?.scrollToIndex({
      animated: true,
      index: index,
    });
    setCurrentIndex(index);
    setTimer(props?.duration ? props?.duration : 3);
  };

  useFocusEffect(
    useCallback(() => {
      if (props.loop == true) {
        const interval = setInterval(() => {
          setTimer(prevTimer =>
            prevTimer > 0
              ? prevTimer - 1
              : props?.duration
              ? props?.duration
              : 3,
          );
        }, 1000);

        return () => clearInterval(interval);
      }
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      if (timer == 0) {
        if (currentIndex + 1 == props?.data?.length) {
          ScrollToIndex(0);
        } else {
          ScrollToIndex(currentIndex + 1);
        }
      }
    }, [timer]),
  );

  return (
    <View
      key={109109}
      style={{
        height: props?.style?.height
          ? props?.style?.height
          : HEIGHT * 0.3,
        width: WIDTH,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'skyblue',
        elevation: props?.style?.elevation,
        borderRadius: props?.style?.borderRadius,
      }}>
      <FlatList
        ref={flatListRef}
        data={props?.data}
        horizontal
        pagingEnabled
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig.current}
        renderItem={({item, index}) => {
          return (
            <View
              key={index}
              style={{
                flex: 1,
                height: '100%',
                width: WIDTH,
                // backgroundColor:'yellow',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Image 
                source={IMAGES.LDRP}
                style ={{height:'100%',width:'100%',resizeMode:'contain'}}/>

              {/* <Text>{item.image}</Text> */}
            </View>
          );
        }}
      />
      <View
        key={10910911}
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          margin: '3%',
          position: 'absolute',
          bottom: 5,
          zIndex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {props?.data?.map((item, index) => {
          // console.log(item?.id);
          return (
            <View key={item?.id}>
              <TouchableOpacity
                onPress={() => ScrollToIndex(index)}
                activeOpacity={1}
                style={{
                  margin: 3,
                  height: 15,
                  width: 15,
                  borderRadius: 20,
                  backgroundColor: props?.indexColors
                    ? props.indexColors
                    : 'red',
                  opacity: currentIndex == index ? 1 : 0.2,
                }}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({});
