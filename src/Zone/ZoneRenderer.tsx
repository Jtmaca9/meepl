import React, { memo, useEffect, useState } from 'react';
import Zone from './Zone';

type ZoneRendererProps = {
  devMode?: boolean;
  G?: any;
  ctx?: any;
  moves?: any;
  plugins?: any;
  onHandleZonePress?: (id: string) => void;
  isZoneAvailable?: (id: string, player: any, args: any) => boolean;
  availableStyle?: any;
  isCurrentPlayer?: boolean;
};

function ZoneRenderer(props: ZoneRendererProps) {
  const {
    devMode = false,
    isZoneAvailable = () => false,
    availableStyle = {},
    isCurrentPlayer,
    onHandleZonePress = (id) => console.log(`Zone ${id} pressed!`),
  } = props;

  const [zones, setZones] = useState(props.G.zones);

  useEffect(() => {
    setZones(props.G.zones);
  }, [props.G.zones]);

  return (
    <>
      {zones.map((zone) => {
        const { id, x, y, width, height } = zone;
        const activePlayer =
          props.plugins.player.data.players[props.ctx.currentPlayer];
        const available =
          isCurrentPlayer &&
          isZoneAvailable(id, activePlayer, {
            G: props.G,
          });
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
            G={props.G}
            ctx={props.ctx}
            moves={props.moves}
          />
        );
      })}
    </>
  );
}

export default memo(ZoneRenderer);
