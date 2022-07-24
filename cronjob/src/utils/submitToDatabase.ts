// prisma
import { Prisma, PrismaClient } from '@prisma/client';

// calcDiff util
import calcDiff from './calcDiff';

/**
 * Calculates the difference from new data and the existing data in database, and submits the new data
 */
const submitToDatabase = async ( data: Prisma.EarthquakeCreateInput[] ): Promise<Prisma.EarthquakeCreateInput[]> => {
  try {
    const prisma = new PrismaClient();
    await prisma.$connect();
      
    const latestItem = await prisma.earthquake.findFirst({ // gets the latest added item to db
      orderBy: {
        date: 'desc'
      }
    });
  
    const diff = latestItem === null ? data : calcDiff(data, latestItem.id.trim()); 
  
    if ( diff.length === 0 ) return [];
  
    for ( let i = 0; i < diff.length; i++ ) {
      diff[i] && await prisma.earthquake.create({ data: diff[i] })
    }
      
    await prisma.$disconnect();
    return diff
  } catch (err) {
    console.error(`Error in "submitToDatabase":`, err);
    return []
  }
}

export default submitToDatabase;