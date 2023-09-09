import React, { memo } from 'react';
import Piece from './Piece';
import type { PieceBlueprintType, PieceType } from './types';
import type { ZoneType } from '../Zone/types';

type PieceRendererProps = {
  movePiece: (id: string) => void;
  setActive: (id: string) => void;
  isActive: (id: string) => boolean;
  isAvailable: (id: string) => boolean;
  // passed by parent
  ctx?: any;
  moves?: any;
  assets?: any[];
  tableScale?: number;
  isCurrentPlayer?: boolean;
  pieces?: PieceType[];
  zones?: ZoneType[];
  pieceTypes?: PieceBlueprintType[];
};

function PieceRenderer(props: PieceRendererProps) {
  const {
    isActive = () => false,
    isAvailable = () => false,
    setActive,
    pieceTypes,
    pieces = [],
    movePiece,
    isCurrentPlayer,
    tableScale,
    zones,
  } = props;

  return (
    <>
      {pieces.map((piece) => {
        const { id, type, currZoneId } = piece;
        const {
          asset,
          width,
          height,
          activeStyle,
          availableStyle,
          defaultStyle,
        } = pieceTypes.find((t) => t.id === type);
        const active = isCurrentPlayer && isActive(id);
        const available = isCurrentPlayer && isAvailable(id);
        return (
          <Piece
            key={id}
            id={id}
            asset={asset}
            width={width}
            height={height}
            currZoneId={currZoneId}
            type={type}
            available={available}
            availableStyle={availableStyle}
            active={active}
            activeStyle={activeStyle}
            defaultStyle={defaultStyle}
            setActive={() => setActive(id)}
            movePiece={(zoneId) => movePiece(zoneId)}
            ctx={props.ctx}
            moves={props.moves}
            assets={props.assets}
            zones={zones}
            tableScale={tableScale}
          />
        );
      })}
    </>
  );
}

export default memo(PieceRenderer);
