import React, { useEffect, useState } from 'react';

export default function GameViewWrapper({
  children,
  G,
  ctx,
  playerID,
  ...props
}: { assets: any[] } & any) {
  const [isCurrentPlayer, setIsCurrentPlayer] = useState(false);
  const [pieces, setPieces] = useState(G.pieces);
  const [zones, setZones] = useState(G.zones);

  useEffect(() => {
    // pieces
    if (!G.pieces) return;
    if (G.pieces.length !== pieces.length) {
      setPieces(G.pieces);
    } else {
      G.pieces.forEach((piece: any, i: number) => {
        if (piece.currZoneId !== pieces[i].currZoneId) {
          setPieces(G.pieces);
          return;
        }
      });
    }
  }, [G, pieces]);

  useEffect(() => {
    // player
    setIsCurrentPlayer(ctx.currentPlayer === playerID);
  }, [ctx, playerID]);

  useEffect(() => {
    // zones
    if (!G.zones) return;
    if (G.zones.length !== zones.length) {
      setZones(G.zones);
    }
  }, [G, zones]);

  return (
    <>
      {children.map((child: any, i) => (
        <child.type
          {...child.props}
          key={`${child.type}-${i}`}
          zones={zones}
          pieces={pieces}
          ctx={ctx}
          playerID={playerID}
          pieceTypes={props.pieceTypes}
          plugins={props.plugins}
          assets={props.assets}
          moves={props.moves}
          isCurrentPlayer={isCurrentPlayer}
        />
      ))}
    </>
  );
}
