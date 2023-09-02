import React from 'react';
import styled from 'styled-components/native';

interface BoardProps {
  source: any;
  width?: number;
  height?: number;
  children?: React.ReactNode | React.ReactNode[];
}

const BoardContainer = styled.View<Partial<BoardProps>>`
  width: ${({ width }) => (width ? `${width}px` : '100%')};
  height: ${({ height }) => (height ? `${height}px` : '100%')};
`;

const BoardImage = styled.Image<Partial<BoardProps>>`
  height: 100%;
  width: 100%;
`;

function Board({ source, width, height, children }: BoardProps) {
  return (
    <BoardContainer width={width} height={height}>
      <BoardImage source={source} />
      {children}
    </BoardContainer>
  );
}

export default Board;
