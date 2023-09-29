import React, { useEffect, useState } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import styled from 'styled-components/native';

import { getZoneX, getZoneY } from '../Zone/utils';
import { ZONE_TYPE, type ZoneType } from '../Zone/types';
import type { PieceType, PieceBlueprintType } from './types';
import { getPieceStartingCoords } from './utils';
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

const PieceContainerPressable = styled.TouchableOpacity<{
  width: number;
  height: number;
}>`
  width: ${({ width }) => (width ? `${width}px` : '100px')};
  height: ${({ height }) => (height ? `${height}px` : '100px')};
`;

export type PieceProps = PieceType & {
  onSelected?: (id: string) => void;
  children?: React.ReactNode | React.ReactNode[];
  available?: boolean;
  assets: any[];
  zones: ZoneType[];
  pieceTypes: PieceBlueprintType[];
  variant?: string;
  state: string;
  UI: boolean;
  tableTransform: { x: number; y: number; scale: number };
};

function Piece(props: PieceProps) {
  const {
    currZoneId,
    id,
    available = false,
    assets,
    zones,
    pieceTypes,
    type,
    variant,
    UI,
    state,
    onSelected = () => {},
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currZoneId]);

  const animatedStyles = useAnimatedStyle(
    () => ({
      transform: [
        {
          translateX: withTiming(pX.value, { duration: 150 }),
        },
        {
          translateY: withTiming(pY.value, { duration: 150 }),
        },
      ],
    }),
    [pX, pY]
  );

  return (
    <AnimatedContainer
      UI={UI}
      style={[animatedStyles, state === 'active' && pieceOverStyle]}
    >
      <PieceContainerPressable
        width={pieceData.width}
        height={pieceData.height}
        disabled={!available}
        onPress={onSelected}
      >
        <PieceAsset pieceCurrAsset={pieceCurrAsset} pieceData={pieceData} />
      </PieceContainerPressable>
    </AnimatedContainer>
  );
}

export default Piece;
