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

const activeStyle = {
  shadowColor: 'black',
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0.8,
  shadowRadius: 10,
  zIndex: 100,
};

const availableStyle = {};

const defaultStyle = {};

const basePlayingCards: Partial<PieceBlueprintType>[] = [
  {
    id: PlayingCardType.two,
    width: 65,
    height: 93,
    activeStyle,
    availableStyle,
    defaultStyle,
  },
  {
    id: PlayingCardType.three,
    width: 65,
    height: 93,
    activeStyle,
    availableStyle,
    defaultStyle,
  },
  {
    id: PlayingCardType.four,
    width: 65,
    height: 93,
    activeStyle,
    availableStyle,
    defaultStyle,
  },
  {
    id: PlayingCardType.five,
    width: 65,
    height: 93,
    activeStyle,
    availableStyle,
    defaultStyle,
  },
  {
    id: PlayingCardType.six,
    width: 65,
    height: 93,
    activeStyle,
    availableStyle,
    defaultStyle,
  },
  {
    id: PlayingCardType.seven,
    width: 65,
    height: 93,
    activeStyle,
    availableStyle,
    defaultStyle,
  },
  {
    id: PlayingCardType.eight,
    width: 65,
    height: 93,
    activeStyle,
    availableStyle,
    defaultStyle,
  },
  {
    id: PlayingCardType.nine,
    width: 65,
    height: 93,
    activeStyle,
    availableStyle,
    defaultStyle,
  },
  {
    id: PlayingCardType.ten,
    width: 65,
    height: 93,
    activeStyle,
    availableStyle,
    defaultStyle,
  },
  {
    id: PlayingCardType.jack,
    width: 65,
    height: 93,
    activeStyle,
    availableStyle,
    defaultStyle,
  },
  {
    id: PlayingCardType.queen,
    width: 65,
    height: 93,
    activeStyle,
    availableStyle,
    defaultStyle,
  },
  {
    id: PlayingCardType.king,
    width: 65,
    height: 93,
    activeStyle,
    availableStyle,
    defaultStyle,
  },
  {
    id: PlayingCardType.ace,
    width: 65,
    height: 93,
    activeStyle,
    availableStyle,
    defaultStyle,
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
