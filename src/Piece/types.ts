import type { StyleProp } from 'react-native';

export type PieceBlueprintType = {
  id: string;
  asset: string;
  width?: number;
  height?: number;
  activeStyle?: StyleProp<any>;
  availableStyle?: StyleProp<any>;
  defaultStyle?: StyleProp<any>;
  variants: { [key: string]: Partial<PieceBlueprintType> };
};

export type PieceType = {
  type: string;
  variant?: string;
  owner?: string | string[];
  id: string;
  currZoneId?: string;
  slotId?: string;
};
