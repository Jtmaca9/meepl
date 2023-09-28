export type PieceBlueprintType = {
  id: string;
  asset?: string;
  assetProps?: any;
  width?: number;
  height?: number;
  defaultState?: string;
  states?: any;
  variants?: { [key: string]: Partial<PieceBlueprintType> };
};

export type PieceType = {
  type: string;
  variant?: string;
  owner?: string | string[];
  id: string;
  currZoneId?: string;
  slotId?: string;
  state?: string;
  UI?: boolean;
  tableTransform?: {
    x: number;
    y: number;
    scale: number;
  };
};
