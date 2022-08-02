import React from 'react';

// mantine
import { ActionIcon, Alert, Box, Center, Group, Loader, Pagination, Text, Title } from '@mantine/core';
import { createStyles, keyframes, useMantineTheme } from '@mantine/styles';

// types
import states from '@/shared-data/states-geo-location';

// components
import EarthquakeDisplay from '../earthquakeDisplay';

// icons
import { IoAlert, IoArrowBack, IoArrowForward } from 'react-icons/io5';

// next-translate
import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';

// next
import { useRouter } from 'next/router';

// util hooks
import useFetchStateData from './useFetchStateData';

const notificationAnimateIn = keyframes({
  '0%': {
    transform: 'translate(-50%, -100%)',
  },
  '100%': {
    transform: 'translate(-50%, 2rem)'
  }
});

const notificationAnimateOut = keyframes({
  '0%': {
    transform: 'translate(-50%, 2rem)'
  },
  '75%': {
    transform: 'translate(-50%, 2rem)'
  },
  '100%': {
    transform: 'translate(-50%, -100%)',
  },
});

// styles
const useStyles = createStyles((t) => ({
  main: {
    padding: '10vh 0',
    position: 'relative'
  },
  header: {
    marginBottom: t.spacing.xl
  },
  loadingNotification: {
    position: 'fixed', 
    left: '50%', 
    top: '0',
    transform: 'translate(-50%, -100%)',
    padding: `${t.spacing.md}px ${t.spacing.xl}px`,
    zIndex: 1001,
    background: t.colorScheme === 'dark' ? t.colors.dark[5] : t.colors.gray[1],
    border: `${t.colorScheme === 'dark' ? t.colors.dark[3] : t.colors.gray[4]} .1rem solid`,
    borderRadius: t.radius.lg,
    boxShadow: t.shadows.md,
    transition: 'transform .15s ease-in-out',
    [ '&[data-displayed=true]' ]: {
      animation: `${notificationAnimateIn} .3s ease-in-out forwards`
    },
    [ '&[data-hidden=true]' ]: {
      animation: `${notificationAnimateOut} .9s ease-in-out forwards`
    },
  }
}))

type StateGeoLocationInterface = typeof states[''];

interface StateData extends StateGeoLocationInterface  {
  id: string
}

export interface StateInterface {
  stateData: StateData,
  stateName: string;
}

const State = ({ stateName, stateData }: StateInterface) => {
  const {
    data, isLoading, page, setPage, totalPages, initialLoading
  } = useFetchStateData({
    currentPage: 1,
    stateId: stateData.id
  });

  const { dir } = useMantineTheme();
  const { classes } = useStyles();
  const { t, lang } = useTranslation('state');
  const { t: tCommon } = useTranslation('common');
  const { replace } = useRouter();

  return (
      <main className={ classes.main }>
        <Box
          data-displayed={ isLoading }
          data-hidden={ !isLoading }
          className={ classes.loadingNotification }
        >
          <Group>
            <Loader size='sm' />
            <Text>{ tCommon('loading') }</Text>
          </Group>
        </Box>
        <header className={ classes.header }>
          <Group mb='md' spacing={4}>
            <ActionIcon onClick={ () => replace('/states', '', {  locale: lang }) } size='xl'>
              { dir === 'ltr' ? <IoArrowBack /> : <IoArrowForward /> }
            </ActionIcon>
            <Title order={1}>
              { stateName }
            </Title>
          </Group> 
          <Title order={3}>
            <Trans 
              i18nKey='state:subtitle'
              values={{ state: stateName }}
            />
          </Title>
        </header>
        <EarthquakeDisplay 
          latestEarthquakesArr={ data }
          mapZoom={7}
          isLoading={ initialLoading }
          mapCenter={[ stateData.lat, stateData.long ]}
        />
        {
          ( data.length === 0 && !initialLoading ) ?
          <Alert
            icon={ <IoAlert /> }
            color='yellow'
            title={ t('no-data-error-title') }
          >
            <Trans 
              i18nKey='state:no-data-error-text'
              values={{ state: stateName }}
            />
          </Alert> :
          <Center>
            <Pagination 
              total={ totalPages }
              page={ page }
              onChange={ setPage }
            />
          </Center>
        }
      </main>
  )
};

export default State;