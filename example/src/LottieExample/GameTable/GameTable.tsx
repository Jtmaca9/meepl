import React from 'react';
import { Table, ZoneAndPieceRenderer } from 'meepl';
import assets from '../gameConfig/assets';
import PlayingCards from '../gameConfig/pieceTypes';

function GameTable(props) {
  const { gameState } = props;
  return (
    <Table
      setTableTransform={gameState.setTableTransform}
      tableWidth={1000}
      tableHeight={1000}
      backgroundImageSource={require('../../../assets/woodtexture2.png')}
      backgroundImageProps={{ resizeMode: 'repeat', width: 10, height: 10 }}
    >
      <ZoneAndPieceRenderer
        devMode={true}
        onHandleZonePress={() => {}}
        isZoneAvailable={() => true}
        isPieceDraggable={() => true}
        legalPieceDragCheck={() => true}
        onDragPieceEnd={(pieceId, zoneId) => {
          gameState.moves.movePiece(pieceId, zoneId);
          gameState.moves.setPieceState(pieceId, 'default');
        }}
        onDragPieceStart={(id) => gameState.moves.setPieceState(id, 'active')}
        onSelectedPiece={(id) => gameState.moves.setPieceState(id, 'active')}
        isCurrentPlayer={gameState.meta.isCurrentPlayer}
        currentPlayer={gameState.players[gameState.meta.currentPlayerID]}
        pieces={gameState.pieces}
        zones={gameState.zones}
        ctx={gameState.ctx}
        moves={gameState.moves}
        availableStyle={{}}
        assets={assets}
        pieceTypes={PlayingCards}
        tableTransform={gameState.tableTransform}
      />
    </Table>
  );
}

export default GameTable;
