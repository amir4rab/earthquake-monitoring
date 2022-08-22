import React from 'react';

// mantine
import { createStyles } from '@mantine/styles';
import { Anchor, Box, Text, Title } from '@mantine/core';
import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';

// styles
const useStyles = createStyles((t) => ({
  main: {
    padding: '10vh 0'
  },
  header: {
    marginBottom: t.spacing.xl * 3
  },
  subtitle: {
    fontWeight: 'normal',
    fontSize: t.fontSizes.lg,
    opacity: 0.75
  },
  graf: {
    lineHeight: '150%',
    ['&:not(:last-of-type)']: {
      marginBottom: t.spacing.xl
    }
  }
}));

const About = () => {
  const { classes } = useStyles();

  const { t } = useTranslation('common');
  const { t: aboutT } = useTranslation('about');

  return (
    <main className={classes.main}>
      <header className={classes.header}>
        <Title order={1}>{t('about')}</Title>
        <Title className={classes.subtitle} order={2} mt='xs'>
          {aboutT('subtitle')}
        </Title>
      </header>
      <Box>
        <Text className={classes.graf}>
          {aboutT('aboutSectionIntroductions')}
        </Text>
        <Text className={classes.graf}>
          <Trans
            i18nKey='about:aboutSectionOpenSource'
            components={[
              <Anchor
                target='_blank'
                rel='noreferrer'
                href={process.env.NEXT_PUBLIC_GITHUB_URL}
                key='github-link'
              />
            ]}
          />
        </Text>
        <Text className={classes.graf}>
          <Trans
            i18nKey='about:aboutSectionBugs'
            components={[
              <Anchor
                target='_blank'
                rel='noreferrer'
                href={process.env.NEXT_PUBLIC_GITHUB_URL + '/issues'}
                key='github-issues-link'
              />
            ]}
          />
        </Text>
        <Text className={classes.graf}>
          <Trans
            i18nKey='about:aboutSectionPermission'
            components={[
              <Anchor
                target='_blank'
                rel='noreferrer'
                href={process.env.NEXT_PUBLIC_TEHRAN_UNIVERSITY_URL}
                key='tehran-university-link'
              />
            ]}
          />
        </Text>
      </Box>
    </main>
  );
};

export default About;
