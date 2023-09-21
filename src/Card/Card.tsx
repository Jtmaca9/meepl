import React from 'react';
import Piece from '../Piece/Piece';
import type { PieceProps } from '../Piece/Piece';
import styled from 'styled-components/native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const Text = styled.Text``;

const Container = styled.TouchableOpacity``;

const View = styled.View`
  background-color: blue;
  height: 93px;
  width: 65px;
`;

function Card(props: PieceProps & { flipped: boolean }) {
  const spin = useSharedValue<number>(props.flipped ? 1 : 0);

  const frontAnimatedStyle = useAnimatedStyle(() => {
    const spinVal = interpolate(spin.value, [0, 1], [0, 180]);
    return {
      transform: [
        {
          rotateY: withTiming(`${spinVal}deg`, { duration: 500 }),
        },
      ],
    };
  }, []);

  const backAnimatedStyle = useAnimatedStyle(() => {
    const spinVal = interpolate(spin.value, [0, 1], [180, 360]);
    return {
      transform: [
        {
          rotateY: withTiming(`${spinVal}deg`, { duration: 500 }),
        },
      ],
    };
  }, []);

  return (
    <>
      <Piece {...props} />
      <Animated.View
        style={[
          {
            position: 'absolute',
          },
          backAnimatedStyle,
        ]}
      >
        <View />
      </Animated.View>
    </>
  );
}

export default Card;
