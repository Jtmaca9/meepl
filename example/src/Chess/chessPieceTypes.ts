import type { PieceBlueprintType } from 'meepl';

export enum ChessPieceType {
  rook = 'rook',
  pawn = 'pawn',
  knight = 'knight',
  bishop = 'bishop',
  queen = 'queen',
  king = 'king',
}

export enum ChessPieceVariant {
  white = 'white',
  black = 'black',
}

const baseChessPieces: Partial<PieceBlueprintType>[] = [
  {
    id: ChessPieceType.rook,
    asset: ChessPieceType.rook,
    width: 45,
    height: 45,
  },
  {
    id: ChessPieceType.pawn,
    asset: ChessPieceType.pawn,
    width: 45,
    height: 45,
  },
  {
    id: ChessPieceType.knight,
    asset: ChessPieceType.knight,
    width: 45,
    height: 45,
  },
  {
    id: ChessPieceType.bishop,
    asset: ChessPieceType.bishop,
    width: 45,
    height: 45,
  },
  {
    id: ChessPieceType.queen,
    asset: ChessPieceType.queen,
    width: 45,
    height: 45,
  },
  {
    id: ChessPieceType.king,
    asset: ChessPieceType.king,
    width: 45,
    height: 45,
  },
];

const ChessPieces: Partial<PieceBlueprintType>[] = [
  ...baseChessPieces.map((piece) => ({
    ...piece,
    variants: {
      white: {
        asset: `w_${piece.asset}`,
      },
      black: {
        asset: `b_${piece.asset}`,
      },
    },
  })),
];

export default ChessPieces;
