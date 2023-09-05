import React from 'react';
import styled from 'styled-components/native';
import type { ZoneType } from './types';

const Container = styled.TouchableOpacity<Partial<ZoneProps>>`
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

type ZoneProps = ZoneType & {
  devMode?: boolean;
  onPress?: () => void;
};

function Zone(props: ZoneProps) {
  const { x, y, width, height, devMode, onPress } = props;
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
