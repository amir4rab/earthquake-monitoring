import React, { useMemo } from 'react';

// mantine components
import { Title, Box, Text, Anchor } from '@mantine/core';
import { useMantineTheme } from '@mantine/styles';

// next-translate
import Trans from 'next-translate/Trans';

// components
import ListDisplay from '../listDisplay';
import Map from '../map/suspended';

// types
import type { MapOptions } from 'leaflet';
import type { ExtendedCircleProps } from '@/types/extendedCircleProps';
import type { ExtendedEarthquake } from '@/types/extendedEarthquake';

interface EarthquakeDisplayProps {
  latestEarthquakesArr: ExtendedEarthquake[];
  title?: string;
  mapCenter?: MapOptions['center'];
  mapZoom?: number;
  isLoading?: boolean;
}

const EarthquakeDisplay = ({
  latestEarthquakesArr,
  title,
  mapZoom,
  mapCenter,
  isLoading = false
}: EarthquakeDisplayProps) => {
  const { colors } = useMantineTheme();

  const calcEarthQuakePoints = useMemo(() => {
    return latestEarthquakesArr.map(
      ({ id, lat, long, mag }) =>
        ({
          key: id,
          center: [+lat.slice(0, -1), +long.slice(0, -1)],
          radius: 40_000 * mag,
          fillColor: colors.red[6],
          fill: true,
          stroke: false
        } as ExtendedCircleProps)
    );
  }, [latestEarthquakesArr, colors.red]);

  return (
    <Box my='xl'>
      {title && (
        <Title mt='xl' mb='sm' order={3}>
          {title}
        </Title>
      )}
      <Box style={{ height: '70vh' }}>
        <Map
          style={{ height: '100%' }}
          zoom={mapZoom}
          mapCenter={mapCenter}
          elements={calcEarthQuakePoints}
        />
      </Box>
      {!isLoading && (
        <>
          <Box my='xl'>
            <ListDisplay
              namespace='earthquake'
              searchable={{
                fields: ['state', 'mag', 'city']
              }}
              content={{
                header: ['state', 'mag', 'dep', 'nc', 'date', 'hour'],
                rows: latestEarthquakesArr.map(({ city, date, ...props }) => ({
                  city: {
                    en: city['name'],
                    fa: city['nameFa']
                  },
                  hour: date as unknown as number,
                  date: date as unknown as number,
                  ...props
                }))
              }}
            />
          </Box>
          <Box
            sx={(t) => ({
              padding: `${t.spacing.md * 1.5}px ${t.spacing.xl * 1.5}px`,
              borderRadius: t.radius.md,
              background:
                t.colorScheme === 'dark' ? t.colors.dark[6] : t.colors.gray[2],
              boxShadow: t.shadows.md
            })}>
            <Text>
              <Trans
                i18nKey='common:earthquake-data-license'
                components={[
                  <Anchor
                    key={0}
                    href={process.env.NEXT_PUBLIC_TEHRAN_UNIVERSITY_URL}
                    target='_blank'
                    rel='noreferrer'
                  />
                ]}
              />
            </Text>
          </Box>
        </>
      )}
    </Box>
  );
};

export default EarthquakeDisplay;
