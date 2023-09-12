import React from 'react';
import {
  Table,
  UI,
  GameViewWrapper,
  useGameState,
  PieceRenderer,
  ZoneRenderer,
} from 'meepl';
import { Text } from 'react-native';
import assets from './gameConfig/assets';
import pieceTypes from './gameConfig/pieceTypes';

export default function Game(props) {
  const { zones, pieces, meta, players, moves } = useGameState(props);

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
      <Table tableWidth={350} tableHeight={350}>
        <Text>Regicide</Text>
        <ZoneRenderer
          devMode
          onHandleZonePress={function (): void {}}
          isZoneAvailable={() => true}
        />
        <PieceRenderer
          draggable
          legalMoveCheck={() => true}
          movePiece={(pieceId, zoneId) => moves.movePiece(pieceId, zoneId)}
          setActive={() => {}}
        />
      </Table>
      <UI>{players[meta.currentPlayerID].name}'s turn!</UI>
    </GameViewWrapper>
  );
}
