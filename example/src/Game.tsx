import { INVALID_MOVE } from 'boardgame.io/core';
import { createGridZones } from 'meepl';
import { ChessPieceType } from './ChessPieces';

export const Chess = {
  setup: () => ({
    zones: createGridZones({
      rows: 8,
      columns: 8,
      gridSize: 45,
      devMode: true,
      offsetX: 20,
      offsetY: 20,
    }),
    players: {
      '0': {
        name: 'Jareth',
        activePiece: null,
      },
      '1': { name: 'Sarah', activePiece: null },
    },
    pieces: [
      {
        id: 'white-rook',
        type: ChessPieceType.rook,
        name: 'White Rook',
        currZoneId: '0-0',
        owner: '0',
      },
    ],
  }),

  moves: {
    // @ts-ignore
    setActivePiece: ({ G, ctx }, pieceId) => {
      const player = G.players[ctx.currentPlayer];
      if (G.pieces.find((p) => p.id === pieceId).owner !== ctx.currentPlayer)
        return INVALID_MOVE;
      player.activePiece = pieceId;
    },
    // @ts-ignore
    movePiece: ({ G, ctx }, zoneId) => {
      const player = G.players[ctx.currentPlayer];
      const piece = G.pieces.find((p) => p.id === player.activePiece);
      if (!piece) return INVALID_MOVE;
      piece.currZoneId = zoneId;
      player.activePiece = null;
    },
  },
};
