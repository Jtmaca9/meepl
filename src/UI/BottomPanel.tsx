import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
  padding: 10px;
  background-color: #fff;
  border-top-width: 1px;
  border-top-color: #ccc;
  align-items: center;
  z-index: 10;
`;

const Text = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #333;
`;

function BottomPanel({ children }) {
  return (
    <Container>
      <Text>{children}</Text>
    </Container>
  );
}

export default BottomPanel;
