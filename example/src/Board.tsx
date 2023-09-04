import React from 'react';
import { Table, GameBoard, UI, PieceRenderer, ZoneRenderer } from 'meepl';
import ChessPieces from './ChessPieces';
import ChessBoardZones from './ChessBoardZones';

export default function Board({ ctx, G, moves }) {
  const activePlayer = G.players[ctx.currentPlayer];

  return (
    <>
      <Table tableWidth={400} tableHeight={400}>
        <GameBoard source={require('../assets/Chessboard.jpeg')} />
        <ZoneRenderer
          devMode
          zones={G.zones}
          types={ChessBoardZones}
          onHandleZonePress={(id) => moves.movePiece(id)}
        />
        <PieceRenderer
          types={ChessPieces}
          pieces={G.pieces}
          G={G}
          onHandlePiecePress={(id) => moves.setActivePiece(id)}
        />
      </Table>
      <UI>
        {activePlayer.name}'s turn! Active Piece: {activePlayer.activePiece}
      </UI>
    </>
  );
}
