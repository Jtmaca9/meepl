import React from 'react';
import styled from 'styled-components/native';

export type ZoneType = {
  x: number;
  y: number;
  width: number;
  height: number;
  devMode?: boolean;
  onPress?: () => void;
  id: string;
};

const Container = styled.TouchableOpacity<Partial<ZoneType>>`
  position: absolute;
  left: ${({ x }) => x}px;
  top: ${({ y }) => y}px;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;

  ${({ devMode }) =>
    devMode &&
    `
      border: 1px solid red;
      border-radius: 5px;
    `}
`;

function Zone({ x, y, width, height, devMode, onPress }: ZoneType) {
  return (
    <Container
      x={x}
      y={y}
      width={width}
      height={height}
      devMode={devMode}
      onPress={onPress}
    />
  );
}

export default Zone;
