import React, { useEffect, useRef, useState } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

import styled from 'styled-components/native';

import { getZoneX, getZoneY } from '../Zone/utils';
import { ZONE_TYPE, type ZoneType } from '../Zone/types';
import type { PieceType, PieceBlueprintType } from './types';
import { getPieceStartingCoords, getTargetZoneID } from './utils';
import PieceAsset from './PieceAsset';

const AnimatedContainer = styled(Animated.View)<{ UI: boolean }>`
  ${({ UI }) =>
    !UI &&
    `
  position: absolute;
  top: 0;
  left: 0;
`}
  z-index: 1;
`;

const PieceContainer = styled.View<{ width: number; height: number }>`
  width: ${({ width }) => (width ? `${width}px` : '100px')};
  height: ${({ height }) => (height ? `${height}px` : '100px')};
`;

const PieceContainerPressable = styled.TouchableOpacity<{
  width: number;
  height: number;
}>`
  width: ${({ width }) => (width ? `${width}px` : '100px')};
  height: ${({ height }) => (height ? `${height}px` : '100px')};
`;

export type PieceProps = PieceType & {
  onSelected?: (id: string) => void;
  onDragEnd?: (id: string) => void;
  onDragStart?: (id: string) => void;
  children?: React.ReactNode | React.ReactNode[];
  draggable?: boolean;
  available?: boolean;
  assets: any[];
  zones: ZoneType[];
  pieceTypes: PieceBlueprintType[];
  legalDragCheck: any;
  variant?: string;
  state: string;
  UI: boolean;
  tableTransform: { x: number; y: number; scale: number };
};

function Piece(props: PieceProps) {
  const {
    currZoneId,
    id,
    draggable = false,
    available = false,
    assets,
    zones,
    pieceTypes,
    type,
    legalDragCheck,
    variant,
    tableTransform,
    UI,
    state,
    onSelected = () => {},
    onDragStart = () => {},
    onDragEnd = () => {},
  } = props;

  const PT = pieceTypes.find((t) => t.id === type);
  const variantType = PT.variants && variant ? PT.variants[variant] : {};
  const pieceData = Object.assign({}, PT, variantType);

  function getCurrrPieceAsset() {
    return (
      assets[pieceData.states?.[state]?.asset] ||
      assets[pieceData.asset] ||
      null
    );
  }

  const [pieceCurrAsset, setPieceCurrAsset] = useState(getCurrrPieceAsset());

  useEffect(() => {
    if (!state) return;
    setPieceCurrAsset(getCurrrPieceAsset());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const { x: initX, y: initY } = getPieceStartingCoords({
    zones,
    currZoneId,
    UI,
  });

  const pX = useSharedValue(initX);
  const pY = useSharedValue(initY);
  const startX = useSharedValue(initX);
  const startY = useSharedValue(initY);
  const dragging = useSharedValue(false);

  const panRef = useRef(null);

  const pieceOverStyle = {
    zIndex: 99,
  };

  useEffect(() => {
    let zone = zones.find((zone) => zone.id === currZoneId);

    if (!zone) return;

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
            : withTiming(pX.value, { duration: 150 }),
        },
        {
          translateY: dragging.value
            ? pY.value
            : withTiming(pY.value, { duration: 150 }),
        },
      ],
    }),
    [pX, pY, dragging]
  );

  const updatePiecePosition = (event) => {
    if (UI) {
      pX.value = event.translationX + startX.value;
      pY.value = event.translationY + startY.value;
    } else {
      pX.value = event.translationX / tableTransform.scale + startX.value;
      pY.value = event.translationY / tableTransform.scale + startY.value;
    }
  };

  const panGestureHandler = (p) => {
    'worklet';
    const event = p.nativeEvent;
    if (event.state === State.ACTIVE) {
      updatePiecePosition(event);
    }
  };

  const panGestureStateHandler = ({ nativeEvent: event }) => {
    'worklet';
    if (event.state === State.BEGAN) {
      onDragStart(id);
      dragging.value = true;
      startX.value = pX.value;
      startY.value = pY.value;
    }

    if (event.state === State.FAILED || event.state === State.CANCELLED) {
      dragging.value = false;
    }

    if (event.state === State.END) {
      let targetZoneID = getTargetZoneID({
        tableTransform,
        zones,
        event,
        UI,
        pX,
        pY,
        width: pieceData.width,
        height: pieceData.height,
      });

      function returnToCurrentPosition() {
        pX.value = startX.value;
        pY.value = startY.value;
      }

      // TODO - clean this up (helper function in utils?)
      if (!targetZoneID || targetZoneID === currZoneId) {
        returnToCurrentPosition();
      } else {
        let zone = zones.find((zone) => zone.id === targetZoneID);
        if (
          zone.zType !== ZONE_TYPE.slot &&
          legalDragCheck(targetZoneID) &&
          !zone.UI
        ) {
          onDragEnd(targetZoneID);
          if (UI) {
            returnToCurrentPosition();
          }
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
        UI={UI}
        style={[animatedStyles, state === 'active' && pieceOverStyle]}
      >
        <PieceContainer
          width={pieceData.width}
          height={pieceData.height}
          style={pieceData?.states?.[state]?.containerStyle || {}}
        >
          <PieceAsset pieceCurrAsset={pieceCurrAsset} pieceData={pieceData} />
        </PieceContainer>
      </AnimatedContainer>
    </PanGestureHandler>
  ) : (
    <AnimatedContainer
      UI={UI}
      style={[animatedStyles, state === 'active' && pieceOverStyle]}
    >
      <PieceContainerPressable
        width={pieceData.width}
        height={pieceData.height}
        style={pieceData?.states?.[state]?.containerStyle || {}}
        disabled={!available}
        onPress={onSelected}
      >
        <PieceAsset pieceCurrAsset={pieceCurrAsset} pieceData={pieceData} />
      </PieceContainerPressable>
    </AnimatedContainer>
  );
}

export default Piece;
