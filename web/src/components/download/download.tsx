import React from 'react';

// mantine
import {
  Box,
  createStyles,
  Divider,
  Group,
  Text,
  ThemeIcon,
  Title,
  useMantineTheme
} from '@mantine/core';

// next-translate
import useTranslation from 'next-translate/useTranslation';

// qrcode.react
import { QRCodeSVG } from 'qrcode.react';

// icons
import { IoPhonePortrait } from 'react-icons/io5';
import { SiApple, SiPwa, SiAndroid } from 'react-icons/si';

// sub components
import DownloadItem from './downloadItem';

// types
import { GhRelease } from '@/utils/backend/getApplications';

const getAndroidVersion = (data: GhRelease) => {
  const android = data.assets.find(({ name }) => name.endsWith('.apk'));

  return typeof android !== 'undefined' ? android.browser_download_url : '';
};

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
    opacity: 0.75,
    fontSize: t.fontSizes.lg,
    marginTop: t.spacing.xs
  },
  qrCodeWrapper: {
    padding: t.spacing.lg * 2,
    borderRadius: t.radius.md,
    background: t.white,
    boxShadow: t.shadows.md,
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    ['& p']: {
      fontSize: t.fontSizes.sm,
      color: t.colors.dark[3],
      position: 'absolute',
      left: '50%',
      bottom: t.spacing.xs,
      transform: 'translate(-50%)'
    }
  },
  pageWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    [t.fn.smallerThan('md')]: {
      display: 'block'
    }
  },
  desktopAddon: {
    width: '30%',
    position: 'sticky',
    top: '10vh',
    left: 'auto',
    [t.fn.smallerThan('md')]: {
      display: 'none'
    }
  },
  mainColumn: {
    width: 'min(65%, 25vw)',
    [t.fn.smallerThan('md')]: {
      width: '100%'
    }
  }
}));

const currentWindowLocation =
  'https://earthquake-monitoring.amir4rab.com/download';

interface Props {
  data: GhRelease | null;
}
const Download = ({ data }: Props) => {
  const { classes } = useStyles();
  const { colors, white: mantineWhite } = useMantineTheme();

  const { t: commonT } = useTranslation('common');
  const { t } = useTranslation('download');

  return (
    <main className={classes.main}>
      <header className={classes.header}>
        <Title order={1}>{commonT('download')}</Title>
        <Title className={classes.subtitle} order={2}>
          {t('subtitle')}
        </Title>
      </header>
      <Box className={classes.pageWrapper}>
        <Box className={classes.mainColumn}>
          <Group mb='xl' position='apart'>
            <Title order={3}>{t('choseYourPlatFrom')}</Title>
            <Text size='xs'>{data?.tag_name}</Text>
          </Group>
          <DownloadItem
            tooltipLabel={t('open')}
            href={process.env.NEXT_PUBLIC_PWA_URL}
            icon={<SiPwa />}
            subtitle={t('pwaSubtitle')}
            title={t('pwaTitle')}
          />
          {data !== null && (
            <DownloadItem
              tooltipLabel={t('download')}
              href={getAndroidVersion(data)}
              icon={<SiAndroid />}
              subtitle={t('androidSubtitle')}
              title={t('androidTitle')}
            />
          )}
          <Divider
            my='xl'
            label={t('comingSoon')}
            labelPosition='center'
            variant='solid'
          />
          <DownloadItem
            disabled={true}
            tooltipLabel={t('comingSoon')}
            icon={<SiApple />}
            subtitle={t('iosSubtitle')}
            title={t('iosTitle')}
          />
        </Box>
        <Box className={classes.desktopAddon}>
          <Group spacing='xs' mb='xl'>
            <ThemeIcon variant='light' color='dark'>
              <IoPhonePortrait />
            </ThemeIcon>
            <Text>{t('openOnMobile')}</Text>
          </Group>
          <Box className={classes.qrCodeWrapper}>
            <QRCodeSVG
              value={currentWindowLocation}
              bgColor={mantineWhite}
              fgColor={colors.dark[7]}
              // @ts-ignore
              size='100%'
            />
            <Text sx={{ userSelect: 'none' }} component='p'>
              {t('scanQrCode')}
            </Text>
          </Box>
        </Box>
      </Box>
    </main>
  );
};

export default Download;
