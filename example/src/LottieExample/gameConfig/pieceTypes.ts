import type { PieceBlueprintType } from 'meepl';

const pieceTypes: PieceBlueprintType[] = [
  {
    id: 'hero',
    asset: 'idle_lottie',
    width: 400,
    height: 400,
    assetProps: {
      style: {
        position: 'absolute',
        top: -130,
        left: -30,
        width: '100%',
        height: '100%',
      },
    },
    defaultState: 'default',
    states: {
      default: {
        asset: 'idle_lottie',
      },
      active: {
        asset: 'walking_lottie',
      },
    },
    variants: {
      knight: {
        asset: 'idle_lottie',
      },
    },
  },
];

export default pieceTypes;
