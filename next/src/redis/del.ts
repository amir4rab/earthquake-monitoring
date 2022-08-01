import { redis, connect } from './connect';

/** Deletes EVERY sates data from Redis Cache */
export const delCachedDataAll = async () => {
  try {
    await connect();

    for await (const key of redis.scanIterator()) {
      await redis.json.del(key);
    }
    return true;
  } catch ( err ) {
    console.error(err);
    return null
  } finally {
    await redis.disconnect()
  }
}

/** Deletes specific sates data from Redis Cache */
export const delCachedStateDataById = async ( stateId: string ) => {
  try {
    await connect();
    
    await redis.json.del(`statesEarthquakes:redisJson:${stateId}`);

    return true;
  } catch ( err ) {
    console.error(err);
    return null
  } finally {
    await redis.disconnect()
  }
}

/** Deletes specific sates data from Redis Cache */
export const delCachedLatestData = async () => {
  try {
    await connect();
    
    await redis.json.del(`statesEarthquakes:redisJson:latest`);

    return true;
  } catch ( err ) {
    console.error(err);
    return null
  } finally {
    await redis.disconnect()
  }
}