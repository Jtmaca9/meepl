import React, { memo } from 'react';
import Zone from './Zone';
import type { ZoneProps } from './Zone';

type MultiZoneProps = ZoneProps & {
  onHandleZonePress: (zoneId: string) => void;
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

  return (
    <Zone
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
  );
}

export default memo(MultiZone);
