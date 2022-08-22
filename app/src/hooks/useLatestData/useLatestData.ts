import { useEffect, useState } from 'react';

import useSWR from 'swr';
import fetcher from '@/swr-fetcher';

// types
import { ExtendedEarthquakeArray } from '@/types/extendedEarthquake';

const useLatestData = () => {
  const [data, setData] = useState([] as ExtendedEarthquakeArray);

  const { data: response, isValidating } = useSWR(
    import.meta.env.VITE_NEXT_API_ROUTE + `/latest`,
    (...props) =>
      fetcher<{ data: ExtendedEarthquakeArray; err: string | null }>(...props)
  );

  useEffect(() => {
    if (!isValidating && typeof response?.data !== 'undefined') {
      setData(response.data);
    }
  }, [isValidating, response]);

  return {
    isValidating,
    data
  };
};

export default useLatestData;
