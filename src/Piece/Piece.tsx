// @ts-nocheck
import React, { useEffect, useRef } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import type { StyleProp, View } from 'react-native';
import { findZoneByCoords } from '../Zone/utils';
import type { PieceType, PieceBlueprintType } from './types';

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

const PieceContainer = styled.View`
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
    setActive?: (id: string) => void;
    movePiece?: (id: string) => void;
    draggable?: boolean;
  };

function Piece(props: PieceProps) {
  const {
    source,
    width,
    height,
    currZoneId,
    G,
    draggable = true,
    setActive,
    movePiece,
    active = false,
    activeStyle = {},
  } = props;

  // Find and set initail piece position
  let initPos = G.zones.find((zone) => zone.id === currZoneId);
  const pX = useSharedValue(initPos.x);
  const pY = useSharedValue(initPos.y);
  const startX = useSharedValue(initPos.x);
  const startY = useSharedValue(initPos.y);

  const panRef = useRef(null);

  // const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    let { x, y } = G.zones.find((zone) => zone.id === currZoneId);

    if (x === pX.value && y === pY.value) return;

    pX.value = x;
    pY.value = y;
  }, [currZoneId, G.zones, pX, pY]);

  const animatedStyles = useAnimatedStyle(
    () => ({
      transform: [
        { translateX: withTiming(pX.value, { duration: 50 }) },
        { translateY: withTiming(pY.value, { duration: 50 }) },
      ],
    }),
    [pX, pY]
  );

  const panGestureHandler = (p) => {
    'worklet';
    const event = p.nativeEvent;
    if (event.state === State.ACTIVE) {
      pX.value = event.translationX + startX.value;
      pY.value = event.translationY + startY.value;
    }
  };

  const panGestureStateHandler = ({ nativeEvent: event }) => {
    'worklet';
    if (event.state === State.BEGAN) {
      // setIsDragging(true);
      setActive();
      startX.value = pX.value;
      startY.value = pY.value;
    }

    if (event.state === State.END) {
      let targetZoneId = findZoneByCoords(
        G.zones,
        pX.value + width / 2,
        pY.value + height / 2
      );
      if (!targetZoneId || targetZoneId === currZoneId) {
        let pos = G.zones.find((zone) => zone.id === currZoneId);
        pX.value = pos.x;
        pY.value = pos.y;
      } else {
        movePiece(targetZoneId);
      }
      // setIsDragging(false);
    }
  };

  return draggable ? (
    <PanGestureHandler
      ref={panRef}
      onGestureEvent={panGestureHandler}
      onHandlerStateChange={panGestureStateHandler}
    >
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
    </PanGestureHandler>
  ) : (
    <AnimatedContainer
      pX={pX}
      pY={pY}
      width={width}
      height={height}
      style={animatedStyles}
    >
      <PieceContainerPressable
        style={active && activeStyle}
        onPress={setActive}
      >
        <PieceImage source={source} />
      </PieceContainerPressable>
    </AnimatedContainer>
  );
}

export default Piece;
