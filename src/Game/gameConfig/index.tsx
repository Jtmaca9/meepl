import { PluginPlayer } from 'boardgame.io/plugins';
import { ZONE_TYPE, type ZoneType } from '../../Zone/types';
import type { PieceType } from '../../Piece/types';

const playerViewDefault = (players, playerID) => ({
  [playerID]: players[playerID],
});

type CreateGameConfigArgs = {
  name: string;
  zones?: ZoneType[];
  pieces?: PieceType[];
  moves: any;
  meta?: any;
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
    data = {},
    zones = [],
    pieces = [],
    moves = {},
    undoAllowed = false,
    playerView = playerViewDefault,
    playerSetup = () => ({}),
  } = args;

  // slot any pieces in multi zones
  pieces.forEach((piece) => {
    if (piece.currZoneId) {
      let zone = zones.find((zone) => zone.id === piece.currZoneId);
      if (zone && zone.zType === ZONE_TYPE.multi) {
        let slot = zone.slots.find((slot) => slot.pieceId === null);
        if (!slot) {
          console.error("Bad config: can't find empty slot in zone");
          return;
        }
        slot.pieceId = piece.id;
      }
    }
  });

  return {
    name,
    setup: () => ({
      zones,
      pieces,
      data,
    }),
    moves,
    minPlayers,
    maxPlayers,
    disableUndo: !undoAllowed,
    plugins: [PluginPlayer({ setup: playerSetup, playerView })],
  };
}
