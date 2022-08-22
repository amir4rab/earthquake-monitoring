import { redis, connect } from './connect';

// types
import { ExtendedEarthquakeArray } from '../types';

/**
 * Sets earthquake data to Redis Cache
 */
export const setEarthquakeDataToCache = async (
  data: ExtendedEarthquakeArray[],
  stateId: string
) => {
  try {
    await connect();
    await redis.json.set(`statesEarthquakes:redisJson:${stateId}`, '$', {
      data: JSON.stringify({ arr: data })
      // time_stamp: currentDate.valueOf()
    });

    return true;
  } catch (err) {
    console.error(err);
    return false;
  } finally {
    await redis.disconnect();
  }
};

/**
 * Sets latest earthquake data to Redis Cache
 */
export const setLatestEarthquakeDataToCache = async (
  data: ExtendedEarthquakeArray
) => {
  try {
    await connect();
    await redis.json.set(`statesEarthquakes:redisJson:latest`, '$', {
      data: JSON.stringify({ arr: data })
      // time_stamp: currentDate.valueOf()
    });

    return true;
  } catch (err) {
    console.error(err);
    return false;
  } finally {
    await redis.disconnect();
  }
};
