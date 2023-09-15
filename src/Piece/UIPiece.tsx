import React, { useRef, useState } from 'react';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';

const AnimatedContainer = styled(Animated.View)``;

const PieceContainer = styled.View`
  width: 100%;
  height: 100%;
`;

const PieceImage = styled.Image`
  height: 100%;
  width: 100%;
`;

type UIPieceProps = {
  asset?: string;
  assets?: any[];
};

function UIPiece(props: UIPieceProps) {
  const { asset, assets } = props;

  const [assetCache] = useState(assets[asset]);

  const panRef = useRef(null);

  const panGestureHandler = (p) => {
    'worklet';
    const event = p.nativeEvent;
    if (event.state === State.ACTIVE) {
    }
  };

  const panGestureStateHandler = ({ nativeEvent: event }) => {
    'worklet';
    if (event.state === State.BEGAN) {
    }

    if (event.state === State.FAILED || event.state === State.CANCELLED) {
    }

    if (event.state === State.END) {
    }
  };

  return (
    <PanGestureHandler
      ref={panRef}
      onGestureEvent={panGestureHandler}
      onHandlerStateChange={panGestureStateHandler}
    >
      <AnimatedContainer>
        <PieceContainer>
          <PieceImage source={assetCache} resizeMode="contain" />
        </PieceContainer>
      </AnimatedContainer>
    </PanGestureHandler>
  );
}

export default UIPiece;
