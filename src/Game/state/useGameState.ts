import { useEffect, useState } from 'react';

function useGameState(props) {
  const { G, ctx, moves, playerID, plugins } = props;

  const [players, setPlayers] = useState(plugins.player.data.players);
  const [meta, setMeta] = useState({
    playerID,
    currentPlayerID: ctx.currentPlayer,
    currentPlayer: players[ctx.currentPlayer],
    isCurrentPlayer: playerID === ctx.currentPlayer,
  });
  const [pieces, setPiecesLocal] = useState(G.pieces);
  const [zones] = useState(G.zones);

  const [shouldUpdate, setShouldUpdate] = useState(false);

  useEffect(() => {
    setPlayers(plugins.player.data.players);
  }, [plugins.player]);

  useEffect(() => {
    setMeta(() => ({
      ...meta,
      currentPlayerID: ctx.currentPlayer,
      currentPlayer: plugins.player.data.players[ctx.currentPlayer],
      isCurrentPlayer: playerID === ctx.currentPlayer,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctx.currentPlayer, plugins.player]);

  useEffect(() => {
    if (!G.pieces) return;
    if (G.pieces.length === 0 || !shouldUpdate) return;
    setPiecesLocal(G.pieces);
    setShouldUpdate(false);
  }, [G.pieces, shouldUpdate]);

  const handleMove = (move, args) => {
    if (!meta.isCurrentPlayer) return;
    move(...args);
    setShouldUpdate(true);
  };

  return {
    players,
    meta,
    pieces,
    zones,
    moves,
    handleMove,
  };
}

export default useGameState;
