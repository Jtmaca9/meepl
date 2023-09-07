// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react';
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
  z-index: 1;
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
    activeStyle?: StyleProp<View>;
    availableStyle?: StyleProp<View>;
    children?: React.ReactNode | React.ReactNode[];
    setActive?: (id: string) => void;
    movePiece?: (id: string) => void;
    draggable?: boolean;
    active?: boolean;
    available?: boolean;
    G: any;
    ctx: any;
    moves: any;
    assets: any[];
    tableScale?: number;
  };

enum COMPONENT_STATE {
  active = 'active',
  available = 'available',
  default = 'default',
}

function Piece(props: PieceProps) {
  const {
    width,
    height,
    currZoneId,
    G,
    draggable = true,
    setActive,
    movePiece,
    active = false,
    activeStyle = {},
    available = false,
    availableStyle = {},
    asset,
    assets,
    tableScale = 1,
  } = props;

  const [componentState, setComponentState] = useState(COMPONENT_STATE.default);
  const [componentStyle, setComponentStyle] = useState({});

  useEffect(() => {
    if (active) {
      setComponentState(COMPONENT_STATE.active);
      setComponentStyle(activeStyle);
    } else if (available) {
      setComponentState(COMPONENT_STATE.available);
      setComponentStyle(availableStyle);
    } else {
      setComponentState(COMPONENT_STATE.default);
      setComponentStyle({});
    }
  }, [active, available, componentState, activeStyle, availableStyle]);

  // Find and set initail piece position
  let initPos = G.zones.find((zone) => zone.id === currZoneId);
  const pX = useSharedValue(initPos.x);
  const pY = useSharedValue(initPos.y);
  const startX = useSharedValue(initPos.x);
  const startY = useSharedValue(initPos.y);
  const dragging = useSharedValue(false);

  const panRef = useRef(null);

  const pieceOverStyle = {
    zIndex: 2,
  };

  useEffect(() => {
    let { x, y } = G.zones.find((zone) => zone.id === currZoneId);

    if (x === pX.value && y === pY.value) return;

    pX.value = x;
    pY.value = y;
  }, [currZoneId, G.zones, pX, pY]);

  const animatedStyles = useAnimatedStyle(
    () => ({
      transform: [
        {
          translateX: dragging.value
            ? pX.value
            : withTiming(pX.value, { duration: 200 }),
        },
        {
          translateY: dragging.value
            ? pY.value
            : withTiming(pY.value, { duration: 200 }),
        },
      ],
    }),
    [pX, pY, dragging]
  );

  const panGestureHandler = (p) => {
    'worklet';
    const event = p.nativeEvent;
    if (event.state === State.ACTIVE) {
      pX.value = event.translationX * (1 / tableScale) + startX.value;
      pY.value = event.translationY * (1 / tableScale) + startY.value;
    }
  };

  const panGestureStateHandler = ({ nativeEvent: event }) => {
    'worklet';
    if (event.state === State.BEGAN) {
      setActive();
      dragging.value = true;
      startX.value = pX.value;
      startY.value = pY.value;
    }

    if (event.state === State.FAILED || event.state === State.CANCELLED) {
      dragging.value = false;
    }

    if (event.state === State.END) {
      let targetZoneId = findZoneByCoords(
        G.zones,
        pX.value + width / 2,
        pY.value + height / 2
      );

      function returnToCurrentPosition() {
        pX.value = startX.value;
        pY.value = startY.value;
      }

      if (!targetZoneId || targetZoneId === currZoneId) {
        returnToCurrentPosition();
      } else {
        !movePiece(targetZoneId) && returnToCurrentPosition();
      }
      dragging.value = false;
    }
  };

  return draggable && available ? (
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
        style={[animatedStyles, active && pieceOverStyle]}
      >
        <PieceContainer>
          <PieceImage style={componentStyle} source={assets[asset]} />
        </PieceContainer>
      </AnimatedContainer>
    </PanGestureHandler>
  ) : (
    <AnimatedContainer
      pX={pX}
      pY={pY}
      width={width}
      height={height}
      style={[animatedStyles, active && pieceOverStyle]}
    >
      <PieceContainerPressable disabled={!available} onPress={setActive}>
        <PieceImage style={componentStyle} source={assets[asset]} />
      </PieceContainerPressable>
    </AnimatedContainer>
  );
}

export default Piece;
