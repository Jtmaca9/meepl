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

type GameProps = {
  gameConfig: any;
  player: string;
  multiplayer?: any;
  board: React.ReactNode | React.ReactNode[];
};

function Game({ gameConfig, board, player, multiplayer, ...props }: GameProps) {
  const App = multiplayer
    ? Client({ game: gameConfig, board, multiplayer })
    : Client({ game: gameConfig, board });
  return (
    <Container {...props}>
      <App playerID={player} />
    </Container>
  );
}

export default Game;
