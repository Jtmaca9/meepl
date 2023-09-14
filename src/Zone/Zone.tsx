import React, { useEffect, useState, memo } from 'react';
import styled from 'styled-components/native';
import { ZONE_TYPE, type ZoneType } from './types';
import { type StyleProp, type View } from 'react-native';
import { ZONE_SPACING } from './zoneSpacing';

const Container = styled.TouchableOpacity<Partial<ZoneProps>>`
  position: absolute;
  left: ${({ x }) => x}px;
  top: ${({ y }) => y}px;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
`;

export type ZoneProps = ZoneType & {
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

  let [xCoord, setXCoord] = useState(
    typeof x === 'number' ? x : ZONE_SPACING[x](width)
  );
  let [yCoord, setYCoord] = useState(
    typeof y === 'number' ? y : ZONE_SPACING[y](height)
  );

  useEffect(() => {
    if (typeof x === 'string') {
      setXCoord(ZONE_SPACING[x](width));
    } else {
      setXCoord(x);
    }
    if (typeof y === 'string') {
      setYCoord(ZONE_SPACING[y](height));
    } else {
      setYCoord(y);
    }
  }, [x, y, width, height]);

  const [componentState, setComponentState] = useState(COMPONENT_STATE.default);
  const [componentStyle, setComponentStyle] = useState({});

  useEffect(() => {
    if (available) {
      setComponentState(COMPONENT_STATE.available);
      setComponentStyle(availableStyle);
    } else {
      setComponentState(COMPONENT_STATE.default);
      setComponentStyle({});
    }
  }, [available, componentState, availableStyle, devMode]);

  return (
    <Container
      x={xCoord}
      y={yCoord}
      width={width}
      height={height}
      devMode={devMode}
      onPress={onPress}
      style={[
        props.zType !== ZONE_TYPE.slot && componentStyle,
        devMode && {
          borderWidth: 1,
          borderColor: 'red',
          borderRadius: 5,
        },
      ]}
    />
  );
}

export default memo(Zone);
