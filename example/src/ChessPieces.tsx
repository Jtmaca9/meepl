import type { PieceBlueprintType } from 'meepl';

export enum ChessPieceType {
  rook = 'rook',
}

const activeStyle = {
  borderWidth: 2,
  borderColor: 'blue',
  borderRadius: 5,
  borderStyle: 'dashed',
};

const ChessPieces: PieceBlueprintType[] = [
  {
    id: ChessPieceType.rook,
    asset: ChessPieceType.rook,
    width: 45,
    height: 45,
    activeStyle,
  },
];

export default ChessPieces;
