import { ZONE_TYPE, type ZoneType } from './types';

export function createGridZones({
  rows,
  columns,
  offsetX = 0,
  offsetY = 0,
  gapX = 0,
  gapY = 0,
  gridSizeX,
  gridSizeY,
}: {
  gridSizeX: number;
  gridSizeY: number;
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
        x: x * gridSizeX + offsetX + x * gapX,
        y: y * gridSizeY + offsetY + y * gapY,
        width: gridSizeX,
        height: gridSizeY,
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
