import React, { useEffect, useState, memo } from 'react';
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
  isCurrentPlayer?: boolean;
};

function PieceRenderer(props: PieceRendererProps) {
  const {
    isActive = () => false,
    isAvailable = () => false,
    setActive,
    movePiece,
    isCurrentPlayer,
    tableScale,
  } = props;

  const [pieces, setPieces] = useState(props.G.pieces);

  useEffect(() => {
    setPieces(props.G.pieces);
  }, [props.G.pieces]);

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
        } = props.G.pieceTypes.find((t) => t.id === type);
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

export default memo(PieceRenderer);
