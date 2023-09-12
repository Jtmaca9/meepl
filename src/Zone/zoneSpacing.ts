import { Dimensions } from 'react-native';

export const ZONE_SPACING = {
  centerX: (width) => Dimensions.get('window').width / 2 - width / 2,
  centerY: (height) => Dimensions.get('window').height / 2 - height / 2,
  // fromTop: (y) => y,
  // fromBottom: (y, height) => Dimensions.get('window').height - y - height,
  // fromLeft: (x) => x,
  // fromRight: (x, width) => Dimensions.get('window').width - x - width,
};
