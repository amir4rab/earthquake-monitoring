// types
import type { ExtendedEarthquake } from '../nearme';

/** filters array with the maximum range */
const filterArray = (
  arr: ExtendedEarthquake[],
  distances: { min: number; max: number },
  maximumRange: number
) =>
  arr
    .filter(
      ({ distance }) =>
        distance <=
        distances.min + ((distances.max - distances.min) * maximumRange) / 100
    )
    .sort((a, b) => {
      if (a.date < b.date) return 1;
      if (a.date > b.date) return -1;
      return 0;
    });

export default filterArray;
