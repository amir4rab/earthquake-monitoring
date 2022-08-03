import { useMemo } from 'react';

// mantine components
import { Title, Box, Text, Anchor, useMantineTheme } from '@mantine/core'

// react-i18next
import { useTranslation, Trans } from 'react-i18next';

// components
import ListDisplay from '../listDisplay';
import Map from '../map';

// types
import type { MapOptions } from 'leaflet';
import type { ExtendedCircleProps } from '@/types/extendedCircleProps';
import type { ExtendedEarthquake } from '@/types/extendedEarthquake';

// next
import { Link } from 'react-router-dom';

// utils
import { getDate, getHour } from './earthquakeDisplay-utils'


interface EarthquakeDisplayProps {
  latestEarthquakesArr: ExtendedEarthquake[],
  title?: string;
  mapCenter?: MapOptions['center'];
  mapZoom?: number;
  isLoading?: boolean
}

const EarthquakeDisplay = ({ latestEarthquakesArr, title, mapZoom, mapCenter, isLoading= false }: EarthquakeDisplayProps) => {
  const { colors } = useMantineTheme();
  const { t: statesT, i18n } = useTranslation('states');

  const calcEarthQuakePoints = useMemo(() => {
    return latestEarthquakesArr.map(({ id, lat, long, mag }) => ({
      key: id,
      center: [ +lat.slice(0, -1), +long.slice(0, -1) ],
      radius: 40_000 * mag,
      fillColor: colors.red[6],
      fill: true,
      stroke: false,
    } as ExtendedCircleProps))  
  }, [ latestEarthquakesArr, colors.red ]);

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
      {
        !isLoading &&
        <>
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
                rows: latestEarthquakesArr.map(({ id, date, dep, mag, state, city }) => ({
                  id: id,
                  items: [
                    {
                      key: 'state',
                      value: statesT(state + ''),
                      el: <Anchor component={ Link } to={`/states/${state}`} size='sm'>{ statesT(state + '') }</Anchor>,
                    },
                    {
                      key: 'mag',
                      value: mag +'',
                      el: (
                        <Text 
                          sx={(t) => ( mag > 4 ? { color: t.colorScheme === 'dark' ? t.colors.red[9] : '#ff0000', fontWeight: 'bold' }: {})} 
                          size='sm'
                        >
                          { mag.toLocaleString(i18n.language) }
                        </Text>
                      ),
                    },
                    {
                      key: 'dep',
                      value: dep + '',
                      el: <Text size='sm'>{ dep.toLocaleString(i18n.language) + (( i18n.language !== 'fa' && i18n.language !== 'ar' ) ? ' Km' : ' کلیومتر' ) }</Text>,
                    },
                    {
                      key: 'city',
                      value: city[ i18n.language === 'fa' ? 'nameFa' : 'name' ],
                      el:( 
                        <Text size='sm'>
                          { city[ i18n.language === 'fa' ? 'nameFa' : 'name' ] }
                        </Text>
                      )
                    },
                    {
                      key: 'date',
                      el: <Text size='sm'>{ getDate((date as unknown) as number, i18n.language) }</Text>,
                    },
                    {
                      key: 'hour',
                      el: <Text size='sm'>{ getHour((date as unknown) as number, i18n.language) }</Text>,
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
        </>
      }
    </Box>
  )
};

export default EarthquakeDisplay;