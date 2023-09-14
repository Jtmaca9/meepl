import {
  ZONE_SPACING_OPTIONS,
  ZONE_TYPE,
  type ZoneType,
  createSlotsRow,
} from 'meepl';

export const zones: ZoneType[] = [
  {
    x: ZONE_SPACING_OPTIONS.centerX,
    y: 150,
    width: 63,
    height: 90,
    id: '1',
    zType: ZONE_TYPE.single,
  },
  {
    x: ZONE_SPACING_OPTIONS.centerX,
    y: 400,
    width: 63,
    height: 90,
    id: '2',
    zType: ZONE_TYPE.single,
  },
  {
    x: ZONE_SPACING_OPTIONS.centerX,
    y: 600,
    width: 63,
    height: 90,
    id: '3',
    zType: ZONE_TYPE.multi,
    slots: createSlotsRow({
      amount: 3,
      zoneID: '3',
      spaceBetween: 65,
    }),
  },
];

export const zonesPan: ZoneType[] = [
  {
    x: 150,
    y: 50,
    width: 63,
    height: 90,
    id: '1',
    zType: ZONE_TYPE.single,
  },
  {
    x: 150,
    y: 150,
    width: 63,
    height: 90,
    id: '2',
    zType: ZONE_TYPE.single,
  },
  {
    x: 50,
    y: 250,
    width: 200,
    height: 90,
    id: '3',
    zType: ZONE_TYPE.multi,
    slots: createSlotsRow({
      amount: 3,
      zoneID: '3',
      spaceBetween: 65,
    }),
  },
];

export const zonesUIPan: ZoneType[] = [
  {
    x: ZONE_SPACING_OPTIONS.centerX,
    y: 40,
    width: 65 * 5,
    height: 92,
    id: 'hand',
    zType: ZONE_TYPE.multi,
    slots: createSlotsRow({
      amount: 5,
      zoneID: 'hand',
      spaceBetween: 65,
    }),
  },
];
