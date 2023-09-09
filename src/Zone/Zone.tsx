import React, { useEffect, useState, memo } from 'react';
import styled from 'styled-components/native';
import type { ZoneType } from './types';
import type { StyleProp, View } from 'react-native';

const Container = styled.TouchableOpacity<Partial<ZoneProps>>`
  position: absolute;
  left: ${({ x }) => x}px;
  top: ${({ y }) => y}px;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
`;

type ZoneProps = ZoneType & {
  devMode?: boolean;
  onPress?: () => void;
  availableStyle?: StyleProp<View>;
  available?: boolean;
  ctx: any;
  moves: any;
};

enum COMPONENT_STATE {
  available = 'available',
  default = 'default',
}

function Zone(props: ZoneProps) {
  const { x, y, width, height, devMode, onPress, availableStyle, available } =
    props;

  const [componentState, setComponentState] = useState(COMPONENT_STATE.default);
  const [componentStyle, setComponentStyle] = useState({});

  useEffect(() => {
    if (available) {
      setComponentState(COMPONENT_STATE.available);
      setComponentStyle(availableStyle);
    } else {
      setComponentState(COMPONENT_STATE.default);
      setComponentStyle(
        devMode
          ? {
              borderWidth: 1,
              borderColor: 'red',
              borderRadius: 5,
            }
          : {}
      );
    }
  }, [available, componentState, availableStyle, devMode]);

  return (
    <Container
      x={x}
      y={y}
      width={width}
      height={height}
      devMode={devMode}
      onPress={onPress}
      style={componentStyle}
    />
  );
}

export default memo(Zone);
