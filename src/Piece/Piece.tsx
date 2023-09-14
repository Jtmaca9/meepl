// @ts-nocheck
import React, { useEffect, useRef, useState, memo } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import type { StyleProp, View } from 'react-native';
import { findZoneByCoords, getZoneX, getZoneY } from '../Zone/utils';
import { ZONE_TYPE, type ZoneType } from '../Zone/types';
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

export type PieceProps = PieceType & {
  onSelected?: (id: string) => void;
  onDragEnd?: (id: string) => void;
  onDragStart?: (id: string) => void;
  activeStyle?: StyleProp<View>;
  availableStyle?: StyleProp<View>;
  defaultStyle?: StyleProp<View>;
  children?: React.ReactNode | React.ReactNode[];
  draggable?: boolean;
  active?: boolean;
  available?: boolean;
  assets: any[];
  tableScale?: number;
  zones: ZoneType[];
  pieceTypes: PieceBlueprintType[];
  legalDragCheck: any;
  variant?: string;
};

enum COMPONENT_STATE {
  active = 'active',
  available = 'available',
  default = 'default',
}

function Piece(props: PieceProps) {
  const {
    currZoneId,
    id,
    draggable = false,
    active = false,
    available = false,
    assets,
    tableScale = 1,
    zones,
    pieceTypes,
    type,
    legalDragCheck,
    variant,
    onSelected = () => {},
    onDragStart = () => {},
    onDragEnd = () => {},
  } = props;

  const PT = pieceTypes.find((t) => t.id === type);
  const variantType = PT.variants && variant ? PT.variants[variant] : {};
  const { asset, width, height, activeStyle, availableStyle, defaultStyle } =
    Object.assign({}, PT, variantType);

  const [componentState, setComponentState] = useState(COMPONENT_STATE.default);
  const [componentStyle, setComponentStyle] = useState({});

  const [assetCache] = useState(assets[asset]);

  useEffect(() => {
    if (active) {
      setComponentState(COMPONENT_STATE.active);
      setComponentStyle([defaultStyle, activeStyle]);
    } else if (available) {
      setComponentState(COMPONENT_STATE.available);
      setComponentStyle([defaultStyle, availableStyle]);
    } else {
      setComponentState(COMPONENT_STATE.default);
      setComponentStyle(defaultStyle);
    }
  }, [
    active,
    available,
    componentState,
    activeStyle,
    availableStyle,
    defaultStyle,
  ]);

  // Find and set initail piece position
  let initZone = zones.find((zone) => zone.id === currZoneId) || { x: 0, y: 0 };
  const initX = getZoneX(initZone);
  const initY = getZoneY(initZone);
  const pX = useSharedValue(initX);
  const pY = useSharedValue(initY);
  const startX = useSharedValue(initX);
  const startY = useSharedValue(initY);
  const dragging = useSharedValue(false);

  const panRef = useRef(null);

  const pieceOverStyle = {
    zIndex: 999,
  };

  useEffect(() => {
    let zone = zones.find((zone) => zone.id === currZoneId);

    let zoneX, zoneY;

    if (zone.zType === ZONE_TYPE.multi) {
      let slot = zone.slots.find((slot) => slot.pieceId === id);
      if (!slot) return;
      zoneX = getZoneX(zone) + slot.x || 0;
      zoneY = getZoneY(zone) + slot.y || 0;
    } else {
      zoneX = getZoneX(zone) || 0;
      zoneY = getZoneY(zone) || 0;
    }

    if (zoneX === pX.value && zoneY === pY.value) return;

    pX.value = zoneX;
    pY.value = zoneY;
  }, [currZoneId, zones, pX, pY, id]);

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
      onDragStart();
      dragging.value = true;
      startX.value = pX.value;
      startY.value = pY.value;
    }

    if (event.state === State.FAILED || event.state === State.CANCELLED) {
      dragging.value = false;
    }

    if (event.state === State.END) {
      let targetZoneId = findZoneByCoords(
        zones,
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
        let zone = zones.find((zone) => zone.id === targetZoneId);
        if (zone.zType !== ZONE_TYPE.slot && legalDragCheck(targetZoneId)) {
          let x = getZoneX(zone);
          let y = getZoneY(zone);
          pX.value = x;
          pY.value = y;
          onDragEnd(targetZoneId);
        } else {
          returnToCurrentPosition();
        }
      }
      dragging.value = false;
    }
  };

  return draggable ? (
    <PanGestureHandler
      ref={panRef}
      onGestureEvent={panGestureHandler}
      onHandlerStateChange={panGestureStateHandler}
      enabled={available}
    >
      <AnimatedContainer
        pX={pX}
        pY={pY}
        width={width}
        height={height}
        style={[animatedStyles, active && pieceOverStyle]}
      >
        <PieceContainer style={componentStyle}>
          <PieceImage source={assetCache} resizeMode="contain" />
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
      <PieceContainerPressable
        style={componentStyle}
        disabled={!available}
        onPress={onSelected}
      >
        <PieceImage source={assetCache} resizeMode="contain" />
      </PieceContainerPressable>
    </AnimatedContainer>
  );
}

export default memo(Piece);
