import type { PieceType, ZoneType } from 'meepl';
import { ChessPieceType } from './chessPieceTypes';
import type { AnimatableStringValue } from 'react-native';

export function isZoneAvailable(
  activePieceID: AnimatableStringValue | null,
  {
    id,
    activePlayer,
    pieces,
    zones,
  }: {
    id: string;
    activePlayer: any;
    pieces: PieceType[];
    zones: ZoneType[];
  }
): boolean {
  const activePiece = pieces.find(({ id }) => id === activePieceID);
  if (!activePiece) return false;

  const currZone = zones.find((z) => z.id === activePiece.currZoneId);
  const targetZone = zones.find((z) => z.id === id);

  switch (activePiece.type) {
    case ChessPieceType.rook:
    case ChessPieceType.pawn:
      return isZoneAvailableForRook({
        currZone,
        targetZone,
        activePlayer,
        zones,
        pieces,
      });
    default:
      return false;
  }
}

function isZoneAvailableForRook({
  currZone,
  targetZone,
  activePlayer,
  pieces,
  zones,
}: {
  currZone: ZoneType;
  targetZone: ZoneType;
  activePlayer: any;
  pieces: PieceType[];
  zones: ZoneType[];
}): boolean {
  const {
    meta: { gridX: currX, gridY: currY },
  } = currZone;
  const {
    meta: { gridX: targetX, gridY: targetY },
  } = targetZone;

  if (currX === targetX || currY === targetY) {
    const isPieceBetween =
      currX === targetX
        ? pieces.some(({ currZoneId }) => {
            const zone = zones.find((z) => z.id === currZoneId);
            const { gridX, gridY } = zone.meta;
            return (
              gridX === currX &&
              gridY > Math.min(currY, targetY) &&
              gridY < Math.max(currY, targetY)
            );
          })
        : pieces.some(({ currZoneId }) => {
            const zone = zones.find((z) => z.id === currZoneId);
            const { gridX, gridY } = zone.meta;
            return (
              gridY === currY &&
              gridX > Math.min(currX, targetX) &&
              gridX < Math.max(currX, targetX)
            );
          });
    if (!isPieceBetween) {
      const pieceOnTarget = pieces.find(
        ({ currZoneId }) => currZoneId === targetZone.id
      );
      if (!pieceOnTarget || pieceOnTarget.owner !== activePlayer.id)
        return true;
    }
  }
  return false;
}
