import type { PieceType } from 'meepl';
import { PlayingCardSuit, PlayingCardType } from './pieceTypes';

const pieces: PieceType[] = [
  {
    id: 'King',
    type: PlayingCardType.king,
    currZoneId: '1',
    owner: '0',
    variant: PlayingCardSuit.tiles,
  },
  {
    id: 'queen',
    type: PlayingCardType.queen,
    currZoneId: '2',
    owner: '0',
    variant: PlayingCardSuit.clovers,
  },
  {
    id: 'handcard',
    type: PlayingCardType.ace,
    currZoneId: '3',
    owner: '0',
    variant: PlayingCardSuit.clovers,
  },
];

export default pieces;
