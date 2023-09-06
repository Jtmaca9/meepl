import type { StyleProp } from 'react-native';

export type PieceBlueprintType = {
  id: string;
  asset: string;
  width?: number;
  height?: number;
  activeStyle?: StyleProp<any>;
};

export type PieceType = {
  type: string;
  owner?: string | string[];
  id: string;
  currZoneId?: string;
};
