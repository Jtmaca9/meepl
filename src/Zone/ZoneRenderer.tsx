import React from 'react';
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
};

function ZoneRenderer(props: ZoneRendererProps) {
  const {
    devMode = false,
    isZoneAvailable = () => false,
    availableStyle = {},
    onHandleZonePress = (id) => console.log(`Zone ${id} pressed!`),
  } = props;
  return (
    <>
      {props.G.zones.map((zone) => {
        const { id, x, y, width, height } = zone;
        const activePlayer =
          props.plugins.player.data.players[props.ctx.currentPlayer];
        const available = isZoneAvailable(id, activePlayer, {
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

export default ZoneRenderer;
