import Table from './Table/Table';
import Board from './Board';

// Game
import { GameWrapper } from './Game';
import { createGameConfig } from './Game/gameConfig';
import { MOVE_ERROR } from './Game/state';
import useGameState from './Game/state/useGameState';

// Zone
import { Zone, ZoneRenderer } from './Zone';
import { movePieceToZone, createSlotsRow } from './Zone/utils';
import { createGridZones } from './Zone/createGridZones';
import type { ZoneType } from './Zone';
import { ZONE_SPACING } from './Zone/zoneSpacing';
import { ZONE_SPACING_OPTIONS, ZONE_TYPE } from './Zone/types';

// Piece
import { Piece, PieceRenderer } from './Piece';
import { createPieceOnTable } from './Piece/utils';
import type { PieceBlueprintType, PieceType } from './Piece';

// UI
import UI from './UI/UI';
import BottomPanel from './UI/BottomPanel';

//ZoneAndPieceRenderer
import ZoneAndPieceRenderer from './ZoneAndPieceRenderer/ZoneAndPieceRenderer';

export {
  Table,
  Board,
  BottomPanel,
  UI,
  GameWrapper,
  useGameState,
  createGameConfig,
  MOVE_ERROR,
  Zone,
  ZoneRenderer,
  ZONE_SPACING,
  ZONE_TYPE,
  ZONE_SPACING_OPTIONS,
  createGridZones,
  createSlotsRow,
  movePieceToZone,
  Piece,
  PieceRenderer,
  createPieceOnTable,
  ZoneAndPieceRenderer,
};
export type { PieceBlueprintType, PieceType, ZoneType };
