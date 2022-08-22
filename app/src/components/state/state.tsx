// mantine
import {
  ActionIcon,
  Alert,
  Center,
  Group,
  Pagination,
  Title,
  createStyles,
  useMantineTheme
} from '@mantine/core';

// shared-data
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import states from '@/shared-data/states-geo-location';

// components
import EarthquakeDisplay from '../earthquakeDisplay';

// icons
import { IoAlert, IoArrowBack, IoArrowForward } from 'react-icons/io5';

// react-i18next
import { useTranslation, Trans } from 'react-i18next';

// react-router
import { useNavigate, useParams } from 'react-router-dom';

// hooks
import useFetchStateData from './useFetchStateData';

// components
import LoadingIndicator from '../loadingIndicator';

// styles
const useStyles = createStyles((t) => ({
  main: {
    padding: '10vh 0',
    position: 'relative'
  },
  header: {
    marginBottom: t.spacing.xl
  }
}));

const State = () => {
  const params = useParams();
  const { data, isLoading, page, setPage, totalPages, initialLoading } =
    useFetchStateData({
      currentPage: 1,
      stateId: params.id as string
    });

  const { dir } = useMantineTheme();
  const { classes } = useStyles();

  const { t: statesT } = useTranslation('states');
  const { t } = useTranslation('state');

  const navigate = useNavigate();

  return (
    <main className={classes.main}>
      <LoadingIndicator isLoading={isLoading} />
      <header className={classes.header}>
        <Group mb='md' spacing={4}>
          <ActionIcon
            onClick={() => navigate('/states', { replace: true })}
            size='xl'>
            {dir === 'ltr' ? <IoArrowBack /> : <IoArrowForward />}
          </ActionIcon>
          {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
          <Title order={1}>{statesT(params.id!)}</Title>
        </Group>
        <Title order={3}>
          <Trans
            i18nKey='state:subtitle'
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            values={{ state: statesT(params.id!) }}
          />
        </Title>
      </header>
      <EarthquakeDisplay
        latestEarthquakesArr={data}
        mapZoom={7}
        isLoading={initialLoading}
        mapCenter={[
          states[params.id as string].lat,
          states[params.id as string].long
        ]}
      />
      {data.length === 0 && !initialLoading ? (
        <Alert
          icon={<IoAlert />}
          color='yellow'
          title={t('no-data-error-title')}>
          <Trans
            i18nKey='state:no-data-error-text'
            values={{ state: statesT(params.id as string) }}
          />
        </Alert>
      ) : (
        <Center>
          <Pagination total={totalPages} page={page} onChange={setPage} />
        </Center>
      )}
    </main>
  );
};

export default State;
