import type { Prisma } from '@prisma/client';

interface CallNextProps {
  apiKey: string;
  apiRoute: string;
  diff: Prisma.EarthquakeCreateInput[];
}

const findStatesWithNewItems = (arr: Prisma.EarthquakeCreateInput[]) => {
  const states: { [v: number]: null } = {};

  for (let i = 0; i < arr.length; i++) {
    const state = arr[i].state;

    states[state] = null;
  }

  return Object.keys(states);
};

/**
 * Calls next app api routs to re-generate cached data
 */
const callNext = async ({ apiKey, apiRoute, diff }: CallNextProps) => {
  try {
    const requestBody: {
      latest?: boolean;
      states?: number[];
    } = {};

    if (diff.length !== 0) requestBody.latest = true;

    const statesWithNewData = findStatesWithNewItems(diff);
    if (statesWithNewData.length !== 0)
      requestBody.states = statesWithNewData.map((i) => parseInt(i));

    const fetch = (await import('node-fetch')).default;

    const res = await fetch(apiRoute, {
      body: JSON.stringify(requestBody),
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json'
      }
    });

    const { err } = (await res.json()) as {
      err: string | null;
      successful: boolean;
    };

    if (err === null) {
      console.log('Successfully regenerated next.js pages');
    } else {
      console.error(`⚠️ Error in "callNext": `, err);
    }
  } catch (err) {
    console.log(`⚠️ Error in "callNext": `, err);
  }
};

export default callNext;
