import React, { ReactNode } from 'react';

// mantine
import { createStyles, Text, Title } from '@mantine/core';

// translation
import useTranslation from 'next-translate/useTranslation';

// styles
const useStyles = createStyles((t) => ({
  main: {
    padding: '10vh 0'
  },
  title: {},
  subtitle: {
    fontWeight: 'normal',
    fontSize: t.fontSizes.md,
    opacity: 0.75
  },
  header: {
    paddingBottom: t.spacing.xl,
    marginBottom: t.spacing.xl,
    borderBottom: `${
      t.colorScheme === 'dark' ? t.colors.dark[3] : t.colors.gray[5]
    } .1rem solid`
  },
  footer: {
    padding: `${t.spacing.sm}px ${t.spacing.lg}px`,
    background: t.colorScheme === 'dark' ? t.colors.dark[5] : t.colors.gray[3],
    borderRadius: t.radius.lg
  }
}));

interface ErrorComponentProps {
  titleKey: string;
  subtitleKey?: string;
  children: ReactNode;
  errorCode: string;
}
const Error = ({
  children,
  errorCode,
  titleKey,
  subtitleKey
}: ErrorComponentProps) => {
  const { classes } = useStyles();
  const { t } = useTranslation();

  return (
    <main className={classes.main}>
      <header className={classes.header}>
        <Title className={classes.title} order={1}>
          {t(titleKey)}
        </Title>
        {subtitleKey && (
          <Title className={classes.subtitle} order={2}>
            {t(subtitleKey)}
          </Title>
        )}
      </header>
      <article>{children}</article>
      <footer className={classes.footer}>
        <Text component='p'>
          <Text component='span'>{`Error code: `}</Text>
          <Text component='span' sx={{ fontFamily: 'monospace' }}>
            {errorCode}
          </Text>
        </Text>
      </footer>
    </main>
  );
};

export default Error;
