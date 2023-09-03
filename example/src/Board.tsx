import React from 'react';
import { Table, GameBoard, Zone, UI, Piece } from 'meepl';

export default function Board({ ctx, G, moves }) {
  const activePlayer = G.players[ctx.currentPlayer];

  return (
    <>
      <Table tableWidth={400} tableHeight={400}>
        <GameBoard source={require('../assets/Chessboard.jpeg')}>
          {G.zones.map((zone) => (
            <Zone
              key={`zone-${zone.id}`}
              onPress={() => moves.movePiece(zone.id)}
              G={G}
              {...zone}
            />
          ))}
          {G.pieces.map((piece) => (
            <Piece
              key={`piece-${piece.id}`}
              onPress={() => moves.setActivePiece(piece.id)}
              G={G}
              {...piece}
            />
          ))}
        </GameBoard>
      </Table>
      <UI>
        {activePlayer.name}'s turn! Active Piece: {activePlayer.activePiece}
      </UI>
    </>
  );
}
