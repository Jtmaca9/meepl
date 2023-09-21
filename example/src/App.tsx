import React, { useState } from 'react';
import { GameWrapper } from 'meepl';
import styled from 'styled-components/native';

// Chess
import ChessGame from './Chess/gameConfig/gameConfig';
import ChessGameView from './Chess/GameView';

// Regicide
import RegicideGame from './Regicide/gameConfig/gameConfig';
import RegicideGameView from './Regicide/GameView';

const SelectorContainer = styled.View`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const SelectorButton = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  background-color: #000;
  justify-content: center;
  align-items: center;
`;

const SelectorText = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
`;

export default function App() {
  const [selectedGame, setSelectedGame] = useState(null);

  if (!selectedGame) {
    return (
      <SelectorContainer>
        <SelectorButton onPress={() => setSelectedGame('chess')}>
          <SelectorText>Chess</SelectorText>
        </SelectorButton>
        <SelectorButton onPress={() => setSelectedGame('regicide')}>
          <SelectorText>Regicide</SelectorText>
        </SelectorButton>
      </SelectorContainer>
    );
  } else {
    switch (selectedGame) {
      case 'chess':
        return (
          <GameWrapper
            gameConfig={ChessGame}
            gameView={ChessGameView}
            player={'0'}
          />
        );
      case 'regicide':
        return (
          <GameWrapper
            gameConfig={RegicideGame}
            gameView={RegicideGameView}
            player={'0'}
          />
        );
      default:
        return null;
    }
  }
}
