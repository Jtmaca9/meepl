import React from 'react';
import { Table, ZoneAndPieceRenderer } from 'meepl';
import assets from '../gameConfig/assets';
import PlayingCards from '../gameConfig/pieceTypes';

function GameTable(props) {
  const { gameState, setActivePiece } = props;
  return (
    <Table
      tableWidth={350}
      tableHeight={350}
      backgroundImageSource={require('../../../assets/woodtexture2.png')}
      backgroundImageProps={{ resizeMode: 'repeat', width: 10, height: 10 }}
    >
      <ZoneAndPieceRenderer
        onHandleZonePress={() => {}}
        isZoneAvailable={() => true}
        isPieceDraggable={() => true}
        legalPieceDragCheck={() => true}
        onDragPieceEnd={(pieceId, zoneId) => {
          gameState.moves.movePiece(pieceId, zoneId);
          setActivePiece(null);
        }}
        onDragPieceStart={(id) => setActivePiece(id)}
        onSelectedPiece={(id) => setActivePiece(id)}
        isCurrentPlayer={gameState.meta.isCurrentPlayer}
        currentPlayer={gameState.players[gameState.meta.currentPlayerID]}
        pieces={gameState.pieces}
        zones={gameState.zones}
        ctx={gameState.ctx}
        moves={gameState.moves}
        availableStyle={{}}
        assets={assets}
        pieceTypes={PlayingCards}
      />
    </Table>
  );
}

export default GameTable;
