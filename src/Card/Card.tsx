import React from 'react';
import type { PieceProps } from '../Piece/Piece';
import Piece from '../Piece/Piece';

type CardProps = {} & PieceProps;

function Card(props: CardProps) {
  const { type, id, assets, zones, pieceTypes } = props;
  return (
    <Piece
      type={type}
      id={id}
      assets={assets}
      zones={zones}
      pieceTypes={pieceTypes}
      legalDragCheck={() => true}
    />
  );
}

export default Card;
