// mantine
import { Alert, Group, Title, Text, Button } from '@mantine/core';

// react-i18next
import { useTranslation } from 'react-i18next';

// icons
import { IoAlert } from 'react-icons/io5';

interface NearMePermissionAlertProps {
  acceptPermission: () => void;
}
const NearMePermissionAlert = ({ acceptPermission }: NearMePermissionAlertProps) => {
  const { t } = useTranslation('near-me');

  return (
    <Alert
      color='yellow'
    >
      <Group mb='sm' spacing={2}>
        <IoAlert />
        <Title order={ 3 } sx={(t) => ({ fontSize: t.fontSizes.sm, fontWeight: 'normal' })}>
          { t('geolocation-permission') }
        </Title>
      </Group>
      <Text mb='xl'>
        { t('geolocation-permission-text') }
      </Text>
      <Group position='right'>
        <Button onClick={ acceptPermission } variant='light' color='dark' size='xs'>
          { t('geolocation-permission-accept') }
        </Button>
      </Group>
    </Alert> 
  )
}

export default NearMePermissionAlert;