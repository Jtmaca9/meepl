import { createGameConfig, createGridZones, movePieceToZone } from 'meepl';

import pieces from './pieces';

const zones = createGridZones({
  rows: 2,
  columns: 1,
  gridSizeX: 240,
  gridSizeY: 100,
  offsetX: 100,
  offsetY: 100,
  gapX: 50,
  gapY: 25,
});

const moves = {
  movePiece: ({ G }, pieceId, zoneId) => {
    movePieceToZone({ G, pieceId, zoneId });
  },
  setPieceState: ({ G }, pieceId, state) => {
    G.pieces.find((p) => p.id === pieceId).state = state;
  },
};

const LottieGame = createGameConfig({
  name: 'Lottie',
  zones,
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

export default LottieGame;
