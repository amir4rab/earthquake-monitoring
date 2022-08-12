import React, { ReactNode, useMemo } from 'react';

// mantine
import { SpotlightProvider } from '@mantine/spotlight';
import { useMediaQuery } from '@mantine/hooks';

// types
import type { SpotlightAction } from '@mantine/spotlight';

// icons
import { IoLocation, IoSearch } from 'react-icons/io5';

// next
import { useTranslation } from 'react-i18next';

// navigation pages
import { navItems, NavLinkItem } from '../../layout/navbar/navItems';

// next
import { useNavigate } from 'react-router-dom';

// shared-data
// @ts-ignore
import states from '@/shared-data/states-geo-location';

const MantineSpotlight = ({ children }:{ children: ReactNode }) => {
  const { t, i18n } = useTranslation('common');
  const { t: statesT } = useTranslation('states');
  const push = useNavigate();
  const isDesktop = useMediaQuery('(min-width: 922px)');

  const actions: SpotlightAction[] = useMemo(()=> {
    const navArr: SpotlightAction[] = [];
    if ( i18n.language ) {};

    navItems.forEach(({ type, ...props }) => {
      if ( type === 'linkItem' ) {
        const { label, path } = props as NavLinkItem;

        navArr.push({
          title: t(label),
          onTrigger: () => push(path),
          icon: <props.icon />,
        });
      }
    });

    for ( let i = 0; i < Object.keys(states).length; i++ ) {
      const state =  i + '';

      navArr.push({
        title: statesT(state),
        group: t('states'),
        onTrigger: () => push(`/states/${state}`),
        icon: <IoLocation />,
      });
    }

    return navArr
  }, [ i18n.language, push, t, statesT ])

  return (
    <SpotlightProvider
      actions={actions}
      searchIcon={ <IoSearch /> }
      searchPlaceholder={ t('search') }
      shortcut='mod + p'
      highlightQuery
      transition='slide-down'
      transitionDuration={300}
      limit={ 10 }
      topOffset={ isDesktop ? undefined : 0 }
      nothingFoundMessage={ t('no-search-result-no-query') }
    >
      { children }
    </SpotlightProvider>
  )
};

export default MantineSpotlight;