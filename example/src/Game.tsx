import { INVALID_MOVE } from 'boardgame.io/core';
import { createGameConfig, createGridZones } from 'meepl';
import { ChessPieceType } from './ChessPieces';

const zones = [
  ...createGridZones({
    rows: 8,
    columns: 8,
    gridSize: 45,
    offsetX: 20,
    offsetY: 20,
  }),
  {
    id: 'multi-zone',
    x: 150,
    y: 420,
    width: 100,
    height: 100,
  },
];

const pieces = [
  {
    id: 'white-rook-1',
    type: ChessPieceType.rook,
    name: 'White Rook 1',
    currZoneId: '0-0',
    owner: '0',
  },
  {
    id: 'white-rook-2',
    type: ChessPieceType.rook,
    name: 'White Rook 2',
    currZoneId: '0-1',
    owner: '0',
  },
];

const moves = {
  // @ts-ignore
  setActivePiece: ({ G, ctx, player }, pieceId) => {
    if (G.pieces.find((p) => p.id === pieceId).owner !== ctx.currentPlayer)
      return INVALID_MOVE;
    player.set({
      ...player,
      activePiece: pieceId,
    });
  },
  // @ts-ignore
  movePiece: ({ G, player }, zoneId) => {
    const currPlayer = player.get();
    const piece = G.pieces.find((p) => p.id === currPlayer.activePiece);
    if (!piece) return INVALID_MOVE;
    piece.currZoneId = zoneId;
    player.set({
      ...currPlayer,
      activePiece: null,
    });
  },
};

const players = {
  '0': {
    name: 'Jareth',
    activePiece: null,
    targetZoneId: null,
  },
  '1': { name: 'Sarah', activePiece: null },
};

const ChessGame = createGameConfig({
  name: 'Chess',
  zones,
  pieces,
  moves,
  players,
  minPlayers: 1,
  maxPlayers: 2,
  undoAllowed: true,
  playerSetup: (playerID) => ({
    name: `Player ${playerID}`,
    activePiece: null,
    targetZoneId: null,
  }),
});

export default ChessGame;
