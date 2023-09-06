import React from 'react';
import Zone from './Zone';

type ZoneRendererProps = {
  devMode?: boolean;
  G?: any;
  ctx?: any;
  moves?: any;
  onHandleZonePress?: (id: string) => void;
};

function ZoneRenderer(props: ZoneRendererProps) {
  const {
    devMode = false,
    onHandleZonePress = (id) => console.log(`Zone ${id} pressed!`),
  } = props;
  return (
    <>
      {props.G.zones.map((zone) => {
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
            G={props.G}
            ctx={props.ctx}
            moves={props.moves}
          />
        );
      })}
    </>
  );
}

export default ZoneRenderer;
