import { City, Earthquake } from '@prisma/client';

export interface ExtendedEarthquake extends Earthquake {
  city: City
};

export type ExtendedEarthquakeArray = ExtendedEarthquake[];