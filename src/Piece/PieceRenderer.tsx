import React from 'react';
import Piece from './Piece';
import type { PieceBlueprintType, PieceType } from './types';

type PieceRendererProps = {
  types: PieceBlueprintType[];
  G: any;
  pieces: PieceType[];
  onHandlePiecePress?: (id: string) => void;
};

function PieceRenderer(props: PieceRendererProps) {
  const {
    types,
    pieces,
    G,
    onHandlePiecePress = (id) => console.log(`Piece ${id} pressed!`),
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
            onPress={() => onHandlePiecePress(id)}
          />
        );
      })}
    </>
  );
}

export default PieceRenderer;
