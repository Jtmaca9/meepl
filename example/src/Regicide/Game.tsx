import React from 'react';
import { Table, UI, GameViewWrapper, useGameState, PieceRenderer } from 'meepl';
import assets from './gameConfig/assets';
import pieceTypes from './gameConfig/pieceTypes';
import { Text } from 'react-native';

export default function Game(props) {
  const { zones, pieces, meta, players } = useGameState(props);

  return (
    <GameViewWrapper
      pieceTypes={pieceTypes}
      assets={assets}
      //state
      zones={zones}
      pieces={pieces}
      currentPlayer={players[meta.currentPlayerID]}
      players={players}
      isCurrentPlayer={meta.isCurrentPlayer}
    >
      <Table tableWidth={400} tableHeight={400}>
        <Text>Regicide</Text>
        <PieceRenderer
          legalMoveCheck={() => true}
          movePiece={() => {}}
          setActive={() => {}}
        />
      </Table>
      <UI>{players[meta.currentPlayerID].name}'s turn!</UI>
    </GameViewWrapper>
  );
}
