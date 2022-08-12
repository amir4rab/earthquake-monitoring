// mantine
import { Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';

const PwaInstallPromptIos = () => {
  const { t } = useTranslation('pwa')
  
  return (
    <article>
      <Text>
        { t('pwaInstallGuideIos') }
      </Text>
    </article>
  )
};

export default PwaInstallPromptIos;