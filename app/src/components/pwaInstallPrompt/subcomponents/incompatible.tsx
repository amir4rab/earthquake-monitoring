// mantine
import { Anchor, Text, Title } from '@mantine/core';

// react-i18next
import { Trans, useTranslation } from 'react-i18next';

interface Props {
  browser: string
}

const PwaInstallPromptIncompatible = ({ browser }: Props ) => {
  const { t } = useTranslation('pwa');

  return (
    <article>
      <Title mb='xl' order={3}>
        { t('incompatibleBrowserTitle') }
      </Title>
      <Text>
        <Trans 
          i18nKey='pwa:incompatibleBrowserText'
          values={{ browser }}
          components={[
            <Anchor key='0' href='https://play.google.com/store/apps/details?id=com.android.chrome' rel='noreferrer' target='_blank' />,
            <Anchor key='1' href='https://www.google.com/chrome/' rel='noreferrer' target='_blank' />,
            <Anchor key='2' href='https://www.chromium.org/getting-involved/download-chromium/' rel='noreferrer' target='_blank' />,
            <Anchor key='3' href='https://brave.com/download/' rel='noreferrer' target='_blank' />,
            <Anchor key='4' href='https://www.microsoft.com/en-us/edge' rel='noreferrer' target='_blank' />,
          ]}
        />
      </Text>
    </article>
  );
};

export default PwaInstallPromptIncompatible;