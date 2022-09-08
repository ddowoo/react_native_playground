# LayoutAnimation

리액트 네이티브에서 애니메이션을 만들어야 할때는 Animated API를 활용해 만들지만

width, height와 같은 레이아웃은 해당 API로 변경하지 못한다. 

이럴때는 **LayoutAnimation**을 이용하면 간단하게 애니메이션을 구현할 수 있다.

#

API를 사용하는 방법은 setState직전 API를 호출하는 것이다.
#

그리고 이 작업을 하기 위해서는 UIManager 셋팅을 해줘야 한다. (Android)

```jsx
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
```

#

### **`configureNext(config, onAnimationDidEnd?, onAnimationDidFail?)`[](https://reactnative.dev/docs/layoutanimation#configurenext)**

1. state값 변경 후 애니메이션을 입력한다
    1. config
        1. duration 
        2. create (optional)
        3. update (optional)
        4. delete (optional)
    2. onAnimationDidEnd?
        
        애니메이션 종료시 호출
        
    3. onAnimationDidFail?
        
        애니메이션 실패시 호출
        

 #

config는 이미 만들어진 **Presets**을 이용하면 쉽게 구현할 수 있다.

```jsx
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
```

![ezgif com-gif-maker](https://user-images.githubusercontent.com/63283076/189110506-9a1502e8-2eb9-4ed2-9cc4-019b3cb8dc26.gif)

참고

[](https://reactnative.dev/docs/layoutanimation)
