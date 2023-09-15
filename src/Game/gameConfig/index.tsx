import { PluginPlayer } from 'boardgame.io/plugins';
import type { ZoneType } from '../../Zone/types';
import type { PieceType } from '../../Piece/types';

const playerViewDefault = (players, playerID) => ({
  [playerID]: players[playerID],
});

type CreateGameConfigArgs = {
  name: string;
  zones?: ZoneType[];
  pieces?: PieceType[];
  moves: any;
  minPlayers?: number;
  maxPlayers?: number;
  undoAllowed?: boolean;
  playerSetup?: (playerID: string) => any;
  playerView?: (players: any, playerID: string) => any;
};

export function createGameConfig(args: CreateGameConfigArgs): any {
  const {
    minPlayers = 1,
    maxPlayers = 2,
    name,
    zones = [],
    pieces = [],
    moves = {},
    undoAllowed = false,
    playerView = playerViewDefault,
    playerSetup = () => ({}),
  } = args;
  return {
    name,
    setup: () => ({
      zones,
      pieces,
    }),
    moves,
    minPlayers,
    maxPlayers,
    disableUndo: !undoAllowed,
    plugins: [PluginPlayer({ setup: playerSetup, playerView })],
  };
}
