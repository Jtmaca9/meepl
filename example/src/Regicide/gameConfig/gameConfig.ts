import { createGameConfig, createPieceOnTable, movePieceToZone } from 'meepl';

import { zones } from './zones';
import pieces from './pieces';
import { PlayingCardType, PlayingCardSuit } from './pieceTypes';

const moves = {
  movePiece: ({ G }, pieceId, zoneId) => {
    movePieceToZone({ G, pieceId, zoneId });
  },
  // @ts-ignore
  movePieceFromUIToZone: (
    { G, player },
    { pieceID, uiLocation, targetZoneID }
  ) => {
    const currPlayer = player.get();
    const piece = currPlayer[uiLocation].find((p) => p.id === pieceID);

    const { status } = createPieceOnTable({
      G,
      piece,
      targetZoneID,
    });
    if (status === 'OK') {
      player.set({
        ...currPlayer,
        [uiLocation]: currPlayer[uiLocation].filter((p) => p.id !== piece.id),
      });
    }
  },
};

const RegicideGame = createGameConfig({
  name: 'Regicide',
  zones: zones,
  pieces,
  moves,
  minPlayers: 1,
  maxPlayers: 4,
  undoAllowed: true,
  playerView: (players) => players,
  playerSetup: (playerID) => ({
    name: `Player ${playerID}`,
    id: playerID,
    hand: [
      {
        id: 'Kingly',
        type: PlayingCardType.king,
        owner: '0',
        variant: PlayingCardSuit.tiles,
      },
      {
        id: 'queenads',
        type: PlayingCardType.queen,
        owner: '0',
        variant: PlayingCardSuit.clovers,
      },
      {
        id: 'handcardads',
        type: PlayingCardType.ace,
        owner: '0',
        variant: PlayingCardSuit.clovers,
      },
    ],
  }),
});

export default RegicideGame;
