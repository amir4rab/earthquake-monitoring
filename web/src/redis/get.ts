import { redis, connect } from './connect';

import { ExtendedEarthquakeArray } from '../types';

type StatesEarthquakes = ExtendedEarthquakeArray[];

interface StoredExtendedEarthquakeArray {
  // caching_timestamp: number;
  data: string;
}

/**
 * Gets  the latest earthquake data from Redis cache
 */
export const getCachedSatesEarthquakeDataById = async (
  stateId: string
): Promise<StatesEarthquakes | null> => {
  try {
    await connect();

    const result = (await redis.json.get(
      `statesEarthquakes:redisJson:${stateId}`
    )) as StoredExtendedEarthquakeArray | null;

    // returning null if data is't available
    if (result === null) return null;

    // Checking if data is stale
    // const currentData = new Date();
    // if (( currentData.valueOf() - result.caching_timestamp ) > stalingTime ) {
    //   await redis.json.del(`statesEarthquakes:redisJson:${stateId}`);
    //   return null;
    // }

    const json = await JSON.parse(result.data);
    return json.arr as ExtendedEarthquakeArray[];
  } catch (err) {
    console.error(err);
    return null;
  } finally {
    redis.disconnect();
  }
};

/**
 * Gets latest earthquake data from Redis cache
 */
export const getCachedLatestData =
  async (): Promise<ExtendedEarthquakeArray | null> => {
    try {
      await connect();

      const result = (await redis.json.get(
        `statesEarthquakes:redisJson:latest`
      )) as StoredExtendedEarthquakeArray | null;

      // returning null if data is't available
      if (result === null) return null;

      // Checking if data is stale
      // const currentData = new Date();
      // if (( currentData.valueOf() - result.caching_timestamp ) > stalingTime ) {
      //   await redis.json.del(`statesEarthquakes:redisJson:latest`);
      //   return null;
      // }

      const json = await JSON.parse(result.data);
      return json.arr as ExtendedEarthquakeArray;
    } catch (err) {
      console.error(err);
      return null;
    } finally {
      redis.disconnect();
    }
  };
