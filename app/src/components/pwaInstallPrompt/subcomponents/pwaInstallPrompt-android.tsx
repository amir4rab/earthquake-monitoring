// mantine
import { Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';

const PwaInstallPromptAndroid = () => {
  const { t } = useTranslation('pwa');

  return (
    <article>
      <Text>
        { t('pwaInstallGuideAndroid') }
      </Text>
    </article>
  )
};

export default PwaInstallPromptAndroid;