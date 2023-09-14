import React, { useState } from 'react';
import {
  Table,
  BottomPanel,
  GameViewWrapper,
  useGameState,
  PieceRenderer,
  ZoneRenderer,
  UiWrapper,
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
  const { zones, zonesUI, pieces, meta, players, moves } = useGameState(props);

  const [activePiece, setActivePiece] = useState(null);

  return (
    <GameViewWrapper
      pieceTypes={pieceTypes}
      assets={assets}
      //state
      zones={zones}
      zonesUI={zonesUI}
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
          isPieceActive={(id) => id === activePiece}
          legalDragCheck={() => true}
          onDragEnd={(pieceId, zoneId) => {
            moves.movePiece(pieceId, zoneId);
            setActivePiece(null);
          }}
          onDragStart={(id) => setActivePiece(id)}
          onSelected={(id) => setActivePiece(id)}
        />
      </Table>
      <UiWrapper>
        <BottomPanel height={120}>
          <Text>{players[meta.currentPlayerID].name}'s turn!</Text>
          <ZoneRenderer
            devMode
            zones={zonesUI}
            onHandleZonePress={function (): void {}}
            isZoneAvailable={() => true}
          />
        </BottomPanel>
      </UiWrapper>
    </GameViewWrapper>
  );
}
