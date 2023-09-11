import { createGameConfig } from 'meepl';

import zones from './zones';
import pieces from './pieces';

const moves = {};

const RegicideGame = createGameConfig({
  name: 'Regicide',
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

export default RegicideGame;
