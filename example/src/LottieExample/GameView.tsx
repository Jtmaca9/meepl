import React, { useState } from 'react';
import { useGameState } from 'meepl';
import GameTable from './GameTable/GameTable';

export default function Game(props) {
  const gameState = useGameState(props);

  const [activePiece, setActivePiece] = useState(null);

  return (
    <>
      <GameTable
        gameState={gameState}
        activePiece={activePiece}
        setActivePiece={setActivePiece}
      />
    </>
  );
}
