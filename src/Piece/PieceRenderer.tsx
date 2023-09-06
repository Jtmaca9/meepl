import React from 'react';
import Piece from './Piece';

type PieceRendererProps = {
  G?: any;
  ctx?: any;
  moves?: any;
  assets?: any[];
  setActive?: (id: string) => void;
  movePiece?: (id: string) => void;
  isPieceActive?: (id: string) => boolean;
};

function PieceRenderer(props: PieceRendererProps) {
  const { isPieceActive = () => false, setActive, movePiece } = props;
  return (
    <>
      {props.G.pieces.map((piece) => {
        const { id, type, currZoneId } = piece;
        const { asset, width, height, activeStyle } = props.G.pieceTypes.find(
          (t) => t.id === type
        );
        const active = isPieceActive(id);
        return (
          <Piece
            key={id}
            id={id}
            asset={asset}
            width={width}
            height={height}
            currZoneId={currZoneId}
            type={type}
            active={active}
            activeStyle={activeStyle}
            setActive={() => setActive(id)}
            movePiece={(zoneId) => movePiece(zoneId)}
            G={props.G}
            ctx={props.ctx}
            moves={props.moves}
            assets={props.assets}
          />
        );
      })}
    </>
  );
}

export default PieceRenderer;
