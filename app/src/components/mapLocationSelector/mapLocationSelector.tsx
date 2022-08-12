import React, { useMemo, useState } from 'react';

// mantine
import { Button, Center, Group, Text, Title } from '@mantine/core';

// map
import Map from '../map';

// shared-data
// @ts-ignore
import states from '@/shared-data/states-geo-location'

// geolib
import { getDistance } from 'geolib';

// react-i18next
import { useTranslation, Trans } from 'react-i18next';

interface MapLocationSelectorProps {
  onSubmit?: ({ lat, lng }:{ lat: number, lng: number }) => void;
}
const MapLocationSelector = ({ onSubmit }: MapLocationSelectorProps ) => {
  const [ pos, setPos ] = useState({ lat: 0, lng: 0 });
  const { t } = useTranslation('common');
  const { t: statesT } = useTranslation('states');

  /** nearest state to user */
  const nearestState = useMemo(() => {
    const userLocation =  { lat: pos.lat , lon: pos.lng };
    let nearestState= 0;
    let distanceToNearestState: null | number = null;

    for ( let i = 0; i < Object.keys(states).length; i++ ) {
      const stateLocation = { lat: states[i+''].lat, lon: states[i+''].long };
      const dis = parseInt((getDistance(userLocation, stateLocation, 100) / 1_000).toFixed(0));
      
      if ( distanceToNearestState === null || dis < distanceToNearestState ) {
        nearestState= i;
        distanceToNearestState= dis;
      }
    };

    return ({
      id: nearestState + '',
      distance: distanceToNearestState
    })
  }, [ pos ])

  return (
    <>
      <Title mb='md' order={3}>
        { t('select-your-location') }
      </Title>
      <Center sx={{ height: '50vh' }}>
        <Map sx={{ height: '100%' }} selectPos={ true } onPos={ setPos } />
      </Center>
      <Group position='apart' mt='xl'>
        <Text>
          <Trans 
            i18nKey='common:nearest-state-to-you'
            values={{ state: statesT(nearestState.id) }}
          />
        </Text>
        <Button onClick={ () => onSubmit && onSubmit(pos) }>
          { t('submit') }
        </Button>
      </Group>
    </>
  );
}

export default MapLocationSelector;