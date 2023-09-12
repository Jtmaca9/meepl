import { createGameConfig } from 'meepl';

import { zones, zonesPan } from './zones';
import pieces from './pieces';

const moves = {
  movePiece: ({ G }, pieceId, zoneId) => {
    const piece = G.pieces.find((p) => p.id === pieceId);
    piece.currZoneId = zoneId;
  },
};

const RegicideGame = (pan) =>
  createGameConfig({
    name: 'Regicide',
    zones: pan ? zonesPan : zones,
    pieces,
    moves,
    minPlayers: 1,
    maxPlayers: 4,
    undoAllowed: true,
    playerView: (players) => players,
    playerSetup: (playerID) => ({
      name: `Player ${playerID}`,
      id: playerID,
    }),
  });

export default RegicideGame;
