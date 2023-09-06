import type { PieceBlueprintType, PieceType, ZoneType } from 'meepl';
import { PluginPlayer } from 'boardgame.io/plugins';

const playerViewDefault = (players, playerID) => ({
  [playerID]: players[playerID],
});

type CreateGameConfigArgs = {
  name: string;
  zones?: ZoneType[];
  pieces?: PieceType[];
  pieceTypes?: PieceBlueprintType[];
  moves: any;
  minPlayers?: number;
  maxPlayers?: number;
  undoAllowed?: boolean;
  playerSetup?: (playerID: string) => any;
  playerView?: (players: any, playerID: string) => any;
};

export function createGameConfig(args: CreateGameConfigArgs) {
  const {
    minPlayers = 1,
    maxPlayers = 2,
    name,
    zones = [],
    pieces = [],
    pieceTypes = [],
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
      pieceTypes,
    }),
    moves,
    minPlayers,
    maxPlayers,
    disableUndo: !undoAllowed,
    plugins: [PluginPlayer({ setup: playerSetup, playerView })],
  };
}
