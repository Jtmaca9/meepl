import { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { GameWrapper } from 'meepl';

// Chess
import ChessGame from './Chess/Game/gameConfig';
import ChessGameView from './Chess/GameView';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default function App() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  if (!selectedGame) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setSelectedGame('chess')}
        >
          <Text style={styles.buttonText}>Chess</Text>
        </TouchableOpacity>
      </View>
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
      default:
        return null;
    }
  }
}
