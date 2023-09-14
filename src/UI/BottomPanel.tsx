import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View<{ height: number }>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: ${(props) => props.height + 50}px;
  padding: 10px;
  background-color: #fff;
  border-top-width: 1px;
  border-top-color: #ccc;
  align-items: center;
  z-index: 10;
`;

function BottomPanel({ children, height = 0 }) {
  return <Container height={height}>{children}</Container>;
}

export default BottomPanel;
