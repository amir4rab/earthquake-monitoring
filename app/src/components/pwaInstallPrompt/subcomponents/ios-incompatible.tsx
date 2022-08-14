// mantine
import { Accordion, Anchor, Box, Text, useMantineTheme } from '@mantine/core';

// qr-code
import { QRCodeSVG } from 'qrcode.react';

// react-i18next
import { Trans, useTranslation } from 'react-i18next';

// icons
import { IoCloudDownload, IoPhonePortrait } from 'react-icons/io5';

const QrCode = ({ url }:{ url: string }) => {
  const t = useMantineTheme();

  return (
    <Box
      sx={{ 
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center'
      }}
    >
      <Box
        sx={{
          padding: t.spacing.xl,
          borderRadius: t.radius.md,
          background: t.white
        }}
      >
        <QRCodeSVG
          value={ url }
          bgColor={ t.white }
          fgColor={ t.colors.dark[7] }
          level='H'
          // @ts-ignore
          size='min(15vw, 500px)'
        />
      </Box>
    </Box>
  );
}

const PwaInstallPromptIncompatibleIos = () => {
  const pwaUrl = import.meta.env.VITE_PWA_URL;
  const downloadUrl = import.meta.env.VITE_DOWNLOAD_URL;
  const { t } = useTranslation('pwa');

  return (
    <Accordion my='xl' variant='separated' defaultValue='0' radius='lg'>
      <Accordion.Item value='0'>
        <Accordion.Control icon={ <IoPhonePortrait /> }>
          { t('openOnPhoneTitle') }
        </Accordion.Control>
        <Accordion.Panel>
          <Text mb='xl'>
            <Trans 
              i18nKey='pwa:openOnPhoneSubtitle'
              values={{
                pwaUrl
              }}
              components={[
                <Anchor href={ pwaUrl } key='pwaUrl'/>
              ]}
            />
          </Text>
          <QrCode url={ pwaUrl } />
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value='1'>
        <Accordion.Control icon={ <IoCloudDownload /> }>
          { t('downloadPhoneTitle') }
        </Accordion.Control>
        <Accordion.Panel>
          <Text mb='xl'>
            <Trans 
              i18nKey='pwa:downloadPhoneSubtitle'
              values={{
                downloadUrl
              }}
              components={[
                <Anchor href={ downloadUrl } key='downloadUrl'/>
              ]}
            />
          </Text>
          <QrCode url={ downloadUrl } />
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};

export default PwaInstallPromptIncompatibleIos;