import React, { ReactNode, useMemo } from 'react';

// mantine
import { SpotlightProvider } from '@mantine/spotlight';

// types
import type { SpotlightAction } from '@mantine/spotlight';
import { IoLocation, IoSearch } from 'react-icons/io5';
import useTranslation from 'next-translate/useTranslation';

// navigation pages
import { navItems, NavLinkItem } from '../../layout/navbar/navItems';

// next
import { useRouter } from 'next/router';

// shared-data
import states from '@/shared-data/states-geo-location';

const MantineSpotlight = ({ children }:{ children: ReactNode }) => {
  const { t, lang } = useTranslation('common');
  const { t: statesT } = useTranslation('states');
  const { push } = useRouter();

  const actions: SpotlightAction[] = useMemo(()=> {
    const navArr: SpotlightAction[] = [];

    navItems.forEach(({ type, ...props }) => {
      if ( type === 'linkItem' ) {
        const { label, path } = props as NavLinkItem;

        navArr.push({
          title: t(label),
          onTrigger: () => push(path, '', { locale: lang }),
          icon: <props.icon />,
        });
      }
    });

    for ( let i = 0; i < Object.keys(states).length; i++ ) {
      const state =  i + '';

      navArr.push({
        title: statesT(state),
        group: t('states'),
        onTrigger: () => push(`/states/${state}`, '', { locale: lang }),
        icon: <IoLocation />,
      });
    }

    return navArr
  }, [ lang, push, t, statesT ]);

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
      styles={(t) => ({
        'searchInput': {
          textAlign: t.dir === 'ltr' ? 'left' : 'right'
        },
        'action': {
          textAlign: t.dir === 'ltr' ? 'left' : 'right'
        }
      })}
      nothingFoundMessage={ t('no-search-result-no-query') }
    >
      { children }
    </SpotlightProvider>
  )
};

export default MantineSpotlight;