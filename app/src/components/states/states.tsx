import React, { useMemo, useState } from 'react';

// mantine
import {
  Avatar,
  Center,
  Group,
  SimpleGrid,
  Text,
  Title,
  UnstyledButton,
  createStyles
} from '@mantine/core';

// states data
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import statesObj from '@/shared-data/states-geo-location';

// next
import { Link } from 'react-router-dom';

// components
import SearchInput from '../searchInput';

// icons
import { IoSearch } from 'react-icons/io5';

// react-i18next
import { useTranslation, Trans } from 'react-i18next';

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
    transition:
      'box-shadow .15s ease-in-out, background .2s ease-in-out, transform .15s ease-in-out',
    ['&:hover']: {
      boxShadow: t.shadows.md,
      transform: 'scale(1.01)'
    }
  },
  header: {
    marginBottom: t.spacing.xl
  }
}));

const States = () => {
  const { classes } = useStyles();
  const { t } = useTranslation('common');
  const { t: statesT } = useTranslation('states');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArrayItems = useMemo(() => {
    try {
      const arr = Object.keys(statesObj).map((i) => ({
        name: statesT(i),
        key: i
      }));

      const formattedQuery = searchQuery.trim().replace(/ /, '-');

      if (formattedQuery.length === 0) return arr;

      const filteredArray = arr.filter(({ name }) =>
        name.toLocaleLowerCase().replace(/ /, '-').includes(formattedQuery)
      );

      return filteredArray;
    } catch (err) {
      console.error(err);
      return [];
    }
  }, [searchQuery, statesT]);

  return (
    <main className={classes.main}>
      <header className={classes.header}>
        <Title mb='sm' order={1}>
          {t('states')}
        </Title>
        <Title order={3}>{t('states-subtitle')}</Title>
      </header>
      <SearchInput
        placeHolder={t('search')}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        icon={<IoSearch />}
      />
      <SimpleGrid
        cols={3}
        spacing='lg'
        breakpoints={[
          { maxWidth: 'md', cols: 2, spacing: 'md' },
          { maxWidth: 'sm', cols: 1, spacing: 'sm' }
        ]}>
        {filteredArrayItems.map(({ key, name }) => (
          <UnstyledButton
            key={key}
            component={Link}
            to={`/states/${key}`}
            className={classes.box}>
            <Group>
              <Avatar>{name[0]}</Avatar>
              <Text>{name}</Text>
            </Group>
          </UnstyledButton>
        ))}
      </SimpleGrid>
      {filteredArrayItems.length === 0 && (
        <Center sx={{ minHeight: '25vh', width: '100%' }}>
          <Text>
            <Trans i18nKey='common:no-search-result' values={{ searchQuery }} />
          </Text>
        </Center>
      )}
    </main>
  );
};

export default States;
