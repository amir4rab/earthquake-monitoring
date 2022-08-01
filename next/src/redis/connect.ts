import { createClient, RedisClientType } from 'redis';

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var redis: RedisClientType | undefined
}

export const redis = 
  global.redis ||
  createClient({
    url: process.env.REDIS_DATABASE_URL
  });

if ( process.env.NODE_ENV !== 'production' ) global.redis = redis;

export async function connect() {
  if (!redis.isOpen) {
    await redis.connect();
  }
};