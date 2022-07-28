import { useEffect, useState } from 'react';

import useSWR from 'swr';
import fetcher from '@/swr-fetcher';

// types
import type { Earthquake } from '@prisma/client';

interface UseFetchStateDataProps {
  currentPage: number;
  pages: number;
  stateId: string;
  initialPageData: Earthquake[];
}
const useFetchStateData = ({ currentPage, pages, stateId, initialPageData }: UseFetchStateDataProps ) => {
  const [ page, setPage ] = useState(currentPage)
  const [ bufferedData, setBufferedData ] = useState(initialPageData);

  const { data, isValidating } = useSWR( 
    page > 1 ? `/api/state?state=${stateId}&page=${ page }` : null,
    ( ...props ) => fetcher<{ data: null | { latestEarthquakesArr: Earthquake[], err: string | null } }>( ...props )
  );

  useEffect(() => {
    if ( page === 1 ) setBufferedData(initialPageData)
    if ( !isValidating && typeof data?.data?.latestEarthquakesArr !== 'undefined' ) setBufferedData(data.data.latestEarthquakesArr)
  }, [ page, isValidating, initialPageData, data ]);


  return ({
    isLoading: page === 1 ? false : isValidating,
    data: bufferedData,
    setPage: (newPage: number) => ( page > 0 && page <= pages ) && setPage(newPage),
    page
  })
};

export default useFetchStateData;