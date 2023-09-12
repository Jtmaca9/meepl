export type ZoneType = {
  x: number | string;
  y: number | string;
  width: number;
  height: number;
  id: string;
  meta?: any;
};

export enum ZONE_SPACING_OPTIONS {
  centerX = 'centerX',
  centerY = 'centerY',
}
