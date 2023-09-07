import React from 'react';
import { GameWrapper } from 'meepl';
import ChessGame from './gameConfig/gameConfig';
import Game from './Game';

export default function App() {
  return <GameWrapper gameConfig={ChessGame} gameView={Game} player={'0'} />;
}
