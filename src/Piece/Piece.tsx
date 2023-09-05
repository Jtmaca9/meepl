import React, { useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import styled from 'styled-components/native';
import type { PieceType, PieceBlueprintType } from './types';
import type { StyleProp, View } from 'react-native';

const AnimatedContainer = styled(Animated.View)`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  width: ${({ width }) => (width ? `${width}px` : '100px')};
  height: ${({ height }) => (height ? `${height}px` : '100px')};
`;

const PieceContainerPressable = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
`;

const PieceContainer = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
`;

const PieceImage = styled.Image`
  height: 100%;
  width: 100%;
`;

type PieceProps = PieceBlueprintType &
  PieceType & {
    G: any;
    active?: boolean;
    activeStyle?: StyleProp<View>;
    children?: React.ReactNode | React.ReactNode[];
    onPress?: (id: string) => void;
    draggable?: boolean;
    onDrag?: (id: string) => void;
  };

function Piece(props: PieceProps) {
  const {
    source,
    width,
    height,
    currZoneId,
    G,
    draggable = false,
    onPress = (id) => console.log(`Piece ${id} pressed!`),
    // onDrag = (id) => console.log(`Piece ${id} dragged!`),
    active = false,
    activeStyle = {},
  } = props;

  // Find and set initail piece position
  let initPos = G.zones.find((zone) => zone.id === currZoneId);
  const pX = useSharedValue(initPos.x);
  const pY = useSharedValue(initPos.y);

  useEffect(() => {
    let { x, y } = G.zones.find((zone) => zone.id === currZoneId);

    if (x === pX.value && y === pY.value) return;

    pX.value = x;
    pY.value = y;
  }, [currZoneId, G.zones, pX, pY]);

  const animatedStyles = useAnimatedStyle(
    () => ({
      transform: [
        { translateX: withTiming(pX.value) },
        { translateY: withTiming(pY.value) },
      ],
    }),
    [pX, pY]
  );

  return draggable ? (
    <AnimatedContainer
      pX={pX}
      pY={pY}
      width={width}
      height={height}
      style={animatedStyles}
    >
      <PieceContainer style={active && activeStyle}>
        <PieceImage source={source} />
      </PieceContainer>
    </AnimatedContainer>
  ) : (
    <AnimatedContainer
      pX={pX}
      pY={pY}
      width={width}
      height={height}
      style={animatedStyles}
    >
      <PieceContainerPressable style={active && activeStyle} onPress={onPress}>
        <PieceImage source={source} />
      </PieceContainerPressable>
    </AnimatedContainer>
  );
}

export default Piece;
