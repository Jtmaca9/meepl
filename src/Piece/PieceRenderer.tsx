import React, { memo } from 'react';
import Piece from './Piece';
import type { PieceBlueprintType, PieceType } from './types';
import type { ZoneType } from '../Zone/types';

type PieceRendererProps = {
  movePiece: any;
  setActive: (id: string) => void;
  legalMoveCheck: any;
  // passed by parent
  assets?: any[];
  tableScale?: number;
  isCurrentPlayer?: boolean;
  currentPlayer?: any;
  pieces?: PieceType[];
  zones?: ZoneType[];
  draggable?: boolean;
  pieceTypes?: PieceBlueprintType[];
};

function PieceRenderer(props: PieceRendererProps) {
  const {
    setActive,
    pieceTypes,
    pieces = [],
    movePiece,
    isCurrentPlayer,
    currentPlayer,
    tableScale,
    zones,
    draggable,
    legalMoveCheck,
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
            active={isCurrentPlayer && currentPlayer.activePiece === id}
            setActive={() => setActive(id)}
            movePiece={(zoneId) => movePiece(id, zoneId)}
            assets={props.assets}
            zones={zones}
            tableScale={tableScale}
            variant={variant}
            pieceTypes={pieceTypes}
            legalMoveCheck={legalMoveCheck}
            draggable={draggable}
          />
        );
      })}
    </>
  );
}

export default memo(PieceRenderer);
