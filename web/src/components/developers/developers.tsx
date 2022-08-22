// mantine
import { Alert, Anchor, Box, createStyles, Text, Title } from '@mantine/core';

// next-translates
import useTranslation from 'next-translate/useTranslation';

// icons
import { IoAlert } from 'react-icons/io5';
import { SiTypescript, SiJavascript, SiJson } from 'react-icons/si';

// codes
import codes from './codes';
import DevelopersCodeBox from './developers-codeBox';

// styles
const useStyles = createStyles((t) => ({
  main: {
    padding: '10vh 0',
    '& *': {
      direction: 'ltr'
    }
  },
  header: {
    paddingBottom: t.spacing.xl * 1.5,
    marginBottom: t.spacing.xl * 1.5,
    borderBottom: `${
      t.colorScheme === 'dark' ? t.colors.dark[4] : t.colors.gray[4]
    } .1rem solid`,
    '& h3': {
      opacity: 0.8,
      marginTop: t.spacing.xs,
      fontSize: t.fontSizes.md,
      fontWeight: 'normal'
    }
  },
  box: {
    padding: `${t.spacing.xl * 1.5}px 0`,
    ['&:not(:last-of-type)']: {
      borderBottom: `${
        t.colorScheme === 'dark' ? t.colors.dark[5] : t.colors.gray[3]
      } .1rem solid`
    }
  },
  boxTitle: {
    fontSize: t.fontSizes.xl,
    marginBottom: t.spacing.xs
  },
  boxText: {
    opacity: 0.7,
    fontSize: t.fontSizes.sm
  }
}));

const Developers = () => {
  const { classes } = useStyles();
  const { lang } = useTranslation();

  return (
    <main dir='ltr' className={classes.main}>
      {lang !== 'en' && (
        <Alert color='yellow' my='xl'>
          <Text>
            {`Sorry, Developer's documentations are only available in English`}
          </Text>
        </Alert>
      )}
      <header className={classes.header}>
        <Title order={1}>Developers</Title>
        <Title order={3}>Guides for Developers</Title>
      </header>
      <Alert my='xl' color='yellow' icon={<IoAlert />} title='Licensing'>
        <Text>
          <Text component='span'>
            {`Keep in mind api data is only available for "non-commercial" usages, you also have to give credit to `}
          </Text>
          <Anchor
            href={process.env.NEXT_PUBLIC_TEHRAN_UNIVERSITY_URL}
            target='_blank'
            rel='noreferrer'>
            {`University of Tehran, Institute of Geophysics`}
          </Anchor>
          <Text component='span'>
            {`. please consider visiting their website for more information about licensing.`}
          </Text>
        </Text>
      </Alert>
      <Box className={classes.box}>
        <Title order={3} className={classes.boxTitle}>
          Getting latest events
        </Title>
        <Text className={classes.boxText}>
          {`For getting the latest earthquake data you can use the following url, with http get method, keep in mind the data will be updated in a 10 minutes intervals`}
        </Text>
        <DevelopersCodeBox
          data={[
            {
              data: codes['latest-ts'],
              icon: <SiTypescript />,
              id: 'ts',
              language: 'typescript',
              title: 'Typescript'
            },
            {
              data: codes['latest-js'],
              icon: <SiJavascript />,
              id: 'js',
              language: 'javascript',
              title: 'Javascript'
            }
          ]}
        />
      </Box>
      <Box className={classes.box}>
        <Title order={3} className={classes.boxTitle}>
          Getting latest events by state
        </Title>
        <Text className={classes.boxText}>
          {`For getting the latest earthquake data by state you can use the following url, with http get method, keep in mind the data will be updated in a 10 minutes intervals`}
        </Text>
        <DevelopersCodeBox
          data={[
            {
              data: codes['state-ts'],
              icon: <SiTypescript />,
              id: 'ts',
              language: 'typescript',
              title: 'Typescript'
            },
            {
              data: codes['state-js'],
              icon: <SiJavascript />,
              id: 'js',
              language: 'javascript',
              title: 'Javascript'
            }
          ]}
        />
      </Box>
      <Box className={classes.box}>
        <Title order={3} className={classes.boxTitle}>
          States mapping
        </Title>
        <Text className={classes.boxText}>
          {`States are mapped with the following id's`}
        </Text>
        <DevelopersCodeBox
          data={[
            {
              data: codes['states-mapping'],
              icon: <SiJson />,
              id: 'json',
              language: 'json',
              title: 'Json'
            }
          ]}
        />
      </Box>
    </main>
  );
};

export default Developers;
