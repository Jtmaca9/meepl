import { ZONE_TYPE, type ZoneType, createSlotsRow } from 'meepl';

export const zones: ZoneType[] = [
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
];
