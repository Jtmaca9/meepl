import React from 'react';
import { Game } from 'meepl';
import ChessGame from './Game';
import GameView from './GameView';

export default function App() {
  return <Game gameConfig={ChessGame} gameView={GameView} player={'0'} />;
}
