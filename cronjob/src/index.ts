// settings up env files
import dotenv from 'dotenv';

// utils
import cronjob from './utils/cronjob';
import getTimeInterval from './utils/getTimeInterval';

// Prisma
import { PrismaClient } from '@prisma/client';

dotenv.config();

const defaultTimeInterval = 1000 * 60 * 10; // default time interval is 10 minutes
const timeInterval = getTimeInterval(defaultTimeInterval);

const date = new Date();
// setting up prisma client globally
const prisma = new PrismaClient();

console.log(
  `Started cronjob server at ${date.toLocaleDateString(
    'de'
  )} ${date.toLocaleTimeString('de')}. ⚡`
);
let connectedToNext = false;

if (process.env.NODE_ENV === 'development')
  cronjob({
    verbose: true,
    revalidateInDev: true,
    skipCallingNext: true,
    prisma
  });

(async () => {
  while (!connectedToNext) {
    console.log('Trying to connect to Next.js 🔗');
    connectedToNext = await new Promise<boolean>((resolve) => {
      setTimeout(async () => {
        try {
          const fetch = (await import('node-fetch')).default;
          await fetch(process.env.NEXT_JS_API_ROUTE as string);

          resolve(true);
          console.log('Connected to Next.js 🎉');

          setInterval(() => {
            const date = new Date();
            console.log(`Running cronjob, ${date.toLocaleTimeString('de')} ⏰`);

            cronjob({ verbose: true, revalidateInDev: true, prisma });
          }, timeInterval); // every 10 minutes
        } catch (err) {
          resolve(false);
        }
      }, 1000 * 10); // starting after five minutes in order to wait for next.js server to become ready
    });
  }
})();
