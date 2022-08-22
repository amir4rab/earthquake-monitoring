import { useEffect, useState } from 'react';

import useSWR from 'swr';
import fetcher from '@/swr-fetcher';

// types
import { ExtendedEarthquakeArray } from '@/types/extendedEarthquake';

interface UseFetchStateDataProps {
  currentPage: number;
  stateId: string;
}
const useFetchStateData = ({
  currentPage,
  stateId
}: UseFetchStateDataProps) => {
  const [page, setPage] = useState(currentPage);
  const [bufferedData, setBufferedData] = useState<ExtendedEarthquakeArray>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [initialLoading, setInitialLoading] = useState(true);

  const { data: response, isValidating } = useSWR(
    `/api/state?state=${stateId}&page=${page}`,
    (...props) =>
      fetcher<{
        data: null | {
          latestEarthquakesArr: ExtendedEarthquakeArray;
          totalPages: number;
          err: string | null;
        };
      }>(...props)
  );

  useEffect(() => {
    if (
      !isValidating &&
      typeof response?.data?.latestEarthquakesArr !== 'undefined'
    ) {
      setBufferedData(response.data.latestEarthquakesArr);
      setTotalPages(response.data.totalPages);
      setInitialLoading(false);
    }
  }, [page, isValidating, response]);

  return {
    initialLoading: initialLoading,
    isLoading: initialLoading || isValidating,
    data: bufferedData,
    totalPages,
    setPage: (newPage: number) =>
      page > 0 && page <= totalPages && setPage(newPage),
    page
  };
};

export default useFetchStateData;
