import React, { useMemo } from 'react';

// mantine components
import { Title, Box, Text, Anchor } from '@mantine/core'
import { useMantineTheme } from '@mantine/styles'

// next-translate
import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';

// components
import ListDisplay from '../listDisplay';
import Map from '../map';

// types
import type { Earthquake } from '@prisma/client';
import type { CircleProps } from 'react-leaflet'

// next
import Link from 'next/link';

// utils
import { getDate, getHour } from './earthquakeDisplay-utils'


// types
import { MapOptions } from 'leaflet';


interface EarthquakeDisplayProps {
  latestEarthquakesArr: Earthquake[],
  title?: string;
  mapCenter?: MapOptions['center'];
  mapZoom?: number; 
}

const EarthquakeDisplay = ({ latestEarthquakesArr, title, mapZoom, mapCenter }: EarthquakeDisplayProps) => {
  const { colors } = useMantineTheme();
  const { t: statesT, lang } = useTranslation('states');

  const calcEarthQuakePoints = useMemo(() => {
    console.log('Calculating Earthquake points ')

    return latestEarthquakesArr.map(({ id, lat, long, mag }) => ({
      key: id,
      center: [ +lat.slice(0, -1), +long.slice(0, -1) ],
      radius: 40_000 * mag,
      fillColor: colors.red[6],
      fill: true,
      stroke: false,
    } as CircleProps))  
  }, [ latestEarthquakesArr ])

  return (
    <Box my='xl'>
      {
        title && 
        <Title mt='xl' mb='sm' order={ 3 }>
          { title }
        </Title>
      }
      <Box style={{ height: '70vh' }}>
        <Map
          style={{ height: '100%' }}
          zoom={ mapZoom }
          mapCenter={ mapCenter }
          elements={ calcEarthQuakePoints }
        />
      </Box>
      <Box my='xl'>
        <ListDisplay
          namespace='earthquake'
          searchable={{
            fields: [
              0, 1, 3
            ]
          }}
          content={{
            header: [ 'state', 'mag', 'dep', 'nc', 'date', 'hour' ],
            rows: latestEarthquakesArr.map(({ id, date, dep, mag, reg, state, ...earthquake }) => ({
              id: id,
              items: [
                {
                  key: 'state',
                  value: statesT(state + ''),
                  el: <Link href={`/states/${state}`} passHref><Text component='a' size='sm'>{ statesT(state + '') }</Text></Link>,
                },
                {
                  key: 'mag',
                  value: mag +'',
                  el: (
                    <Text 
                      sx={(t) => ( mag > 4 ? { color: t.colorScheme === 'dark' ? t.colors.red[9] : '#ff0000', fontWeight: 'bold' }: {})} 
                      size='sm'
                    >
                      { mag }
                    </Text>
                  ),
                },
                {
                  key: 'dep',
                  value: dep + '',
                  el: <Text size='sm'>{ dep + 'Km' }</Text>,
                },
                {
                  key: 'city',
                  value: ((earthquake as unknown) as { city: { name: string, nameFa: string }}).city[ lang === 'fa' ? 'nameFa' : 'name' ],
                  el:( 
                    <Text size='sm'>
                      { ((earthquake as unknown) as { city: { name: string, nameFa: string }}).city[ lang === 'fa' ? 'nameFa' : 'name' ] }
                    </Text>
                  )
                },
                {
                  key: 'date',
                  el: <Text size='sm'>{ getDate((date as unknown) as number, lang) }</Text>,
                },
                {
                  key: 'hour',
                  el: <Text size='sm'>{ getHour((date as unknown) as number, lang) }</Text>,
                }
              ]
            }))
          }}
        />
      </Box>
      <Box 
        sx={(t) => ({
          padding: `${t.spacing.md * 1.5}px ${t.spacing.xl * 1.5}px`,
          borderRadius: t.radius.md,
          background: t.colorScheme === 'dark' ? t.colors.dark[6] : t.colors.gray[2],
          boxShadow: t.shadows.md
        })}
      >
        <Text>
          <Trans 
            i18nKey='common:earthquake-data-license'
            components={[
              <Anchor key={0} href='http://irsc.ut.ac.ir/' target='_blank' rel='noreferrer' />
            ]}
          />
        </Text>
      </Box>
    </Box>
  )
};

export default EarthquakeDisplay;