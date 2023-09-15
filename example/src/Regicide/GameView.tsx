import React from 'react';
import {
  Table,
  BottomPanel,
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

  const TableStyle = {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    padding: 50,
  };

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
      <Table fixed containerStyle={TableStyle}>
        <Text>Regicide</Text>
        <ZoneRenderer
          devMode
          onHandleZonePress={function (): void {}}
          isZoneAvailable={() => true}
        />
        <PieceRenderer
          isPieceDraggable={() => true}
          legalPieceDragCheck={() => true}
          onDragPieceEnd={(pieceId, zoneId) => moves.movePiece(pieceId, zoneId)}
          onDragPieceStart={() => {}}
          onSelectedPiece={() => {}}
        />
      </Table>
      <BottomPanel>{players[meta.currentPlayerID].name}'s turn!</BottomPanel>
    </GameViewWrapper>
  );
}
