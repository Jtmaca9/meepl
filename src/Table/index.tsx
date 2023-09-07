// @ts-nocheck

import React, { useRef } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import {
  PanGestureHandler,
  PinchGestureHandler,
  State,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

type TableProps = {
  tableWidth: number;
  tableHeight: number;
  children: React.ReactNode | React.ReactNode[];
};

const AnimatedBox = styled(Animated.View)`
  width: 100%;
  height: 100%;
`;

function Table(props: TableProps) {
  const panRef = useRef(null);
  const pinchRef = useRef(null);

  // Pan Values
  const translateX = useSharedValue(
    Dimensions.get('window').width / 2 - props.tableWidth / 2
  );
  const translateY = useSharedValue(
    Dimensions.get('window').height / 2 - props.tableHeight / 2
  );
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);

  //Pinch Values
  const startScale = useSharedValue(1);
  const scale = useSharedValue(1);

  const panGestureHandler = (p) => {
    'worklet';
    const event = p.nativeEvent;
    if (event.state === State.ACTIVE) {
      translateX.value = event.translationX + startX.value;
      translateY.value = event.translationY + startY.value;
    }
  };

  const panGestureStateHandler = ({ nativeEvent: event }) => {
    'worklet';
    if (event.state === State.BEGAN) {
      startX.value = translateX.value;
      startY.value = translateY.value;
    }

    if (event.state === State.END) {
      translateX.value = withSpring(translateX.value, { damping: 20 });
      translateY.value = withSpring(translateY.value, { damping: 20 });
    }
  };

  const pinchGestureHandler = (p) => {
    'worklet';
    const event = p.nativeEvent;
    if (event.state === State.ACTIVE) {
      scale.value = event.scale * startScale.value;
    }
  };

  const pinchGestureStateHandler = ({ nativeEvent: event }) => {
    'worklet';
    if (event.state === State.BEGAN) {
      startScale.value = scale.value;
    }

    if (event.state === State.END) {
      scale.value = withTiming(scale.value, { duration: 250 });
    }
  };

  const panStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
      ],
    };
  }, [translateX, translateY, scale]);

  const tableStyle = {
    width: props.tableWidth,
    height: props.tableHeight,
    overflow: 'hidden',
  };

  return (
    <PanGestureHandler
      ref={panRef}
      simultaneousHandlers={pinchRef}
      onGestureEvent={panGestureHandler}
      onHandlerStateChange={panGestureStateHandler}
    >
      <AnimatedBox>
        <PinchGestureHandler
          ref={pinchRef}
          simultaneousHandlers={panRef}
          onGestureEvent={pinchGestureHandler}
          onHandlerStateChange={pinchGestureStateHandler}
        >
          <AnimatedBox>
            <Animated.View style={[tableStyle, panStyle]}>
              {props.children.map((child: any) => (
                <child.type
                  {...child.props}
                  G={props.G}
                  ctx={props.ctx}
                  moves={props.moves}
                  plugins={props.plugins}
                  assets={props.assets}
                />
              ))}
            </Animated.View>
          </AnimatedBox>
        </PinchGestureHandler>
      </AnimatedBox>
    </PanGestureHandler>
  );
}

export default Table;
