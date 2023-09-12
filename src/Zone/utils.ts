import type { ZoneType } from './types';
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
