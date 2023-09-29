import React, { memo } from 'react';
import Piece from './Piece';
import PieceDraggable from './PieceDraggable';
import type { PieceType } from './types';
import type { ZoneType } from '../Zone/types';

export type PieceRendererProps = {
  onSelectedPiece?: (id: string) => void;
  onDragPieceEnd?: (id: string, targetZoneId: string) => void;
  onDragPieceStart?: (id: string) => void;
  legalPieceDragCheck: any;
  UI?: boolean;
  assets: any;
  isCurrentPlayer: boolean;
  currentPlayer: any;
  pieces: PieceType[];
  zones: ZoneType[];
  isPieceDraggable?: (id: string) => boolean;
  pieceTypes: any;
  tableTransform?: {
    x: number;
    y: number;
    scale: number;
    width: number;
    height: number;
  };
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
    isPieceDraggable = () => false,
    UI = false,
    tableTransform = { x: 0, y: 0, scale: 1, width: 0, height: 0 },
  } = props;

  return (
    <>
      {pieces.map((piece) => {
        const { id, type, currZoneId, owner, variant, state } = piece;
        const draggable = isPieceDraggable(id);
        return draggable ? (
          <PieceDraggable
            key={id}
            id={id}
            state={state}
            currZoneId={currZoneId}
            type={type}
            available={isCurrentPlayer && owner === currentPlayer.id}
            assets={props.assets}
            zones={zones}
            pieceTypes={pieceTypes}
            variant={variant}
            legalDragCheck={legalPieceDragCheck}
            onDragStart={() => onDragPieceStart(id)}
            onDragEnd={(targetZoneId) => onDragPieceEnd(id, targetZoneId)}
            tableTransform={tableTransform}
            UI={UI}
          />
        ) : (
          <Piece
            key={id}
            id={id}
            state={state}
            currZoneId={currZoneId}
            type={type}
            available={isCurrentPlayer && owner === currentPlayer.id}
            assets={props.assets}
            zones={zones}
            pieceTypes={pieceTypes}
            variant={variant}
            onSelected={() => onSelectedPiece(id)}
            tableTransform={tableTransform}
            UI={UI}
          />
        );
      })}
    </>
  );
}

export default memo(PieceRenderer);
