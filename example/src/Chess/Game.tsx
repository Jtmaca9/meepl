import React from 'react';
import {
  Table,
  Board,
  BottomPanel,
  PieceRenderer,
  ZoneRenderer,
  GameViewWrapper,
  useGameState,
} from 'meepl';
import assets from './assets';
import { isZoneAvailable } from './gameLogic';
import ChessPieces from './chessPieceTypes';

export default function Game(props) {
  const { zones, pieces, moves, handleMove, meta, players } =
    useGameState(props);

  const availableStyle = {
    backgroundColor: 'rgba(0, 0, 200, 0.5)',
  };

  return (
    <GameViewWrapper
      pieceTypes={ChessPieces}
      assets={assets}
      //state
      zones={zones}
      pieces={pieces}
      currentPlayer={players[meta.currentPlayerID]}
      players={players}
      isCurrentPlayer={meta.isCurrentPlayer}
    >
      <Table tableWidth={400} tableHeight={400}>
        <Board height={400} width={400} asset={'Chessboard'} />
        <ZoneRenderer
          devMode
          isZoneAvailable={isZoneAvailable}
          availableStyle={availableStyle}
          onHandleZonePress={(id) => handleMove(moves.movePiece, [id])}
        />
        <PieceRenderer
          draggable
          onDragStart={(id) => moves.setActivePiece(id)}
          onDragEnd={(id, targetZoneId) => moves.movePiece(id, targetZoneId)}
          onSelected={(id) => moves.setActivePiece(id)}
          legalDragCheck={(targetZoneID) =>
            isZoneAvailable({
              id: targetZoneID,
              activePlayer: players[meta.currentPlayerID],
              pieces,
              zones,
            })
          }
        />
      </Table>
      <BottomPanel>
        {players[meta.currentPlayerID].name}'s turn! Active Piece:{' '}
        {players[meta.currentPlayerID].activePiece}
      </BottomPanel>
    </GameViewWrapper>
  );
}
