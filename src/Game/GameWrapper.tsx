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
  background-color: whitesmoke;
`;

type GameWrapperProps = {
  gameConfig: any;
  player: string;
  multiplayer?: any;
  gameView: React.ReactNode | React.ReactNode[];
};

function GameViewWrapper({
  gameConfig,
  gameView,
  player,
  multiplayer,
  ...props
}: GameWrapperProps) {
  const App = multiplayer
    ? Client({ game: gameConfig, board: gameView, multiplayer })
    : Client({ game: gameConfig, board: gameView });
  return (
    <Container {...props}>
      <App playerID={player} />
    </Container>
  );
}

export default GameViewWrapper;
