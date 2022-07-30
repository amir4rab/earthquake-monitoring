import React, { useEffect, useMemo, useState } from 'react';

// mantine
import { Box, Center, Loader } from '@mantine/core';
import { createStyles } from '@mantine/styles';


import { getDistance } from 'geolib'

// hooks
import useGeoLocation from '@/hooks/useGeoLocation';

// types
import { Earthquake } from '@prisma/client';
import EarthquakeDisplay from '../earthquakeDisplay';

// subcomponents
import NearMeErrorAlert from './subcomponents/nearme-errorAlert';
import NearMePermissionAlert from './subcomponents/nearme-permissionAlert';
import NearMeHead from './subcomponents/nearme-head';
import MapLocationSelector from '../mapLocationSelector';

// components
import Slider, { SliderProps } from '../slider';

// utils
import filterArray from './utils/filterArray';
import calcEarthquakeDistances from './utils/calcEarthquakeDistances';

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

export interface ExtendedEarthquake extends Earthquake {
  distance: number
} 

interface NearMeProps {
  latestEarthquakesArr: Earthquake[];
}
const NearMe = ({ latestEarthquakesArr }: NearMeProps) => {
  const [ isBrowser, setIsBrowser ] = useState(false);
  const [ distances, setDistances ] = useState< { min: number, max: number } | null >(null);
  const [ manuallySelectedLocation, setManuallySelectedLocation ] = useState< { lat: number, long: number } | null >(null);
  const [ maximumRange, setMaximumRange ] = useState(0);
  const { classes } = useStyles();
  const { geolocationData, geolocationPermission, isLoading, setGeolocationPermission, failed } = useGeoLocation();

  useEffect(() => {
    if ( typeof window !== 'undefined' ) setIsBrowser(true);
  }, [])

  const earthquakeArr: ExtendedEarthquake[] = useMemo(() => {
    const res = calcEarthquakeDistances({ geoData: geolocationData, earthquakesArr: latestEarthquakesArr });
    if ( res === null ) return [];

    const { distances, resultArr }  = res;
    setDistances({ ...distances });
    return resultArr;

  }, [ geolocationData, latestEarthquakesArr ]);

  const earthquakeManualArr: ExtendedEarthquake[] = useMemo(() => {
    const res = calcEarthquakeDistances({ geoData: manuallySelectedLocation, earthquakesArr: latestEarthquakesArr });
    if ( res === null ) return [];

    const { distances, resultArr }  = res;
    setDistances({ ...distances });
    return resultArr;

  }, [ manuallySelectedLocation, latestEarthquakesArr ]);

  //* Displaying: Loading spinner in ssr *//
  if ( !isBrowser ) return (
    <main className={ classes.main }>
      <NearMeHead />
      <Center sx={{ minHeight: '50vh' }}><Loader /></Center>
    </main>
  )

  //* Displaying: Error incase of automatic geolocation failing *//
  if ( failed && manuallySelectedLocation === null ) {
    return (
      <main className={ classes.main }>
        <NearMeHead />
        <Box py='xl' my='xl'>
          <NearMeErrorAlert />
        </Box>
        <MapLocationSelector onSubmit={ (v) => { setManuallySelectedLocation({ lat: v.lat, long: v.lng }) }} />
      </main>
    ) 
  }

  //* Displaying: Result after a manual geolocation data input
  if ( manuallySelectedLocation !== null ) {
    return (
      <main className={ classes.main }>
        <NearMeHead />
        {
          distances === null ? 
          <Center>
            <Loader />
          </Center> :
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
            <EarthquakeDisplay
              mapCenter={{ lat: manuallySelectedLocation!.lat, lng: manuallySelectedLocation!.long }}
              latestEarthquakesArr={ filterArray(earthquakeManualArr, distances, maximumRange) }
            />
          </>
        }
      </main>
    )
  };

  //* Displaying: Result after the automatic geolocation data input
  return (
    <main className={ classes.main }>
      <NearMeHead />
      {
        !geolocationPermission && <NearMePermissionAlert acceptPermission={ () => setGeolocationPermission(true) } />
      }
      {
        ( isLoading || distances === null ) && <Center sx={{ minHeight: '50vh' }}><Loader /></Center>
      }
      {
        ( geolocationPermission && !isLoading && distances !== null ) &&
        <>
            <Slider
              onChange={ (v) => setMaximumRange(v) }
              value={ maximumRange }
            />
          <EarthquakeDisplay
            mapCenter={{ lat: geolocationData!.lat, lng: geolocationData!.long }}
            latestEarthquakesArr={ filterArray(earthquakeArr, distances, maximumRange) }
          />
        </>
      }
    </main>
  )
};

export default NearMe;