import {
  ZONE_SPACING_OPTIONS,
  ZONE_TYPE,
  type ZoneType,
  createSlotsRow,
  ZONE_SPACING,
} from 'meepl';

export const zones: ZoneType[] = [
  {
    x: ZONE_SPACING_OPTIONS.centerX,
    y: 150,
    width: 65,
    height: 93,
    id: '1',
    zType: ZONE_TYPE.single,
  },
  {
    x: ZONE_SPACING_OPTIONS.centerX,
    y: 400,
    width: 65,
    height: 93,
    id: '2',
    zType: ZONE_TYPE.single,
  },
  {
    x: ZONE_SPACING_OPTIONS.centerX,
    y: 600,
    width: 65,
    height: 93,
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
    width: 65,
    height: 93,
    id: '1',
    zType: ZONE_TYPE.single,
  },
  {
    x: 150,
    y: 150,
    width: 65,
    height: 93,
    id: '2',
    zType: ZONE_TYPE.single,
  },
  {
    x: 50,
    y: 250,
    width: 195,
    height: 93,
    id: '3',
    zType: ZONE_TYPE.multi,
    slots: createSlotsRow({
      amount: 3,
      zoneID: '3',
      spaceBetween: 65,
    }),
  },
  {
    x: ZONE_SPACING.centerX(65 * 5),
    y: ZONE_SPACING.fromBottom({
      y: 25,
      height: 93,
    }),
    width: 65 * 5,
    height: 93,
    id: 'hand',
    UI: true,
    zType: ZONE_TYPE.multi,
    slots: createSlotsRow({
      amount: 5,
      zoneID: 'hand',
      spaceBetween: 65,
    }),
  },
];
