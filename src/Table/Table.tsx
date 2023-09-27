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
  backgroundImageSource?: any;
  backgroundImageProps?: any;
  setTableTransform?: ({
    x,
    y,
    scale,
    width,
    height,
  }: {
    x: number;
    y: number;
    scale: number;
    width: number;
    height: number;
  }) => void;
};

const AnimatedBox = styled(Animated.View)`
  width: 100%;
  height: 100%;
`;

const BgImageContainer = styled.View`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: -10;
`;

const BgImage = styled.Image`
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
  //Pinch Values
  const startScale = useSharedValue(1);
  const scale = useSharedValue(1);

  function setTableTransform({ x, y, scale }) {
    if (!props.setTableTransform) return;
    props.setTableTransform({
      x,
      y,
      scale,
      width: props.tableWidth,
      height: props.tableHeight,
    });
  }

  useEffect(() => {
    scale.value = Math.min(
      Dimensions.get('window').width / props.tableWidth,
      Dimensions.get('window').height / props.tableHeight
    );
    startScale.value = scale.value;
    setTableTransform({
      x: Dimensions.get('window').width / 2 - props.tableWidth / 2,
      y: Dimensions.get('window').height / 2 - props.tableHeight / 2,
      scale: scale.value,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startX = useSharedValue(0);
  const startY = useSharedValue(0);

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
      setTableTransform({
        x: translateX.value,
        y: translateY.value,
        scale: scale.value,
      });
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
      setTableTransform({
        x: translateX.value,
        y: translateY.value,
        scale: scale.value,
      });
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
                <>
                  {props.backgroundImageSource && (
                    <BgImageContainer>
                      <BgImage
                        source={props.backgroundImageSource}
                        {...props.backgroundImageProps}
                      />
                    </BgImageContainer>
                  )}
                  {props.children.map((child: any, i) => (
                    <child.type
                      key={i}
                      {...props}
                      {...child.props}
                      tableTranslateX={translateX.value}
                      tableTranslateY={translateY.value}
                      tableScale={scale.value}
                    />
                  ))}
                </>
              ) : (
                <>
                  {props.backgroundImageSource && (
                    <BgImageContainer>
                      <BgImage
                        source={props.backgroundImageSource}
                        {...props.backgroundImageProps}
                      />
                    </BgImageContainer>
                  )}
                  <props.children.type
                    {...props}
                    {...props.children.props}
                    tableTranslateX={translateX.value}
                    tableTranslateY={translateY.value}
                    tableScale={scale.value}
                  />
                </>
              )}
            </Animated.View>
          </AnimatedBox>
        </PinchGestureHandler>
      </AnimatedBox>
    </PanGestureHandler>
  );
}

export default Table;
