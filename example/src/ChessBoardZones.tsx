import type { ZoneBlueprintType } from 'meepl';

export enum ChessBoardZoneType {
  chessBoard = 'chess-board-zone',
}

const ChessBoardZones: ZoneBlueprintType[] = [
  {
    id: ChessBoardZoneType.chessBoard,
    width: 45,
    height: 45,
  },
];

export default ChessBoardZones;
