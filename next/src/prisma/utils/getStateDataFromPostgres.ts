// prisma
import { prisma } from '../connect';

// types
import { Earthquake } from '@prisma/client';

export interface GetStatesDataFromPostgresProps {
  stateId: string;
  pageSize?: number;
  page?: number;
}
export interface GetStatesDataFromPostgresReturn {
  latestEarthquakesArr: Earthquake[];
  totalPages: number;
}

/**
 * Finds the latest events of the requested state
 */
export const GetStatesDataFromPostgres = async ({ stateId, pageSize= 25, page= 0 }: GetStatesDataFromPostgresProps ): Promise<GetStatesDataFromPostgresReturn> => {
  const earthquakes = await prisma.earthquake.findMany({
    where: {
      state: {
        equals: parseInt(stateId)
      },
    },
    include: {
      city: {
        select: {
          name: true,
          nameFa: true
        }
      }
    },
    orderBy: {
      date: 'desc'
    },
    take: pageSize,
    skip: pageSize * page
  })

  const count = await prisma.earthquake.count({
    where: {
      state: {
        equals: parseInt(stateId)
      },
    }
  });

  return ({
    latestEarthquakesArr: earthquakes.map( i => (({ ...i, date: i.date.valueOf() } as unknown ) as Earthquake)),
    totalPages: Math.ceil(count/pageSize),
  });
};

export default GetStatesDataFromPostgres;