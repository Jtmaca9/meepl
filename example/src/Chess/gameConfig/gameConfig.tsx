import { createGridZones } from '../../../../src/Zone/createGridZones';
import { MOVE_ERROR } from '../../../../src/Game/state';
import { createGameConfig } from '../../../../src/Game/gameConfig';
import pieces from './pieces';
import { isZoneAvailable } from '../gameLogic';

const zones = createGridZones({
  rows: 8,
  columns: 8,
  gridSize: 45,
  offsetX: 20,
  offsetY: 20,
});

const moves = {
  // @ts-ignore
  movePiece: ({ G, player }, activePieceID, zoneId) => {
    const currPlayer = player.get();
    const activePiece = G.pieces.find((p) => p.id === activePieceID);
    if (!activePiece) return MOVE_ERROR.INVALID_MOVE;
    if (
      isZoneAvailable(activePieceID, {
        id: zoneId,
        activePlayer: currPlayer,
        pieces: G.pieces,
        zones: G.zones,
      })
    ) {
      const pieceOnZone = G.pieces.find((p) => p.currZoneId === zoneId);
      // take piece
      if (pieceOnZone) {
        G.pieces = G.pieces.filter((p) => p.id !== pieceOnZone.id);
        activePiece.currZoneId = zoneId;
        player.set({
          ...currPlayer,
          activePiece: null,
          takenPieces: [...currPlayer.takenPieces, pieceOnZone],
        });
      } else {
        // move piece
        activePiece.currZoneId = zoneId;
        player.set({
          ...currPlayer,
          activePiece: null,
        });
      }
    } else {
      return MOVE_ERROR.INVALID_MOVE;
    }
  },
};

const ChessGame = createGameConfig({
  name: 'Chess',
  zones,
  pieces,
  moves,
  minPlayers: 1,
  maxPlayers: 2,
  undoAllowed: true,
  playerView: (players) => players,
  playerSetup: (playerID) => ({
    name: `Player ${playerID}`,
    id: playerID,
    activePiece: null,
    takenPieces: [],
  }),
});

export default ChessGame;
