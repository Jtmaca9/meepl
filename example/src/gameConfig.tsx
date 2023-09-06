import { createGameConfig, createGridZones, MOVE_ERROR } from 'meepl';
import ChessPieces, { ChessPieceType } from './ChessPieces';

const zones = createGridZones({
  rows: 8,
  columns: 8,
  gridSize: 45,
  offsetX: 20,
  offsetY: 20,
});

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
    owner: '1',
  },
];

const moves = {
  // @ts-ignore
  setActivePiece: ({ G, ctx, player }, pieceId) => {
    if (G.pieces.find((p) => p.id === pieceId).owner !== ctx.currentPlayer)
      return MOVE_ERROR.INVALID_MOVE;
    player.set({
      ...player.get(),
      activePiece: pieceId,
    });
  },
  // @ts-ignore
  movePiece: ({ G, player }, zoneId) => {
    const currPlayer = player.get();
    const piece = G.pieces.find((p) => p.id === currPlayer.activePiece);
    if (!piece) return MOVE_ERROR.INVALID_MOVE;
    piece.currZoneId = zoneId;
    player.set({
      ...currPlayer,
      activePiece: null,
    });
  },
};

const ChessGame = createGameConfig({
  name: 'Chess',
  zones,
  pieces,
  pieceTypes: ChessPieces,
  moves,
  minPlayers: 1,
  maxPlayers: 2,
  undoAllowed: true,
  playerView: (players) => players,
  playerSetup: (playerID) => ({
    name: `Player ${playerID}`,
    activePiece: null,
    targetZoneId: null,
  }),
});

export default ChessGame;
