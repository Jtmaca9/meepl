import React from 'react';
import Piece from './Piece';
import type { PieceBlueprintType, PieceType } from './types';

type PieceRendererProps = {
  types: PieceBlueprintType[];
  G: any;
  pieces: PieceType[];
  onHandlePiecePress?: (id: string) => void;
  isPieceActive?: (id: string) => boolean;
};

function PieceRenderer(props: PieceRendererProps) {
  const {
    types,
    pieces,
    G,
    isPieceActive = () => false,
    onHandlePiecePress = (id) => console.log(`Piece ${id} pressed!`),
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
            onPress={() => onHandlePiecePress(id)}
          />
        );
      })}
    </>
  );
}

export default PieceRenderer;
