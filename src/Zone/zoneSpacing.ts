import { Dimensions } from 'react-native';

export const ZONE_SPACING = {
  centerX: (width: number) => Dimensions.get('window').width / 2 - width / 2,
  centerY: (height: number) => Dimensions.get('window').height / 2 - height / 2,
  fromTop: (y: number) => y,
  fromBottom: ({ y, height }: { y: number; height: number }) =>
    Dimensions.get('window').height - y - height,
  fromLeft: (x: number) => x,
  fromRight: ({ x, width }: { x: number; width: number }) =>
    Dimensions.get('window').width - x - width,
};
