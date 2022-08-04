// react
import { useCallback, useEffect, useState } from 'react';

// mantine
import { useLocalStorage } from '@mantine/hooks';

const useGeoLocation = () => {
  const [ geolocationPermission, setGeolocationPermission ] = useLocalStorage({ 
    key: 'geolocation-permission', 
    defaultValue: false 
  });
  const [ geolocationData, setGeolocationData ] = useState< null | { lat: number, long: number } >(null);
  const [ failed, setFailed ] = useState< boolean >(false);
  const [ isLoading, setIsLoading ] = useState(false);

  const getGeoLocation = useCallback(() => {
    setIsLoading(true);

    navigator.geolocation.getCurrentPosition(
      (v) => {
        setGeolocationData({ lat: v.coords.latitude, long: v.coords.longitude });
        setIsLoading(false);
      },
      (err) => { console.error(err); setFailed(true) },
      {
        enableHighAccuracy: true
      }
    )
  }, []);

  useEffect(() => {
    if ( typeof window !== 'undefined' && geolocationPermission ) getGeoLocation();
  }, [ geolocationPermission, getGeoLocation ]);

  return ({
    geolocationPermission,
    setGeolocationPermission,
    geolocationData,
    isLoading,
    failed
  })
};

export default useGeoLocation;