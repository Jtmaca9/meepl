import React from 'react';
import Piece from './Piece';
import type { Piece as PT, PieceType } from './types';

type PieceRendererProps = {
  types: PieceType[];
  G: any;
  pieces: PT[];
  handlePiecePress?: (id: string) => void;
};

function PieceRenderer(props: PieceRendererProps) {
  const {
    types,
    pieces,
    G,
    handlePiecePress = () => console.log('Piece Pressed'),
  } = props;
  return (
    <>
      {pieces.map((piece) => {
        const { id, type, currZoneId } = piece;
        const { source, width, height } = types.find((t) => t.id === type);
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
            onPress={() => handlePiecePress(id)}
          />
        );
      })}
    </>
  );
}

export default PieceRenderer;
