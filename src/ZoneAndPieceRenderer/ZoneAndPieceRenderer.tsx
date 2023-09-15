import React from 'react';
import PieceRenderer from '../Piece/PieceRenderer';
import ZoneRenderer from '../Zone/ZoneRenderer';
import type { PieceRendererProps } from '../Piece/PieceRenderer';
import type { ZoneRendererProps } from '../Zone/ZoneRenderer';

type ZoneAndPieceRendererProps = PieceRendererProps & ZoneRendererProps;

function ZoneAndPieceRenderer(props: ZoneAndPieceRendererProps) {
  return (
    <>
      <ZoneRenderer {...props} />
      <PieceRenderer {...props} />
    </>
  );
}

export default ZoneAndPieceRenderer;
