import { View, type ViewProps } from 'react-native';
import { Client } from 'boardgame.io/react-native';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    zIndex: 10,
  },
});

interface GameWrapperProps extends ViewProps {
  gameConfig: any;
  player: string;
  multiplayer?: any;
  gameView: any;
  containerStyle?: any;
}

function GameWrapper({
  gameConfig,
  gameView,
  player,
  multiplayer,
  containerStyle = {},
  ...props
}: Readonly<GameWrapperProps>) {
  const App = multiplayer
    ? Client({ game: gameConfig, board: gameView, multiplayer })
    : Client({ game: gameConfig, board: gameView });
  return (
    <>
      <View style={[styles.container, containerStyle]} {...props}>
        <App playerID={player} />
      </View>
    </>
  );
}

export default GameWrapper;
