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
  board: React.ReactNode | React.ReactNode[];
};

function Game({ gameConfig, board, player, ...props }: GameProps) {
  const App = Client({ game: gameConfig, board });
  return (
    <Container {...props}>
      <App player={player} />
    </Container>
  );
}

export default Game;
