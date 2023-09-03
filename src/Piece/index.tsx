import React, { useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import styled from 'styled-components/native';

export type PieceType = {
  id: string;
  currZoneId?: string;
  source: any;
  width?: number;
  height?: number;
  onPress?: () => void;
  children?: React.ReactNode | React.ReactNode[];
};

const AnimatedContainer = styled(Animated.View)`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  width: ${({ width }) => (width ? `${width}px` : '100px')};
  height: ${({ height }) => (height ? `${height}px` : '100px')};
`;

const PieceContainer = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
`;

const PieceImage = styled.Image`
  height: 100%;
  width: 100%;
`;

function Piece({
  source,
  width,
  height,
  onPress,
  currZoneId,
  G,
}: PieceType & { G: any }) {
  let initPos = G.zones.find((zone) => zone.id === currZoneId);
  const pX = useSharedValue(initPos.x);
  const pY = useSharedValue(initPos.y);

  useEffect(() => {
    let { x, y } = G.zones.find((zone) => zone.id === currZoneId);

    if (x === pX.value && y === pY.value) return;

    pX.value = x;
    pY.value = y;
  }, [currZoneId, G.zones, pX, pY]);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      { translateX: withTiming(pX.value) },
      { translateY: withTiming(pY.value) },
    ],
  }));

  return (
    <AnimatedContainer
      pX={pX}
      pY={pY}
      width={width}
      height={height}
      style={animatedStyles}
    >
      <PieceContainer onPress={onPress}>
        <PieceImage source={source} />
      </PieceContainer>
    </AnimatedContainer>
  );
}

export default Piece;