import type { PieceType } from 'meepl';

export enum ChessPieceType {
  rook = 'rook',
}

const ChessPieces: PieceType[] = [
  {
    id: ChessPieceType.rook,
    source: require('../assets/Rook.png'),
    width: 45,
    height: 45,
  },
];

export default ChessPieces;
