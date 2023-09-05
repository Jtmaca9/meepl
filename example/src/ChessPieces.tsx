import type { PieceBlueprintType } from 'meepl';

export enum ChessPieceType {
  rook = 'rook',
}

const ChessPieces: PieceBlueprintType[] = [
  {
    id: ChessPieceType.rook,
    source: require('../assets/Rook.png'),
    width: 45,
    height: 45,
    activeStyle: {
      borderWidth: 2,
      borderColor: 'blue',
      borderRadius: 5,
      borderStyle: 'dashed',
    },
  },
];

export default ChessPieces;
