import React from 'react';

// mantine
import { createStyles } from '@mantine/styles';
import { Title } from '@mantine/core';

// next-translate
import useTranslation from 'next-translate/useTranslation';

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

const NearMeHead = () => {
  const { classes } = useStyles();
  const { t } = useTranslation('common');

  return (
    <header className={classes.header}>
      <Title mb='sm' order={1}>
        {t('near-me')}
      </Title>
    </header>
  );
};

export default NearMeHead;
