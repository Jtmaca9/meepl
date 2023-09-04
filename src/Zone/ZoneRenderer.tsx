import React from 'react';
import Zone from './Zone';
import type { ZoneType, ZoneBlueprintType } from './types';

type ZoneRendererProps = {
  zones: ZoneType[];
  types: ZoneBlueprintType[];
  devMode?: boolean;
  onHandleZonePress?: (id: string) => void;
};

function ZoneRenderer(props: ZoneRendererProps) {
  const {
    zones,
    types,
    devMode = false,
    onHandleZonePress = (id) => console.log(`Zone ${id} pressed!`),
  } = props;
  return (
    <>
      {zones.map((zone) => {
        const { id, type, x, y } = zone;
        const { width, height } = types.find((t) => t.id === type);
        return (
          <Zone
            key={id}
            id={id}
            width={width}
            height={height}
            x={x}
            y={y}
            devMode={devMode}
            type={type}
            onPress={() => onHandleZonePress(id)}
          />
        );
      })}
    </>
  );
}

export default ZoneRenderer;
