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
    if (G.pieces.length === 0) return;
    setPiecesLocal(G.pieces);
  }, [G.pieces]);

  const handleMove = (move, args) => {
    if (!meta.isCurrentPlayer) return;
    move(...args);
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
