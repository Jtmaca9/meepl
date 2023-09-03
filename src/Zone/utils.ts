import type { ZoneType } from './types';

export function createGridZones({
  gridSize,
  rows,
  columns,
  offsetX = 0,
  offsetY = 0,
  gapX = 0,
  gapY = 0,
  devMode = false,
}: {
  gridSize: number;
  rows: number;
  columns: number;
  offsetX?: number;
  offsetY?: number;
  gapX?: number;
  gapY?: number;
  devMode?: boolean;
}): ZoneType[] {
  const zones: ZoneType[] = [];
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < columns; y++) {
      zones.push({
        x: x * gridSize + offsetX + x * gapX,
        y: y * gridSize + offsetY + y * gapY,
        width: gridSize,
        height: gridSize,
        devMode,
        id: `${x}-${y}`,
      });
    }
  }
  return zones;
}
