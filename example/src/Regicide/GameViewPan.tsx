import React, { useState } from 'react';
import {
  Table,
  BottomPanel,
  GameViewWrapper,
  useGameState,
  UI,
  ZoneAndPieceRenderer,
} from 'meepl';
import styled from 'styled-components/native';
import assets from './gameConfig/assets';
import pieceTypes from './gameConfig/pieceTypes';

const Text = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #333;
`;

export default function Game(props) {
  const {
    zones,
    pieces,
    meta,
    players,
    moves,
    tableTransform,
    setTableTransform,
  } = useGameState(props);

  const [activePiece, setActivePiece] = useState(null);

  return (
    <GameViewWrapper
      pieceTypes={pieceTypes}
      assets={assets}
      //state
      zones={zones}
      pieces={pieces}
      currentPlayer={players[meta.currentPlayerID]}
      players={players}
      tableTransform={tableTransform}
      isCurrentPlayer={meta.isCurrentPlayer}
      setTableTransform={setTableTransform}
    >
      <Table tableWidth={350} tableHeight={350}>
        <Text>Regicide</Text>
        <ZoneAndPieceRenderer
          devMode
          onHandleZonePress={function (): void {}}
          isZoneAvailable={() => true}
          isPieceDraggable={() => true}
          isPieceActive={(id) => id === activePiece}
          legalPieceDragCheck={() => true}
          onDragPieceEnd={(pieceId, zoneId) => {
            moves.movePiece(pieceId, zoneId);
            setActivePiece(null);
          }}
          onDragPieceStart={(id) => setActivePiece(id)}
          onSelectedPiece={(id) => setActivePiece(id)}
        />
      </Table>
      <UI>
        <BottomPanel height={120}>
          <Text>{players[meta.currentPlayerID].name}'s turn!</Text>
        </BottomPanel>
        <ZoneAndPieceRenderer
          UI
          isPieceDraggable={() => true}
          isPieceActive={(id) => id === activePiece}
          legalPieceDragCheck={() => true}
          onDragPieceEnd={(pieceId, zoneId) => {
            moves.movePiece(pieceId, zoneId);
            setActivePiece(null);
          }}
          onDragPieceStart={(id) => setActivePiece(id)}
          onSelectedPiece={(id) => setActivePiece(id)}
          devMode
          onHandleZonePress={() => {}}
          isZoneAvailable={() => true}
        />
      </UI>
    </GameViewWrapper>
  );
}
