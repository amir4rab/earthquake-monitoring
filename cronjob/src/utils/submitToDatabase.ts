// prisma
import { Prisma, PrismaClient } from '@prisma/client';

// calcDiff util
import calcDiff from './calcDiff';

/**
 * Calculates the difference from new data and the existing data in database, and submits the new data
 */
const submitToDatabase = async (
  data: Prisma.EarthquakeCreateInput[],
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >
): Promise<Prisma.EarthquakeCreateInput[]> => {
  if (data.length === 0) {
    console.error(
      `⚠️ Error in "submitToDatabase":`,
      'submitToDatabase has been called with an empty array!'
    );
    return [];
  }

  await prisma.$connect();

  try {
    const latestItem = await prisma.earthquake.findFirst({
      // gets the latest added item to db
      orderBy: {
        date: 'desc'
      }
    });

    const diff =
      latestItem === null ? data : calcDiff(data, latestItem.id.trim());

    if (diff.length === 0) {
      await prisma.$disconnect();
      return [];
    }

    for (let i = 0; i < diff.length; i++) {
      diff[i] && (await prisma.earthquake.create({ data: diff[i] }));
    }

    await prisma.$disconnect();
    return diff;
  } catch (err) {
    console.error(`⚠️ Error in "submitToDatabase":`, err);
    return [];
  } finally {
    await prisma.$disconnect();
  }
};

export default submitToDatabase;
