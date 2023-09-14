import React, { memo, useEffect, useState } from 'react';
import Zone from './Zone';
import type { ZoneProps } from './Zone';
import { ZONE_TYPE, type SlotType } from './types';
import type { PieceType } from '../Piece/types';
import { ZONE_SPACING } from './zoneSpacing';

type MultiZoneProps = ZoneProps & {
  onHandleZonePress: (zoneId: string) => void;
  pieces: PieceType[];
  slots: SlotType[];
};

function MultiZone(props: MultiZoneProps) {
  const {
    id,
    width,
    height,
    x,
    y,
    devMode,
    onHandleZonePress,
    available,
    availableStyle,
  } = props;

  let [xCoord, setXCoord] = useState(
    typeof x === 'number' ? x : ZONE_SPACING[x](width)
  );
  let [yCoord, setYCoord] = useState(
    typeof y === 'number' ? y : ZONE_SPACING[y](height)
  );

  useEffect(() => {
    if (typeof x === 'string') {
      setXCoord(ZONE_SPACING[x](width));
    } else {
      setXCoord(x);
    }
    if (typeof y === 'string') {
      setYCoord(ZONE_SPACING[y](height));
    } else {
      setYCoord(y);
    }
  }, [x, y, width, height]);

  return (
    <>
      <Zone
        zType={ZONE_TYPE.multi}
        slots={props.slots}
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
      />
      {props.slots.map((slot) => {
        const { id, x, y } = slot;
        return (
          <Zone
            zType={ZONE_TYPE.slot}
            key={id}
            id={id}
            width={25}
            height={25}
            x={xCoord + x}
            y={yCoord + y}
            devMode={true}
            onPress={() => {}}
            available={available}
            availableStyle={availableStyle}
            ctx={props.ctx}
            moves={props.moves}
          />
        );
      })}
    </>
  );
}

export default memo(MultiZone);
