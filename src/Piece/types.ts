export type PieceBlueprintType = {
  id: string;
  asset: string;
  width?: number;
  height?: number;
  activeStyle?: any;
  availableStyle?: any;
  pieceImageProps?: any;
  defaultStyle?: any;
  variants: { [key: string]: Partial<PieceBlueprintType> };
};

export type PieceType = {
  type: string;
  variant?: string;
  owner?: string | string[];
  id: string;
  currZoneId?: string;
  slotId?: string;
  UI?: boolean;
  tableTransform?: {
    x: number;
    y: number;
    scale: number;
  };
};
