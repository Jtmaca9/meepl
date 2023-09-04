export type PieceBlueprintType = {
  id: string;
  source: any;
  width?: number;
  height?: number;
};

export type PieceType = {
  type: string;
  owner?: string | string[];
  id: string;
  currZoneId?: string;
};
