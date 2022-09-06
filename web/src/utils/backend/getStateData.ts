import { GetStatesDataFromPostgres } from '@/prisma';
import {
  getCachedSatesEarthquakeDataById,
  setEarthquakeDataToCache,
  delCachedStateDataById
} from '@/redis';
import { ExtendedEarthquakeArray } from '@/types/extendedEarthquake';

export interface GetStateDataProps {
  stateId: string;
  page: number;
  skipCache?: boolean;
}

export interface GetStateDataReturn {
  latestEarthquakesArr: ExtendedEarthquakeArray;
  totalPages: number;
}

const defaultReturn: GetStateDataReturn = {
  latestEarthquakesArr: [],
  totalPages: 0
};

const pageSize = 25;

/** Gets the latest data, either from cache or database */
const getStateData: (
  v: GetStateDataProps
) => Promise<GetStateDataReturn> = async ({
  stateId,
  skipCache = false,
  page
}) => {
  try {
    if (!skipCache) {
      const cachedStateData = await getCachedSatesEarthquakeDataById(stateId);

      if (cachedStateData !== null)
        return {
          latestEarthquakesArr: cachedStateData[
            page
          ] as ExtendedEarthquakeArray,
          totalPages: cachedStateData.length > 5 ? 5 : cachedStateData.length
        };
    } else {
      await delCachedStateDataById(stateId);
    }

    const { latestEarthquakesArr } = await GetStatesDataFromPostgres({
      stateId,
      pageSize: 25 * 5
    });

    if (latestEarthquakesArr.length === 0) return defaultReturn;

    const slicedStateData: ExtendedEarthquakeArray[] = [];
    const totalPages = Math.ceil(latestEarthquakesArr.length / pageSize);

    for (let i = 0; i < totalPages; i++) {
      slicedStateData.push(
        latestEarthquakesArr.slice(
          i * pageSize,
          (i + 1) * pageSize
        ) as ExtendedEarthquakeArray
      );
    }

    await setEarthquakeDataToCache(slicedStateData, stateId);

    return {
      latestEarthquakesArr: slicedStateData[page] as ExtendedEarthquakeArray,
      totalPages: totalPages > 5 ? 5 : totalPages
    };
  } catch (err) {
    console.error(err);
    return defaultReturn;
  }
};

export default getStateData;
