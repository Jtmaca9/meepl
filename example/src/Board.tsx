import React from 'react';
import { Table, GameBoard, Zone, UI, PieceRenderer } from 'meepl';
import ChessPieces from './ChessPieces';

export default function Board({ ctx, G, moves }) {
  const activePlayer = G.players[ctx.currentPlayer];

  return (
    <>
      <Table tableWidth={400} tableHeight={400}>
        <GameBoard source={require('../assets/Chessboard.jpeg')} />
        {G.zones.map((zone) => (
          <Zone
            key={`zone-${zone.id}`}
            onPress={() => moves.movePiece(zone.id)}
            G={G}
            {...zone}
          />
        ))}
        <PieceRenderer
          types={ChessPieces}
          pieces={G.pieces}
          G={G}
          handlePiecePress={(id) => moves.setActivePiece(id)}
        />
      </Table>
      <UI>
        {activePlayer.name}'s turn! Active Piece: {activePlayer.activePiece}
      </UI>
    </>
  );
}
