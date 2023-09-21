export type PieceBlueprintType = {
  id: string;
  asset: string;
  width?: number;
  height?: number;
  activeStyle?: any;
  availableStyle?: any;
  defaultStyle?: any;
  variants: { [key: string]: Partial<PieceBlueprintType> };
};

// export type PieceType = {
//   type: string;
//   variant?: string;
//   owner?: string | string[];
//   id: string;
//   currZoneId?: string;
//   slotId?: string;
//   UI?: boolean;
//   tableTransform?: {
//     x: number;
//     y: number;
//     scale: number;
//   };
//   pieceEntity?: PieceEnityTypes;
// };

export type PieceType<pieceEntity = PieceEnityTypes> =
  pieceEntity extends PieceEnityTypes.piece
    ? {
        pieceEntity?: PieceEnityTypes.piece | null;
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
      }
    : {
        pieceEntity?: PieceEnityTypes.card;
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
        cardBackAsset?: string;
        flipped?: boolean;
      };

export enum PieceEnityTypes {
  piece = 'piece',
  card = 'card',
}
