import React from 'react';
import Zone from './Zone';
import type { ZoneType } from './types';

type ZoneRendererProps = {
  zones: ZoneType[];
  devMode?: boolean;
  onHandleZonePress?: (id: string) => void;
};

function ZoneRenderer(props: ZoneRendererProps) {
  const {
    zones,
    devMode = false,
    onHandleZonePress = (id) => console.log(`Zone ${id} pressed!`),
  } = props;
  return (
    <>
      {zones.map((zone) => {
        const { id, x, y, width, height } = zone;
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
          />
        );
      })}
    </>
  );
}

export default ZoneRenderer;
