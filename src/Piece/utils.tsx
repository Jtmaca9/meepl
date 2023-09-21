import { ZONE_TYPE } from '../Zone/types';
import { getZoneX, getZoneY, findZoneByCoords } from '../Zone/utils';
import type { PieceType } from './types';

// TODO: move this into actions file
export function createPieceOnTable({
  G,
  piece,
  targetZoneID,
}: {
  G: any;
  piece: PieceType;
  targetZoneID: string;
}) {
  const newPiece: Partial<PieceType> = {
    ...piece,
    currZoneId: targetZoneID,
  };

  let targetZone = G.zones.find((zone) => zone.id === targetZoneID);

  if (targetZone.zType === ZONE_TYPE.multi) {
    const emptySlot = targetZone.slots.find((s) => s.pieceId === null);
    if (!emptySlot) {
      return { status: 'failed', piece: null };
    }
    emptySlot.pieceId = newPiece.id;
  }

  G.pieces = [...G.pieces, newPiece];
  return { status: 'OK', piece: newPiece };
}

export function getPieceStartingCoords({
  zones,
  currZoneId,
  UI,
}: {
  zones: any[];
  currZoneId: string;
  UI: boolean;
}) {
  if (UI) return { x: 0, y: 0 };
  let initZone = zones.find((zone) => zone.id === currZoneId) || { x: 0, y: 0 };
  const initX = getZoneX(initZone);
  const initY = getZoneY(initZone);
  return { x: initX, y: initY };
}

export function getTargetZoneID({
  tableTransform,
  zones,
  event,
  UI,
  pX,
  pY,
  width,
  height,
}: any) {
  let targetZoneID = null;
  if (UI) {
    const offsetX =
      tableTransform.x -
      (tableTransform.width * tableTransform.scale - tableTransform.width) / 2;
    const offsetY =
      tableTransform.y -
      (tableTransform.height * tableTransform.scale - tableTransform.height) /
        2;
    targetZoneID = findZoneByCoords(
      zones,
      (event.absoluteX - offsetX) / tableTransform.scale,
      (event.absoluteY - offsetY) / tableTransform.scale
    );
  } else {
    targetZoneID = findZoneByCoords(
      zones,
      pX.value + width / 2,
      pY.value + height / 2
    );
  }

  return targetZoneID;
}
