import React from 'react';
import { Table, Board, UI, PieceRenderer, ZoneRenderer } from 'meepl';
import ChessPieces from './ChessPieces';

export default function GameView({ G, ctx, plugins, moves }) {
  const activePlayer = plugins.player.data.players[ctx.currentPlayer];

  const outerStyle = {
    backgroundColor: 'green',
  };

  return (
    <>
      <Table tableWidth={400} tableHeight={800}>
        <Board
          height={400}
          width={400}
          source={require('../assets/Chessboard.jpeg')}
        />
        <Board
          outerStyle={outerStyle}
          height={100}
          width={100}
          x={150}
          y={420}
        />
        <ZoneRenderer
          devMode
          zones={G.zones}
          onHandleZonePress={(id) => moves.movePiece(id)}
        />
        <PieceRenderer
          types={ChessPieces}
          pieces={G.pieces}
          G={G}
          isPieceActive={(id) => id === activePlayer.activePiece}
          setActive={(id) => moves.setActivePiece(id)}
          movePiece={(id) => moves.movePiece(id)}
        />
      </Table>
      <UI>
        {activePlayer.name}'s turn! Active Piece: {activePlayer.activePiece}
      </UI>
    </>
  );
}
