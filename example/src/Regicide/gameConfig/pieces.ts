import type { PieceType } from 'meepl';
import { PlayingCardSuit, PlayingCardType } from './pieceTypes';

const pieces: PieceType[] = [
  {
    id: 'King',
    type: PlayingCardType.king,
    currZoneId: null,
    owner: '0',
    variant: PlayingCardSuit.tiles,
  },
];

export default pieces;
