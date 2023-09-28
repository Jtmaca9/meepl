import type { PieceBlueprintType } from 'meepl';

export enum PlayingCardType {
  two = '2',
  three = '3',
  four = '4',
  five = '5',
  six = '6',
  seven = '7',
  eight = '8',
  nine = '9',
  ten = '10',
  jack = 'jack',
  queen = 'queen',
  king = 'king',
  ace = 'ace',
}

export enum PlayingCardSuit {
  clovers = 'clovers',
  hearts = 'hearts',
  tiles = 'tiles',
  pikes = 'pikes',
}

const basePlayingCards: Partial<PieceBlueprintType>[] = [
  {
    id: PlayingCardType.two,
    width: 65,
    height: 93,
  },
  {
    id: PlayingCardType.three,
    width: 65,
    height: 93,
  },
  {
    id: PlayingCardType.four,
    width: 65,
    height: 93,
  },
  {
    id: PlayingCardType.five,
    width: 65,
    height: 93,
  },
  {
    id: PlayingCardType.six,
    width: 65,
    height: 93,
  },
  {
    id: PlayingCardType.seven,
    width: 65,
    height: 93,
  },
  {
    id: PlayingCardType.eight,
    width: 65,
    height: 93,
  },
  {
    id: PlayingCardType.nine,
    width: 65,
    height: 93,
  },
  {
    id: PlayingCardType.ten,
    width: 65,
    height: 93,
  },
  {
    id: PlayingCardType.jack,
    width: 65,
    height: 93,
  },
  {
    id: PlayingCardType.queen,
    width: 65,
    height: 93,
  },
  {
    id: PlayingCardType.king,
    width: 65,
    height: 93,
  },
  {
    id: PlayingCardType.ace,
    width: 65,
    height: 93,
  },
];

const PlayingCards: Partial<PieceBlueprintType>[] = basePlayingCards.map(
  (card) => ({
    ...card,
    variants: {
      [PlayingCardSuit.clovers]: {
        asset: `clovers_${card.id}`,
      },
      [PlayingCardSuit.hearts]: {
        asset: `hearts_${card.id}`,
      },
      [PlayingCardSuit.tiles]: {
        asset: `tiles_${card.id}`,
      },
      [PlayingCardSuit.pikes]: {
        asset: `pikes_${card.id}`,
      },
    },
  })
);

export default PlayingCards;
