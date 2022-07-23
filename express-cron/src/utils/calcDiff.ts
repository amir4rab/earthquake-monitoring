import { Earthquake, Prisma } from "@prisma/client";

const calcDiff = ( latestData: Prisma.EarthquakeCreateInput[], latestItemHash: string ): Prisma.EarthquakeCreateInput[] => {
  try {

    const orderedArr = latestData.sort((a, b) => {
      const valueA = new Date(a.date).valueOf();
      const valueB = new Date(b.date).valueOf();

      if ( valueA > valueB ) return 1;
      if ( valueA < valueB ) return -1;
      return 0;
    })

    const indexOfLatestItem = orderedArr.findIndex(({ id }) => id === latestItemHash );

    console.log(indexOfLatestItem + 1 !== orderedArr.length, orderedArr.length)

    const slicedArr = 
      indexOfLatestItem === -1 ? orderedArr : // incase we couldn't found the previous item in the database
      indexOfLatestItem + 1 !== orderedArr.length ? [] : // incase the founded item was the latest fetched item, there four there is no new items and we return empty array
      orderedArr.slice(indexOfLatestItem + 1); // in other cases we slice the array and return it

    return slicedArr;
  } catch(err) {
    console.log(`Error in "calcDiff": `, err);
    return [];
  };
}

export default calcDiff;