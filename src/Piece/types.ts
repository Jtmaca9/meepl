export type PieceType = {
  id: string;
  source: any;
  width?: number;
  height?: number;
};

export type Piece = {
  type: string;
  owner?: string | string[];
  id: string;
  currZoneId?: string;
};
