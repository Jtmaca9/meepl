import React from 'react';
import { BottomPanel, PieceRenderer, UI } from 'meepl';
import styled from 'styled-components/native';
import { View } from 'react-native';
import assets from '../gameConfig/assets';
import pieceTypes from '../gameConfig/pieceTypes';
import { zones } from '../gameConfig/zones';

const Text = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #333;
`;

function GameUI(props) {
  const {
    gameState: { players, moves, meta, tableTransform },
    activePiece,
    setActivePiece,
  } = props;
  return (
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
            tableScale={tableTransform.scale}
          />
        </View>
      </BottomPanel>
    </UI>
  );
}

export default GameUI;
