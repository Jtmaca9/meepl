import React from 'react';
import type { StyleProp } from 'react-native';
import styled from 'styled-components/native';

interface BoardProps {
  assetSource: string;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  outerStyle?: StyleProp<any>;
  children?: React.ReactNode | React.ReactNode[];
}

const BoardContainer = styled.View<Partial<BoardProps>>`
  width: ${({ width }) => (width ? `${width}px` : '100%')};
  height: ${({ height }) => (height ? `${height}px` : '100%')};
  position: absolute;
  top: ${({ y }) => y}px;
  left: ${({ x }) => x}px;
`;

const BoardImage = styled.Image`
  height: 100%;
  width: 100%;
`;

function Board(props: BoardProps) {
  const {
    assetSource,
    width,
    height,
    children,
    outerStyle,
    x = 0,
    y = 0,
  } = props;
  return (
    <BoardContainer
      style={outerStyle}
      width={width}
      height={height}
      x={x}
      y={y}
    >
      {assetSource && <BoardImage source={assetSource} />}
      {children}
    </BoardContainer>
  );
}

export default Board;
