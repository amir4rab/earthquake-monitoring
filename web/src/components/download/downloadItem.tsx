import React, { ReactNode } from 'react';

// mantine
import { createStyles, Text, Tooltip, UnstyledButton } from '@mantine/core';

// styles
const useStyles = createStyles((t) => ({
  card: {
    padding: `${t.spacing.md}px ${t.spacing.xl}px`,
    background:
      t.colorScheme === 'dark'
        ? t.colors[t.primaryColor][5]
        : t.colors[t.primaryColor][5],
    color: t.colorScheme === 'dark' ? t.colors.dark[5] : t.white,
    userSelect: 'none',
    transition: 'background .15s ease-in-out, transform .15s ease-in-out',
    ['&:hover']: {
      background:
        t.colorScheme === 'dark'
          ? t.colors[t.primaryColor][4]
          : t.colors[t.primaryColor][4]
    },
    ['&:active']: {
      background:
        t.colorScheme === 'dark'
          ? t.colors[t.primaryColor][3]
          : t.colors[t.primaryColor][3],
      transform: 'translate(0, .1rem)'
    },
    ['&:disabled']: {
      background:
        t.colorScheme === 'dark' ? t.colors.dark[6] : t.colors.gray[6],
      color: t.white,
      cursor: 'not-allowed',
      width: '100%',
      opacity: 0.7
    },
    ['&:not(:first-of-type)']: {
      marginTop: t.spacing.md
    },
    borderRadius: t.radius.md,
    display: 'flex',
    justifyContent: 'center',
    alignContents: 'center',
    alignItems: 'center'
  },
  cardTitle: {
    fontSize: t.fontSizes.xl * 1.25,
    fontWeight: 'bold',
    [t.fn.smallerThan('sm')]: {
      fontSize: t.fontSizes.xl
    }
  },
  cardSubtitle: {
    fontSize: t.fontSizes.xs,
    textAlign: t.dir === 'ltr' ? 'left' : 'right',
    [t.fn.smallerThan('sm')]: {
      fontSize: t.fontSizes.xs * 0.75
    }
  },
  icon: {
    marginRight: t.dir === 'ltr' ? t.spacing.md : 0,
    marginLeft: t.dir === 'rtl' ? t.spacing.md : 0,
    fontSize: t.fontSizes.xl * 2,
    [t.fn.smallerThan('sm')]: {
      fontSize: t.fontSizes.xl * 1.5
    },
    ['& svg']: {
      display: 'block'
    }
  }
}));

interface DownloadItemProps {
  icon: ReactNode;
  title: string;
  subtitle?: string;
  href?: string;
  downloadable?: boolean;
  disabled?: boolean;
  tooltipLabel: string;
}

const DownloadItem = ({
  downloadable = true,
  href,
  icon,
  subtitle,
  title,
  disabled = false,
  tooltipLabel
}: DownloadItemProps) => {
  const { classes } = useStyles();

  return (
    <Tooltip label={tooltipLabel}>
      <UnstyledButton
        component={disabled ? 'button' : 'a'}
        disabled={disabled ? disabled : undefined}
        href={disabled ? undefined : href}
        download={disabled ? undefined : downloadable}
        className={classes.card}
        target={disabled ? undefined : '_blank'}
        rel={disabled ? undefined : 'noreferrer'}>
        <div className={classes.icon}>{icon}</div>
        <div>
          {subtitle && <Text className={classes.cardSubtitle}>{subtitle}</Text>}
          <Text className={classes.cardTitle}>{title}</Text>
        </div>
      </UnstyledButton>
    </Tooltip>
  );
};

export default DownloadItem;
