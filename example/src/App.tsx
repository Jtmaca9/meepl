import React from 'react';
import { Game } from 'meeplio-components';
import { Chess } from './Game';
import Board from './Board';

export default function App() {
  return <Game gameConfig={Chess} board={Board} player={'0'} />;
}
