import { createGameConfig } from 'meepl';

const ChessGame = createGameConfig({
  name: 'Chess',
  zones: [],
  pieces: [],
  moves: {},
  minPlayers: 1,
  maxPlayers: 2,
  undoAllowed: true,
  playerView: (players: any, playerID: string) => ({
    [playerID]: players[playerID],
  }),
  playerSetup: (playerID: string) => ({
    name: `Player ${playerID}`,
    id: playerID,
    activePiece: null,
    takenPieces: [],
  }),
});

export default ChessGame;
