import React from 'react';
import Piece from './Piece';
import type { PieceBlueprintType, PieceType } from './types';

type PieceRendererProps = {
  types: PieceBlueprintType[];
  G: any;
  pieces: PieceType[];
  setActive?: (id: string) => void;
  movePiece?: (id: string) => void;
  isPieceActive?: (id: string) => boolean;
};

function PieceRenderer(props: PieceRendererProps) {
  const {
    types,
    pieces,
    G,
    isPieceActive = () => false,
    setActive,
    movePiece,
  } = props;
  return (
    <>
      {pieces.map((piece) => {
        const { id, type, currZoneId } = piece;
        const { source, width, height, activeStyle } = types.find(
          (t) => t.id === type
        );
        const active = isPieceActive(id);
        return (
          <Piece
            key={id}
            id={id}
            source={source}
            width={width}
            height={height}
            currZoneId={currZoneId}
            type={type}
            G={G}
            active={active}
            activeStyle={activeStyle}
            setActive={() => setActive(id)}
            movePiece={(zoneId) => movePiece(zoneId)}
          />
        );
      })}
    </>
  );
}

export default PieceRenderer;
