import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const cards = [
  {name: 'empty'},
  {name: 'Toss', start: '#0081a7', end: '#00afb9'},
  {name: 'Visa', start: '#737dfe', end: '#ffcac9'},
  {name: 'master', start: '#ffe53b', end: '#ff2525'},
  {name: 'kb', start: '#ff2cdf', end: '#0014ff'},
  {name: 'empty'},
];
const {width, height} = Dimensions.get('screen');
const CardWidth = width * 0.55;
const CardHeight = CardWidth * 1.45;

const AnimatedGradientView = Animated.createAnimatedComponent(LinearGradient);

const Circle = () => {
  return (
    <View
      style={{
        width: 15,
        height: 15,
        borderRadius: 10,
        marginHorizontal: 5,
        backgroundColor: 'gray',
      }}
    />
  );
};

const PaymentsApp = () => {
  const [isCardSelect, setIsCardSelect] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const selectedCardAnim = useRef(new Animated.Value(0)).current;
  const scrollX = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(0)).current;

  const scaleX = useRef(new Animated.Value(1)).current;
  console.log(CardWidth);
  useEffect(() => {
    scrollX.addListener(e => scaleX.setValue(((e.value / CardWidth) % 1) + 1));
    scrollX.addListener(e => translateX.setValue((e.value / CardWidth) * 25));
  }, []);

  useEffect(() => {
    if (isCardSelect) {
      Animated.timing(selectedCardAnim, {
        toValue: 1,
        duration: 500,
      }).start();
    } else {
      Animated.timing(selectedCardAnim, {
        toValue: 0,
        duration: 500,
      }).start();
    }
  }, [isCardSelect]);

  const selectedCardY = selectedCardAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -100],
  });
  const selectedCardScale = selectedCardAnim.interpolate({
    inputRange: [0, 0.2, 1],
    outputRange: [1, 0.95, 0.95],
  });
  const backgroundColor = selectedCardAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(255, 255, 255, 1)', 'rgba(0, 0, 0, 1)'],
  });

  //   const translateX = useRef(new Animated.Value(0)).current;

  const Card = ({card, index}) => {
    const inputRange = [
      (index - 2) * CardWidth,
      (index - 1) * CardWidth,
      index * CardWidth,
    ];

    // inputRange값은 두번쨰카드에서 304에서 멈춤 (첫번쨰 카드때는 0)
    // inputRange는 [이전, 현재, 다음] 값으로 계산해야 할때
    // 2번 카드 기준 inputRange [ 0 , 304 , 608]
    // outputRange [.75 , 1, .75]
    // 0, 608에 위치한 1번, 3번 카드는 .75배로 작아진다

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.75, 1, 0.75],
    });

    return card.name === 'empty' ? (
      <View style={styles.emptyCard} />
    ) : (
      <View style={{width: CardWidth, marginVertical: 50}}>
        <AnimatedGradientView
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={[card.start, card.end]}
          style={[styles.card, {transform: [{scale}]}]}>
          <Text style={styles.cardName}>{card.name}</Text>
          <View
            style={{
              position: 'absolute',
              width: CardWidth,
              height: CardHeight,
              backgroundColor:
                currentCardIndex + 1 === index ? 'transparent' : '#ffffff80',
            }}
          />
        </AnimatedGradientView>
      </View>
    );
  };

  return (
    <>
      <Animated.View style={[styles.screen, {backgroundColor}]}>
        <View style={{marginBottom: 25}}>
          <Animated.FlatList
            //   snapToInterval을 기입시 스크롤이 snapToInterval값의 배수에서 멈춘다 (스크롤이 얼마나 가다 멈출지를 정해준다)
            snapToInterval={CardWidth}
            // onScroll={e => console.log(e.nativeEvent.contentOffset.x)}
            // scrollX변수에 nativeEvent.contentOffset.x의 값이 계속해서 대입된다
            // x는 카드의 넓이 + 마진값마다 멈춘다
            style={{flexGrow: 0}}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {
                useNativeDriver: true,
                listener: e => {
                  setCurrentCardIndex(
                    Math.round(e.nativeEvent.contentOffset.x / 264),
                  );
                },
              },
            )}
            contentContainerStyle={{alignItems: 'center'}}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            horizontal
            //   decelerationRate
            //   사용자가 손가락을 뗀 후 얼마나 빨리 스크롤이 이동할지 결정한다. ('normal' , 'fast' )
            decelerationRate={0.5}
            //   scrollEventThrottle (only IOS ,default 0)
            // scrollEventThrottle={1}
            data={cards}
            bounces
            renderItem={({item, index}) => (
              <View style={{opacity: isCardSelect ? 0 : 1}}>
                <Card index={index} card={item} />
              </View>
            )}
          />
          {isCardSelect && (
            <Animated.View
              style={{
                transform: [
                  {translateY: selectedCardY},
                  {scale: selectedCardScale},
                ],

                position: 'absolute',
                alignSelf: 'center',
              }}>
              <Card
                card={cards[currentCardIndex + 1]}
                index={currentCardIndex + 1}
              />
            </Animated.View>
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {[...Array(cards.length - 2)].map(() => {
            return <Circle />;
          })}
          <Animated.View
            style={[{transform: [{translateX}]}, styles.indicatorDot]}
          />
        </View>
        <TouchableOpacity
          onPress={() => setIsCardSelect(!isCardSelect)}
          style={styles.payBtn}>
          <Text style={styles.payTxt}>Pay Now</Text>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

export default PaymentsApp;

// 참고
// https://eveningkid.medium.com/animated-and-react-native-scrollviews-de701f1b1ce5

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: CardWidth,
    height: CardHeight,
    borderRadius: 10,
    backgroundColor: 'black',
    overflow: 'hidden',
    elevation: 30,
  },
  cardName: {
    color: '#fff',
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  emptyCard: {
    width: (width - CardWidth) / 2,
    height: 100,
  },

  indicatorDot: {
    position: 'absolute',
    width: 15,
    height: 15,
    backgroundColor: 'black',
    marginHorizontal: 5,
    borderRadius: 8,
  },

  payBtn: {
    borderRadius: 50,
    backgroundColor: '#81c147',
    marginTop: 40,
    width: 200,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  payTxt: {
    fontSize: 20,
    color: '#fff',
  },
});
