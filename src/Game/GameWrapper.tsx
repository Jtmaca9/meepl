import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { Client } from 'boardgame.io/react-native';

const Container = styled(GestureHandlerRootView)`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 10;
`;

type GameWrapperProps = {
  gameConfig: any;
  player: string;
  multiplayer?: any;
  gameView: any;
  containerStyle?: any;
};

function GameWrapper({
  gameConfig,
  gameView,
  player,
  multiplayer,
  containerStyle = {},
  ...props
}: GameWrapperProps) {
  const App = multiplayer
    ? Client({ game: gameConfig, board: gameView, multiplayer })
    : Client({ game: gameConfig, board: gameView });
  return (
    <>
      <Container style={containerStyle} {...props}>
        <App playerID={player} />
      </Container>
    </>
  );
}

export default GameWrapper;
