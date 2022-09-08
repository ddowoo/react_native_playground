import React, {useState} from 'react';
import {
  Dimensions,
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';

const {width} = Dimensions.get('screen');

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const SHORT = 100;
const LONG = width - 30;

const LayoutAnimationStudy = () => {
  const [isSpring, setIsSpring] = useState(false);
  const [isLinear, setIsLinear] = useState(false);
  const [isEaseInOut, setIsEaseInOut] = useState(false);

  return (
    <View style={styles.screen}>
      <TouchableOpacity
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
          setIsSpring(!isSpring);
        }}
        style={styles.btn}>
        <Text>spring</Text>
      </TouchableOpacity>
      <View
        style={[
          {
            width: isSpring ? SHORT : LONG,
          },
          styles.bar,
        ]}
      />
      <TouchableOpacity
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
          setIsLinear(!isLinear);
        }}
        style={styles.btn}>
        <Text>linear</Text>
      </TouchableOpacity>
      <View
        style={[
          {
            width: isLinear ? SHORT : LONG,
          },
          styles.bar,
        ]}
      />
      <TouchableOpacity
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setIsEaseInOut(!isEaseInOut);
        }}
        style={styles.btn}>
        <Text>easeInEaseOut</Text>
      </TouchableOpacity>
      <View
        style={[
          {
            width: isEaseInOut ? SHORT : LONG,
          },
          styles.bar,
        ]}
      />
    </View>
  );
};

export default LayoutAnimationStudy;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },

  btn: {
    width: 75,
    height: 75,
    borderRadius: 30,
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bar: {
    height: 20,
    marginVertical: 20,
    borderRadius: 20,
    backgroundColor: 'skyblue',
  },
});
