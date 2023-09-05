import type { ZoneBlueprintType } from 'meepl';

export enum ChessBoardZoneType {
  chessBoard = 'chess-board-zone',
  chessBoardMulti = 'chess-board-multi-zone',
}

const ChessBoardZones: ZoneBlueprintType[] = [
  {
    id: ChessBoardZoneType.chessBoard,
    width: 45,
    height: 45,
  },
  {
    id: ChessBoardZoneType.chessBoardMulti,
    width: 100,
    height: 100,
  },
];

export default ChessBoardZones;
