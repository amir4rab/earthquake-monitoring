// mantine
import {
  Box,
  createStyles,
  Group,
  keyframes,
  Loader,
  Text
} from '@mantine/core';
import { useTranslation } from 'react-i18next';

// keyframes
const notificationAnimateIn = keyframes({
  '0%': {
    transform: 'translate(-50%, -100%)'
  },
  '100%': {
    transform: 'translate(-50%, 2rem)'
  }
});

const notificationAnimateOut = keyframes({
  '0%': {
    transform: 'translate(-50%, 2rem)'
  },
  '75%': {
    transform: 'translate(-50%, 2rem)'
  },
  '100%': {
    transform: 'translate(-50%, -100%)'
  }
});

// styles
const useStyles = createStyles((t) => ({
  loadingNotification: {
    position: 'fixed',
    left: '50%',
    top: '0',
    transform: 'translate(-50%, -100%)',
    padding: `${t.spacing.md}px ${t.spacing.xl}px`,
    zIndex: 1001,
    background: t.colorScheme === 'dark' ? t.colors.dark[5] : t.colors.gray[1],
    border: `${
      t.colorScheme === 'dark' ? t.colors.dark[3] : t.colors.gray[4]
    } .1rem solid`,
    borderRadius: t.radius.lg,
    boxShadow: t.shadows.md,
    transition: 'transform .15s ease-in-out',
    ['&[data-displayed=true]']: {
      animation: `${notificationAnimateIn} .3s ease-in-out forwards`
    },
    ['&[data-hidden=true]']: {
      animation: `${notificationAnimateOut} .9s ease-in-out forwards`
    }
  }
}));

interface LoadingIndicatorProps {
  isLoading: boolean;
}
const LoadingIndicator = ({ isLoading }: LoadingIndicatorProps) => {
  const { classes } = useStyles();
  const { t } = useTranslation('common');

  return (
    <Box
      data-displayed={isLoading}
      data-hidden={!isLoading}
      className={classes.loadingNotification}>
      <Group>
        <Loader size='sm' />
        <Text>{t('fetching')}</Text>
      </Group>
    </Box>
  );
};

export default LoadingIndicator;
