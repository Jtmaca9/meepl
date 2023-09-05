import React from 'react';
import { Game } from 'meepl';
import { Chess } from './Game';
import GameView from './GameView';

export default function App() {
  return <Game gameConfig={Chess} gameView={GameView} player={'0'} />;
}
