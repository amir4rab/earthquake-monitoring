import { prisma } from '@/prisma';

// types
import type { Earthquake } from '@prisma/client';

type GetLatestDataFromPostgres = (pageSize?: number) => Promise<Earthquake[]>;

export const getLatestDataFromPostgres: GetLatestDataFromPostgres = async (
  pageSize = 25
) => {
  try {
    const data = await prisma.earthquake.findMany({
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
      take: pageSize
    });

    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
};
