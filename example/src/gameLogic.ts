import type { PieceType, ZoneType } from 'meepl';
import { ChessPieceType } from './chessPieceTypes';

export function isZoneAvailable({
  id,
  activePlayer,
  pieces,
  zones,
}: {
  id: string;
  activePlayer: any;
  pieces: PieceType[];
  zones: ZoneType[];
}): boolean {
  const activePiece = pieces.find((p) => p.id === activePlayer.activePiece);

  if (!activePiece) return false;

  const currZone = zones.find((z) => z.id === activePiece.currZoneId);
  const targetZone = zones.find((z) => z.id === id);

  switch (activePiece.type) {
    case ChessPieceType.w_rook:
    case ChessPieceType.b_rook:
    case ChessPieceType.w_pawn:
    case ChessPieceType.b_pawn:
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
