import React from 'react';

// types
import type { IconType } from 'react-icons'

// icons
import { IoHome, IoPin, IoInformation, IoSearch, IoShapes, IoLocation } from 'react-icons/io5';

// mantine components
import { Box, Text } from '@mantine/core'
import { createStyles } from '@mantine/styles'

// next
import Link from 'next/link';
import { useRouter } from 'next/router';

// components
import LangSelector from '@/components/langSelector';
import ThemeSelector from '@/components/themeSelector';
import useTranslation from 'next-translate/useTranslation';

// styles
const useStyles = createStyles((t) => ({
  box: {
    padding: `${t.spacing.md} 0`,
    '&:not(:last-of-type)': {
      marginBottom: t.spacing.xl
    }
  },
  title: {
    fontSize: t.fontSizes.xl,
    color: t.white
  },
  button: {
    minWidth: '100%',
    padding: `${t.spacing.md}px ${t.spacing.xs}px`,
    borderRadius: t.radius.md,
    background: 'transparent',
    border: 'none',
    display: 'flex',
    justifyContent: 'flex-start',
    alignContent: 'center',
    alignItems: 'center',
    transition: 'background .15s ease-in-out',
    textDecoration: 'none !important',
    '&:not(:last-child)': {
      marginBottom: t.spacing.xs
    },
    '& *': {
      fontSize: t.fontSizes.sm,
      color: t.white
    },
    '&:hover': {
      cursor: 'pointer',
      background: t.colorScheme === 'dark' ? t.colors.dark[6] : t.colors.dark[6],
    },
    '&:active': {
      background: t.colorScheme === 'dark' ? t.colors.dark[7] : t.colors.dark[5],
    }
  },
  activeButton: {
    background: t.colorScheme === 'dark' ? t.colors.dark[7] : t.colors.dark[5],
  },
  iconWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: t.dir === 'rtl' ? t.spacing.md : 0,
    marginRight: t.dir === 'ltr' ? t.spacing.md : 0
  }
}));

interface NavItemBase {
  icon: IconType;
  label: string;
}

export interface NavFunctionItem extends NavItemBase {
  type: 'functionItem';
  fn: () => void;
}

export interface NavLinkItem extends NavItemBase {
  type: 'linkItem';
  path: string;
}

type NavItem = NavFunctionItem | NavLinkItem

const navItems: NavItem[] = [
  {
    icon: IoSearch,
    fn: () => {},
    label: 'search',
    type: 'functionItem'
  },
  {
    icon: IoHome,
    path: '/',
    label: 'latest',
    type: 'linkItem'
  },
  {
    icon: IoLocation,
    path: '/nearme',
    label: 'near-me',
    type: 'linkItem'
  },
  {
    icon: IoPin,
    path: '/states',
    label: 'states',
    type: 'linkItem'
  },
  {
    icon: IoShapes,
    path: '/developers',
    label: 'api',
    type: 'linkItem'
  },
  {
    icon: IoInformation,
    path: '/about',
    label: 'about',
    type: 'linkItem'
  }
];

const InnerNav = () => {
  const { classes, cx } = useStyles();
  const { pathname } = useRouter();
  const { t } = useTranslation('common');

  return (
    <>
      <Box className={ classes.box }>
        <Text className={ classes.title }>
          { t('earthquake-monitoring') }
        </Text>
      </Box>
      <Box className={ classes.box } sx={{ flexGrow: 1 }}>
        {
          navItems.map(({ label, type, ...props }) => {
            if ( type === 'functionItem' ) {
              const { fn } = props as NavFunctionItem;

              return (
                <button onClick={ fn } className={ classes.button } key={ label }>
                  <div className={ classes.iconWrapper }>
                    <props.icon />
                  </div>
                  <p>
                    { t(label) }
                  </p>
                </button>
              )
            }
            if ( type === 'linkItem' ) {
              const { path } = props as NavLinkItem;
              return (
                <Link passHref key={ label } href={ path }>
                  <a className={cx( classes.button, pathname === path && classes.activeButton )}>
                    <div className={ classes.iconWrapper }>
                      <props.icon />
                    </div>
                    <p>
                      { t(label) }
                    </p>
                  </a>
                </Link>
              )
            }
          })
        }
      </Box>
      <Box className={ classes.box }>
        <LangSelector />
        <ThemeSelector />
      </Box>
    </>
  )
}

export default InnerNav