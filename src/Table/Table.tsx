// @ts-nocheck

import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, View } from 'react-native';
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
  tableWidth?: number;
  tableHeight?: number;
  children: React.ReactNode | React.ReactNode[];
  fixed?: boolean;
  containerStyle?: any;
};

const AnimatedBox = styled(Animated.View)`
  width: 100%;
  height: 100%;
`;

function Table(props: TableProps) {
  const panRef = useRef(null);
  const pinchRef = useRef(null);

  const [state, setState] = useState(props);

  useEffect(() => {
    if (!props || Object.keys(state).length === 0) return;
    setState(props);
  }, [props, state]);

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
    width: props.tableWidth || '100%',
    height: props.tableHeight || '100%',
    backgroundColor: 'rgba(0,0,0,0.2)',
    ...(props.containerStyle || {}),
  };

  return props.fixed ? (
    <View style={tableStyle}>
      {Array.isArray(props.children) ? (
        props.children.map((child: any, i) => (
          <child.type key={i} {...props} {...child.props} />
        ))
      ) : (
        <props.children.type {...props} {...props.children.props} />
      )}
    </View>
  ) : (
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
              {Array.isArray(props.children) ? (
                props.children.map((child: any, i) => (
                  <child.type key={i} {...props} {...child.props} />
                ))
              ) : (
                <props.children.type {...props} {...props.children.props} />
              )}
            </Animated.View>
          </AnimatedBox>
        </PinchGestureHandler>
      </AnimatedBox>
    </PanGestureHandler>
  );
}

export default Table;