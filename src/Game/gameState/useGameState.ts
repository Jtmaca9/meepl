import { useEffect, useState } from 'react';

interface UseGameStateProps {
  G: any;
  ctx: any;
  moves: any;
  playerID: string;
  plugins: any;
}

function useGameState({
  G,
  ctx,
  moves,
  playerID,
  plugins,
  ...props
}: Readonly<UseGameStateProps>) {
  const players = plugins.player.data.players;

  const [meta, setMeta] = useState({
    playerID,
    currentPlayerID: ctx.currentPlayer,
    currentPlayer: players[ctx.currentPlayer],
    isCurrentPlayer: playerID === ctx.currentPlayer,
  });

  const [tableTransform, setTableTransform] = useState({
    x: 0,
    y: 0,
    scale: 1,
    width: 1,
    height: 1,
  });

  useEffect(() => {
    setMeta(() => ({
      ...meta,
      currentPlayerID: ctx.currentPlayer,
      currentPlayer: plugins.player.data.players[ctx.currentPlayer],
      isCurrentPlayer: playerID === ctx.currentPlayer,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerID, plugins.player, ctx.currentPlayer]);

  return {
    players,
    meta,
    pieces: G.pieces,
    zones: G.zones,
    G,
    ctx,
    moves,
    tableTransform,
    setTableTransform,
    ...props,
  };
}

export default useGameState;
