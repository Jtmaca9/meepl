import React from 'react';
import Piece from './Piece';

type PieceRendererProps = {
  G?: any;
  ctx?: any;
  moves?: any;
  assets?: any[];
  tableScale?: number;
  movePiece?: (id: string) => void;
  setActive?: (id: string) => void;
  isActive?: (id: string) => boolean;
  isAvailable?: (id: string) => boolean;
};

function PieceRenderer(props: PieceRendererProps) {
  const {
    isActive = () => false,
    isAvailable = () => false,
    setActive,
    movePiece,
    tableScale,
  } = props;
  return (
    <>
      {props.G.pieces.map((piece) => {
        const { id, type, currZoneId } = piece;
        const { asset, width, height, activeStyle, availableStyle } =
          props.G.pieceTypes.find((t) => t.id === type);
        const active = isActive(id);
        const available = isAvailable(id);
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
            setActive={() => setActive(id)}
            movePiece={(zoneId) => movePiece(zoneId)}
            G={props.G}
            ctx={props.ctx}
            moves={props.moves}
            assets={props.assets}
            tableScale={tableScale}
          />
        );
      })}
    </>
  );
}

export default PieceRenderer;
