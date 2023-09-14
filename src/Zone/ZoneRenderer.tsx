import React, { memo } from 'react';
import Zone from './Zone';
import { ZONE_TYPE, type ZoneType } from './types';
import type { PieceType } from '../Piece/types';
import MultiZone from './MultiZone';

type ZoneRendererProps = {
  onHandleZonePress: (id: string) => void;
  isZoneAvailable: (args: {
    id: string;
    activePlayer: any;
    pieces: PieceType[];
    zones: ZoneType[];
  }) => boolean;
  // passed by parent
  devMode?: boolean;
  ctx?: any;
  moves?: any;
  currentPlayer?: any;
  availableStyle?: any;
  isCurrentPlayer?: boolean;
  zones?: ZoneType[];
  pieces?: PieceType[];
};

function ZoneRenderer(props: ZoneRendererProps) {
  const {
    devMode = false,
    isZoneAvailable = () => false,
    availableStyle = {},
    isCurrentPlayer,
    onHandleZonePress = (id) => console.log(`Zone ${id} pressed!`),
    zones = [],
    pieces = [],
    currentPlayer,
  } = props;

  return (
    <>
      {zones.map((zone) => {
        const { zType, id, x, y, width, height } = zone;
        const available =
          isCurrentPlayer &&
          isZoneAvailable({
            id,
            activePlayer: currentPlayer,
            pieces,
            zones,
          });
        return zType === ZONE_TYPE.multi ? (
          <MultiZone
            key={id}
            devMode={devMode}
            onHandleZonePress={onHandleZonePress}
            available={available}
            availableStyle={availableStyle}
            ctx={props.ctx}
            moves={props.moves}
            pieces={pieces}
            {...zone}
          />
        ) : (
          <Zone
            zType={zType}
            key={id}
            id={id}
            width={width}
            height={height}
            x={x}
            y={y}
            devMode={devMode}
            onPress={() => onHandleZonePress(id)}
            available={available}
            availableStyle={availableStyle}
            ctx={props.ctx}
            moves={props.moves}
            {...zone}
          />
        );
      })}
    </>
  );
}

export default memo(ZoneRenderer);
