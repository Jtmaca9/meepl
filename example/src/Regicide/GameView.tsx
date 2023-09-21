import React, { useState } from 'react';
import {
  Table,
  BottomPanel,
  GameViewWrapper,
  useGameState,
  UI,
  ZoneAndPieceRenderer,
  PieceRenderer,
} from 'meepl';
import { View } from 'react-native';
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
          onHandleZonePress={() => {}}
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
          <View style={{ flexDirection: 'row' }}>
            <PieceRenderer
              UI={true}
              assets={assets}
              pieceTypes={pieceTypes}
              tableTransform={tableTransform}
              zones={zones}
              isPieceActive={(id) => id === activePiece}
              isPieceDraggable={() => true}
              onDragPieceEnd={(id, targetZoneID) => {
                moves.movePieceFromUIToZone({
                  pieceID: id,
                  uiLocation: 'hand',
                  targetZoneID,
                });
              }}
              isCurrentPlayer={meta.isCurrentPlayer}
              currentPlayer={players[meta.currentPlayerID]}
              onDragPieceStart={(id) => setActivePiece(id)}
              onSelectedPiece={(id) => setActivePiece(id)}
              pieces={players[meta.currentPlayerID].hand}
              legalPieceDragCheck={() => true}
            />
          </View>
        </BottomPanel>
      </UI>
    </GameViewWrapper>
  );
}
