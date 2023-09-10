import React from 'react';

export default function GameViewWrapper({
  children,
  playerID,
  ...props
}: { assets: any[] } & any) {
  return (
    <>
      {children.map((child: any, i) => (
        <child.type
          {...child.props}
          key={`${child.type}-${i}`}
          zones={props.zones}
          pieces={props.pieces}
          playerID={playerID}
          pieceTypes={props.pieceTypes}
          players={props.players}
          assets={props.assets}
          moves={props.moves}
          currentPlayer={props.currentPlayer}
          isCurrentPlayer={props.isCurrentPlayer}
        />
      ))}
    </>
  );
}
