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
  const [pieces, setPieces] = useState(G.pieces || []);
  const [zones, setZones] = useState(G.zones || []);
  const [zonesUI, setZonesUI] = useState(G.zonesUI || []);

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
    setPieces(G.pieces);
  }, [G.pieces]);

  useEffect(() => {
    if (!G.zones) return;
    if (G.zones.length === 0) return;
    setZones(G.zones);
  }, [G.zones]);

  useEffect(() => {
    if (!G.zonesUI) return;
    if (G.zonesUI.length === 0) return;
    setZonesUI(G.zonesUI);
  }, [G.zonesUI]);

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
    zonesUI,
  };
}

export default useGameState;
