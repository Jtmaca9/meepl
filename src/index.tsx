import Table from './Table/Table';
import Board from './Board';

// Game
import { GameWrapper, GameViewWrapper } from './Game';
import { createGameConfig } from './Game/gameConfig';
import { MOVE_ERROR } from './Game/state';
import useGameState from './Game/state/useGameState';

// Zone
import { Zone, ZoneRenderer } from './Zone';
import { createGridZones, movePieceToZone, createSlotsRow } from './Zone/utils';
import type { ZoneType } from './Zone';
import { ZONE_SPACING } from './Zone/zoneSpacing';
import { ZONE_SPACING_OPTIONS, ZONE_TYPE } from './Zone/types';

// Piece
import { Piece, PieceRenderer } from './Piece';
import type { PieceBlueprintType, PieceType } from './Piece';

// UI
import UiWrapper from './UI/UiWrapper';
import BottomPanel from './UI/BottomPanel';

export {
  Table,
  Board,
  BottomPanel,
  UiWrapper,
  GameWrapper,
  useGameState,
  GameViewWrapper,
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
};
export type { PieceBlueprintType, PieceType, ZoneType };
