import Table from './Table';
import Board from './Board';
import UI from './UI';

// Game
import { Game } from './Game';
import { createGameConfig } from './Game/gameConfig';

// Zone
import { Zone, ZoneRenderer } from './Zone';
import { createGridZones } from './Zone/utils';
import type { ZoneType } from './Zone';

// Piece
import { Piece, PieceRenderer } from './Piece';
import type { PieceBlueprintType, PieceType } from './Piece';

export {
  Table,
  Board,
  UI,
  Game,
  createGameConfig,
  Zone,
  ZoneRenderer,
  createGridZones,
  Piece,
  PieceRenderer,
};
export type { PieceBlueprintType, PieceType, ZoneType };
