import React, { useState } from 'react';
import { useGameState } from 'meepl';
import GameTable from './GameTable/GameTable';
import GameUI from './GameUI/GameUI';

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
      <GameUI
        gameState={gameState}
        activePiece={activePiece}
        setActivePiece={setActivePiece}
      />
    </>
  );
}
