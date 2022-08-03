// mantine components
import { Title, Box, createStyles } from '@mantine/core'

// react-i18next
import { useTranslation } from 'react-i18next';

// components
import EarthquakeDisplay from '../earthquakeDisplay';
import LoadingIndicator from '../loadingIndicator';

// hooks
import useLatestData from '@/hooks/useLatestData';

const useStyles = createStyles((theme) => ({
  main: {
    padding: '10vh 0'
  },
}));

const HomeComponent = () => {
  const { data, isValidating } = useLatestData();
  const { classes } = useStyles();
  const { t } = useTranslation('common')

  return (
    <>
      <LoadingIndicator isLoading={ isValidating } />
      <Box className={ classes.main }>
        <Title order={ 1 }>
          { t('home') }
        </Title>
        <EarthquakeDisplay
          title={ t('latest') }
          latestEarthquakesArr={ data }
          isLoading={ isValidating }
        />
      </Box>
    </>
  )
}

export default HomeComponent