import { ZONE_TYPE, type ZoneType } from './types';
import { ZONE_SPACING } from './zoneSpacing';

export function createGridZones({
  rows,
  columns,
  offsetX = 0,
  offsetY = 0,
  gapX = 0,
  gapY = 0,
  gridSize,
}: {
  gridSize: number;
  rows: number;
  columns: number;
  offsetX?: number;
  offsetY?: number;
  gapX?: number;
  gapY?: number;
}): ZoneType[] {
  const zones: ZoneType[] = [];
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < columns; y++) {
      zones.push({
        zType: ZONE_TYPE.single,
        x: x * gridSize + offsetX + x * gapX,
        y: y * gridSize + offsetY + y * gapY,
        width: gridSize,
        height: gridSize,
        id: `${x}-${y}`,
        meta: {
          gridX: x,
          gridY: y,
        },
      });
    }
  }
  return zones;
}

export function findZoneByCoords(
  zones: ZoneType[],
  x: number,
  y: number
): string | undefined {
  const zone = zones.find((z) => {
    const zoneX = getZoneX(z);
    const zoneY = getZoneY(z);
    return (
      x >= zoneX && x <= zoneX + z.width && y >= zoneY && y <= zoneY + z.height
    );
  });

  if (zone) return zone.id;
  return undefined;
}

export function getZoneX(zone: ZoneType): number {
  if (typeof zone.x === 'number') return zone.x;
  return ZONE_SPACING[zone.x](zone.width);
}

export function getZoneY(zone: ZoneType): number {
  if (typeof zone.y === 'number') return zone.y;
  return ZONE_SPACING[zone.y](zone.height);
}

export function createSlotsRow({
  amount,
  zoneID,
  spaceBetween,
}: {
  amount: number;
  zoneID: string;
  spaceBetween: number;
}) {
  let slots = [];
  for (let i = 0; i < amount; i++) {
    slots.push({
      id: `${zoneID}-slot-${i}`,
      x: i * spaceBetween,
      y: 0,
      pieceId: null,
    });
  }
  return slots;
}

export function movePieceToZone({
  G,
  pieceId,
  zoneId,
}: {
  G: any;
  pieceId: string;
  zoneId: string;
}): any {
  const piece = G.pieces.find((p) => p.id === pieceId);
  const currZone = G.zones.find((z) => z.id === piece.currZoneId);
  let targetZone = G.zones.find((z) => z.id === zoneId);

  function removePieceFromCurrZone() {
    if (piece.UI !== targetZone.UI) {
      piece.UI = targetZone.UI;
    }
    if (currZone.zType === ZONE_TYPE.multi) {
      const slot = currZone.slots.find((s) => s.pieceId === pieceId);
      if (!slot) return;
      slot.pieceId = null;

      //shuffle pieces down
      for (
        let moveCount = 0;
        moveCount < currZone.slots.length - 1;
        moveCount++
      ) {
        for (let i = 0; i < currZone.slots.length; i++) {
          if (!currZone.slots[i].pieceId && i + 1 < currZone.slots.length) {
            if (currZone.slots[i + 1].pieceId) {
              currZone.slots[i].pieceId = currZone.slots[i + 1].pieceId;
              currZone.slots[i + 1].pieceId = null;
            }
          }
        }
      }
    }
  }

  if (targetZone.zType === ZONE_TYPE.single) {
    removePieceFromCurrZone();
    piece.currZoneId = zoneId;
  } else if (targetZone.zType === ZONE_TYPE.multi) {
    const emptySlot = targetZone.slots.find((s) => s.pieceId === null);
    if (!emptySlot) return { status: 'failed' };
    removePieceFromCurrZone();
    piece.currZoneId = zoneId;
    emptySlot.pieceId = pieceId;
  }
  return { status: 'OK' };
}
