import React, { memo } from 'react';
import Piece from './Piece';
import type { PieceBlueprintType, PieceType } from './types';
import type { ZoneType } from '../Zone/types';

export type PieceRendererProps = {
  onSelectedPiece?: (id: string) => void;
  onDragPieceEnd?: (id: string, targetZoneId: string) => void;
  onDragPieceStart?: (id: string) => void;
  isPieceActive?: (id: string) => boolean;
  legalPieceDragCheck: any;
  UI?: boolean;
  // passed by parent
  assets?: any[];
  tableScale?: number;
  isCurrentPlayer?: boolean;
  currentPlayer?: any;
  pieces?: PieceType[];
  zones?: ZoneType[];
  isPieceDraggable?: (id: string) => boolean;
  pieceTypes?: PieceBlueprintType[];
  tableTransform?: { x: number; y: number; scale: number };
};

function PieceRenderer(props: PieceRendererProps) {
  const {
    pieceTypes,
    pieces = [],
    isCurrentPlayer,
    currentPlayer,
    zones,
    legalPieceDragCheck,
    onDragPieceStart = () => {},
    onDragPieceEnd = () => {},
    onSelectedPiece = () => {},
    isPieceActive = () => false,
    isPieceDraggable = () => false,
    UI = false,
    tableTransform = { x: 0, y: 0, scale: 1 },
  } = props;

  return (
    <>
      {pieces.map((piece) => {
        const { id, type, currZoneId, owner, variant, UI: pUI = false } = piece;
        if (UI !== pUI) return null;
        return (
          <Piece
            key={id}
            id={id}
            currZoneId={currZoneId}
            type={type}
            available={isCurrentPlayer && owner === currentPlayer.id}
            active={isPieceActive(id)}
            assets={props.assets}
            zones={zones}
            pieceTypes={pieceTypes}
            variant={variant}
            legalDragCheck={legalPieceDragCheck}
            draggable={isPieceDraggable(id)}
            onDragStart={() => onDragPieceStart(id)}
            onDragEnd={(targetZoneId) => onDragPieceEnd(id, targetZoneId)}
            onSelected={() => onSelectedPiece(id)}
            tableTransform={tableTransform}
            UI={pUI}
          />
        );
      })}
    </>
  );
}

export default memo(PieceRenderer);
