import React from 'react';

// mantine components
import { Title, Box, createStyles } from '@mantine/core';

// next-translate
import useTranslation from 'next-translate/useTranslation';

// components
import EarthquakeDisplay from '../earthquakeDisplay';

// types
import type { ExtendedEarthquakeArray } from '@/types/extendedEarthquake';

const useStyles = createStyles(() => ({
  main: {
    padding: '10vh 0'
  }
}));

export interface HomeComponentProps {
  latestEarthquakesArr: ExtendedEarthquakeArray;
}

const HomeComponent = ({ latestEarthquakesArr }: HomeComponentProps) => {
  const { classes } = useStyles();
  const { t } = useTranslation('common');

  return (
    <Box className={classes.main}>
      <Title order={1}>{t('home')}</Title>
      <EarthquakeDisplay
        title={t('latest')}
        latestEarthquakesArr={latestEarthquakesArr}
      />
    </Box>
  );
};

export default HomeComponent;
