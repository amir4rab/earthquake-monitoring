import React from 'react';

// types
import type { IconType } from 'react-icons'

// icons
import { IoHome, IoPin, IoInformation, IoSearch, IoLocation } from 'react-icons/io5';

// mantine
import { Box, NavLink, NavLinkProps, Text, createStyles } from '@mantine/core';
import { openSpotlight } from '@mantine/spotlight';

// next
import { Link, useLocation } from 'react-router-dom';

// components
import LangSelector from '@/components/langSelector';
import ThemeSelector from '@/components/themeSelector';

// next-translate
import { useTranslation } from 'react-i18next';

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
  }
}));


const NavLinksStyles: NavLinkProps['styles']  = (t) => ({
  root: {
    color: t.colors.gray[3],
    transition: 'background .15s ease-in-out',
    borderRadius: t.radius.md,
    '&[data-active]': {
      background: t.colors[t.primaryColor][7] + '80',
      color: t.colors.gray[3],
    },
    [ '&[data-active]:hover' ] : {
      background: t.colors[t.primaryColor][7] + 'a0 !important',
      color: t.colors.gray[3],
    },
    [ '&:hover' ]: {
      background: t.colorScheme === 'dark' ? t.colors.dark[4] : t.colors.dark[5],
    }
  }
})

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

export const navItems: NavItem[] = [
  {
    icon: IoSearch,
    fn: openSpotlight,
    label: 'search',
    type: 'functionItem'
  },
  {
    icon: IoHome,
    path: import.meta.env.VITE_PWA_BUILD === '1' ? './pwa-home' : './',
    label: 'latest',
    type: 'linkItem'
  },
  {
    icon: IoLocation,
    path: './nearme',
    label: 'near-me',
    type: 'linkItem'
  },
  {
    icon: IoPin,
    path: './states',
    label: 'states',
    type: 'linkItem'
  },
  {
    icon: IoInformation,
    path: './about',
    label: 'about',
    type: 'linkItem'
  }
];

interface InnerNavProps {
  onSearch?: Function;
}
const InnerNav = ({ onSearch }: InnerNavProps ) => {
  const { classes, cx } = useStyles();
  const  currentLocation = useLocation();

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
                <NavLink
                  styles={ NavLinksStyles }
                  component='button'
                  onClick={ () => { onSearch && onSearch(); fn(); } }
                  key={ label } 
                  icon={ <props.icon /> }
                  label={ t(label) }
                  mb='sm'
                />
              )
            }
            if ( type === 'linkItem' ) {
              const { path } = props as NavLinkItem;
              return (
                <NavLink
                  key={ label }
                  styles={ NavLinksStyles } 
                  component={ Link }
                  to={ path }
                  active={ location.pathname === path }
                  icon={ <props.icon /> }
                  label={ t(label) }
                  mb='sm'
                />
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