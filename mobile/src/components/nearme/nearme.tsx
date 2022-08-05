import React, { useEffect, useMemo, useState } from 'react';

// mantine
import { Box, Center, Loader, createStyles } from '@mantine/core';

// hooks
import useGeoLocation from '@/hooks/useGeoLocation';

// types
import EarthquakeDisplay from '../earthquakeDisplay';
import type { ExtendedEarthquakeArray, ExtendedEarthquake as ExtendedEarthquakeBase } from '@/types/extendedEarthquake';


// subcomponents
import NearMeErrorAlert from './subcomponents/nearme-errorAlert';
import NearMePermissionAlert from './subcomponents/nearme-permissionAlert';
import NearMeHead from './subcomponents/nearme-head';
import MapLocationSelector from '../mapLocationSelector';

// components
import Slider from '../slider';
import LoadingIndicator from '../loadingIndicator';

// utils
import filterArray from './utils/filterArray';
import calcEarthquakeDistances from './utils/calcEarthquakeDistances';
import useLatestData from '@/hooks/useLatestData';

// styles
const useStyles = createStyles((t) => ({
  main: {
    padding: '10vh 0'
  },
  box: {
    background: t.colorScheme === 'dark' ? t.colors.dark[6] : t.colors.gray[3],
    padding: t.spacing.md,
    borderRadius: t.radius.md,
    boxShadow: t.shadows.sm,
    transition: 'box-shadow .15s ease-in-out, background .2s ease-in-out, transform .15s ease-in-out',
    [ '&:hover' ]: {
      boxShadow: t.shadows.md,
      transform: 'scale(1.01)'
    }
  },
  header: {
    marginBottom: t.spacing.xl
  }
}));

export interface ExtendedEarthquake extends ExtendedEarthquakeBase {
  distance: number
} 

const NearMe = () => {
  const { data, isValidating: isFetchingData } = useLatestData();
  const [ distances, setDistances ] = useState< { min: number, max: number } | null >(null);
  const [ manuallySelectedLocation, setManuallySelectedLocation ] = useState< { lat: number, long: number } | null >(null);
  const [ maximumRange, setMaximumRange ] = useState(0);
  const { classes } = useStyles();
  const { geolocationData, geolocationPermission, isLoading, setGeolocationPermission, failed } = useGeoLocation();

  const earthquakeArr: ExtendedEarthquake[] = useMemo(() => {
    if ( isFetchingData ) return [];
    const res = calcEarthquakeDistances({ geoData: geolocationData, earthquakesArr: data });
    if ( res === null ) return [];

    const { distances, resultArr }  = res;
    setDistances({ ...distances });
    return resultArr;

  }, [ geolocationData, data, isFetchingData ]);

  const earthquakeManualArr: ExtendedEarthquake[] = useMemo(() => {
    if ( isFetchingData ) return [];
    const res = calcEarthquakeDistances({ geoData: manuallySelectedLocation, earthquakesArr: data });
    if ( res === null ) return [];

    const { distances, resultArr }  = res;
    setDistances({ ...distances });
    return resultArr;

  }, [ manuallySelectedLocation, data, isFetchingData ]);

  //* Displaying: Error incase of automatic geolocation failing *//
  if ( failed && manuallySelectedLocation === null ) {
    return (
      <main className={ classes.main }>
        <NearMeHead />
        {
          // hiding location error on android builds
          import.meta.env.VITE_ANDROID_BUILD !== '1' && 
          <Box py='xl' my='xl'>
            <NearMeErrorAlert />
          </Box>
        }
        <MapLocationSelector onSubmit={ (v) => { setManuallySelectedLocation({ lat: v.lat, long: v.lng }) }} />
      </main>
    ) 
  }

  //* Displaying: Results
  return (
    <>
      <LoadingIndicator isLoading={ isFetchingData } />
      <main className={ classes.main }>
        <NearMeHead />
        {
          !geolocationPermission && <NearMePermissionAlert acceptPermission={ () => setGeolocationPermission(true) } />
        }
        {
          (( isLoading || distances === null ) && !failed ) && <Center sx={{ minHeight: '50vh' }}><Loader /></Center>
        }
        {
          ( geolocationPermission && ( !isLoading || failed  ) && distances !== null ) &&
          <>
            <Slider
                marks={[
                {
                  i18nKey: 'common:nearest',
                  value: 0
                },
                {
                  i18nKey: 'common:furthest',
                  value: 100
                }
              ]}
              onChange={ (v) => setMaximumRange(v) }
              value={ maximumRange }
            />
            {
              manuallySelectedLocation !== null &&
              <EarthquakeDisplay
                mapCenter={{ lat: manuallySelectedLocation.lat, lng: manuallySelectedLocation.long }}
                latestEarthquakesArr={ filterArray(earthquakeManualArr, distances, maximumRange) }
              />
            }
            {
              geolocationData !== null &&
              <EarthquakeDisplay
                mapCenter={{ lat: geolocationData.lat, lng: geolocationData.long }}
                latestEarthquakesArr={ filterArray(earthquakeArr, distances, maximumRange) }
              />
            }
          </>
        }
      </main>
    </>
  )
};

export default NearMe;