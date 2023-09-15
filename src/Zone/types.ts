export enum ZONE_TYPE {
  single = 'single',
  multi = 'multi',
  slot = 'slot',
}

export type SlotType = {
  id: string;
  x: number;
  y: number;
  pieceId: string | null;
};

export type ZoneType<zType = ZONE_TYPE> = zType extends ZONE_TYPE.single
  ? {
      zType: ZONE_TYPE.single | ZONE_TYPE.slot;
      x: number | string;
      y: number | string;
      width: number;
      height: number;
      id: string;
      meta?: any;
      UI?: boolean;
    }
  : {
      zType: ZONE_TYPE.multi;
      x: number | string;
      y: number | string;
      width: number;
      height: number;
      id: string;
      meta?: any;
      slots: SlotType[];
      UI?: boolean;
    };

export enum ZONE_SPACING_OPTIONS {
  centerX = 'centerX',
  centerY = 'centerY',
}
