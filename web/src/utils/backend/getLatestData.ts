import type { ExtendedEarthquakeArray } from '@/types/extendedEarthquake';

import { getLatestDataFromPostgres } from '@/prisma';
import {
  getCachedLatestData,
  setLatestEarthquakeDataToCache,
  delCachedLatestData
} from '@/redis';

type GetLatestData = (skipCache?: boolean) => Promise<ExtendedEarthquakeArray>;

const defaultReturn: ExtendedEarthquakeArray = [];

/** Gets the latest data, either from cache or database */
const getLatestData: GetLatestData = async (skipCache = false) => {
  try {
    if (!skipCache) {
      const cachedStateData = await getCachedLatestData();

      if (cachedStateData !== null)
        return cachedStateData as ExtendedEarthquakeArray;
    } else {
      await delCachedLatestData();
    }

    const latestEarthquakesArr = await getLatestDataFromPostgres(25);

    if (latestEarthquakesArr.length === 0) return defaultReturn;

    const latestSortedData = latestEarthquakesArr.sort((a, b) => {
      if (a.date > b.date) return -1;
      if (b.date > a.date) return 1;
      return 0;
    });

    await setLatestEarthquakeDataToCache(
      latestSortedData as ExtendedEarthquakeArray
    );

    return latestSortedData as ExtendedEarthquakeArray;
  } catch (err) {
    console.error(err);
    return defaultReturn;
  }
};

export default getLatestData;
