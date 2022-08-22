// mantine components
import { Title, Box, createStyles } from '@mantine/core';

// react-i18next
import { useTranslation } from 'react-i18next';

// components
import EarthquakeDisplay from '../earthquakeDisplay';
import LoadingIndicator from '../loadingIndicator';

// hooks
import useLatestData from '@/hooks/useLatestData';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles(() => ({
  main: {
    padding: '10vh 0'
  }
}));

const HomeComponent = () => {
  const navigate = useNavigate();
  const { data, isValidating } = useLatestData();
  const { classes } = useStyles();
  const { t } = useTranslation('common');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isPwa = window.matchMedia('(display-mode: standalone)').matches;
    isPwa && navigate('/pwa-home');
  }, []);

  return (
    <>
      <LoadingIndicator isLoading={isValidating} />
      <Box className={classes.main}>
        <Title order={1}>{t('home')}</Title>
        <EarthquakeDisplay
          title={t('latest')}
          latestEarthquakesArr={data}
          isLoading={isValidating}
        />
      </Box>
    </>
  );
};

export default HomeComponent;
