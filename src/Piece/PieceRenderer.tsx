import React, { memo } from 'react';
import Piece from './Piece';
import type { PieceBlueprintType, PieceType } from './types';
import type { ZoneType } from '../Zone/types';

type PieceRendererProps = {
  onSelected?: (id: string) => void;
  onDragEnd?: (id: string, targetZoneId: string) => void;
  onDragStart?: (id: string) => void;
  isPieceActive?: (id: string) => boolean;
  legalDragCheck: any;
  // passed by parent
  assets?: any[];
  tableScale?: number;
  isCurrentPlayer?: boolean;
  currentPlayer?: any;
  pieces?: PieceType[];
  zones?: ZoneType[];
  zonesUI?: ZoneType[];
  draggable?: boolean;
  pieceTypes?: PieceBlueprintType[];
};

function PieceRenderer(props: PieceRendererProps) {
  const {
    pieceTypes,
    pieces = [],
    isCurrentPlayer,
    currentPlayer,
    tableScale,
    zones,
    draggable,
    legalDragCheck,
    onDragStart = () => {},
    onDragEnd = () => {},
    onSelected = () => {},
    isPieceActive = () => false,
  } = props;

  return (
    <>
      {pieces.map((piece) => {
        const { id, type, currZoneId, owner, variant } = piece;
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
            tableScale={tableScale}
            variant={variant}
            pieceTypes={pieceTypes}
            legalDragCheck={legalDragCheck}
            draggable={draggable}
            onDragStart={() => onDragStart(id)}
            onDragEnd={(targetZoneId) => onDragEnd(id, targetZoneId)}
            onSelected={() => onSelected(id)}
          />
        );
      })}
    </>
  );
}

export default memo(PieceRenderer);
