import React from 'react';

// next-translate
import useTranslation from 'next-translate/useTranslation';

// mantine
import { Alert, Group, Title, Text } from '@mantine/core';

// icons
import { IoAlert } from 'react-icons/io5';

const NearMeFailedAlert = () => {
  const { t } = useTranslation('near-me');

  return (
    <Alert
      color='red'
    >
      <Group mb='sm' spacing={2}>
        <IoAlert />
        <Title order={ 3 } sx={(t) => ({ fontSize: t.fontSizes.sm, fontWeight: 'normal' })}>
          { t('failed') }
        </Title>
      </Group>
      <Text>
        { t('failed-text') }
      </Text>
    </Alert> 
  )
};

export default NearMeFailedAlert;