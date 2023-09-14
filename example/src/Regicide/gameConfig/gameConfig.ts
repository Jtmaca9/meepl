import { createGameConfig, movePieceToZone } from 'meepl';

import { zones, zonesPan, zonesUIPan } from './zones';
import pieces from './pieces';

const moves = {
  movePiece: ({ G }, pieceId, zoneId) => {
    movePieceToZone({ G, pieceId, zoneId });
  },
};

const RegicideGame = (pan) =>
  createGameConfig({
    name: 'Regicide',
    zones: pan ? zonesPan : zones,
    zonesUI: zonesUIPan,
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
