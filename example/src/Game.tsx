import React from 'react';
import {
  Table,
  Board,
  UI,
  PieceRenderer,
  ZoneRenderer,
  GameViewWrapper,
} from 'meepl';
import assets from './assets';
import { isZoneAvailable } from './gameLogic';
import ChessPieces from './chessPieceTypes';

export default function Game(props) {
  const { G, ctx, plugins, moves } = props;
  const activePlayer = plugins.player.data.players[ctx.currentPlayer];

  const availableStyle = {
    backgroundColor: 'rgba(0, 0, 200, 0.5)',
  };

  return (
    <GameViewWrapper assets={assets} pieceTypes={ChessPieces} {...props}>
      <Table tableWidth={400} tableHeight={400}>
        <Board height={400} width={400} asset={'Chessboard'} />
        <ZoneRenderer
          isZoneAvailable={isZoneAvailable}
          availableStyle={availableStyle}
          onHandleZonePress={(id) => moves.movePiece(id)}
        />
        <PieceRenderer
          isActive={(id) => id === activePlayer.activePiece}
          isAvailable={(id) => {
            const piece = G.pieces.find((p) => p.id === id);
            if (!piece) return false;
            return ctx.currentPlayer === piece.owner;
          }}
          setActive={(id) => moves.setActivePiece(id)}
          movePiece={(id) => moves.movePiece(id)}
        />
      </Table>
      <UI>
        {activePlayer.name}'s turn! Active Piece: {activePlayer.activePiece}
      </UI>
    </GameViewWrapper>
  );
}
