// mantine
import { Alert, createStyles, Title } from '@mantine/core';

// hooks
import useUa from '@/hooks/useUa';

// types
import type { IOS } from 'ua-parser-js';

// subcomponents
import PwaInstallPromptIncompatible from './subcomponents/pwaInstallPrompt-incompatible';

// react-i18next
import { Trans, useTranslation } from 'react-i18next';

// icons
import { IoAlert } from 'react-icons/io5';
import PwaInstallPromptIos from './subcomponents/pwaInstallPrompt-ios';
import PwaInstallPromptAndroid from './subcomponents/pwaInstallPrompt-android';

const isIncompatible = ( os: IOS ) => os.name?.toLocaleLowerCase() !== 'android' && os.name?.toLocaleLowerCase() !== 'ios';
const isIncompatibleBrowser = ( browser: string ) => {
  const incompatibleBrowsersArray = [ 'firefox' ];

  let incompatible = false;
  incompatibleBrowsersArray.every(i => {
    if ( browser.toLowerCase().includes(i) ) {
      incompatible= true;
      return false;
    };
    return true;
  });

  return incompatible
};
const validIos = ( browser: string ) => browser.toLowerCase().includes('safari');

// styles
const useStyles = createStyles((t) => ({
  main: {
    padding: '10vh 0'
  },
  header: {
    marginBottom: t.spacing.xl * 3
  },
  subtitle: {
    fontWeight: 'normal',
    opacity: .75,
    marginTop: t.spacing.sm
  }
}));

const PwaInstallPrompt = () => {
  const { os, browser } = useUa();
  const { classes } = useStyles();
  const { t: pwaT } = useTranslation('pwa');

  if ( isIncompatible(os) ) return (
    <main className={ classes.main }>
      <header className={ classes.header }>
        <Title order={1}>
          { pwaT('incompatibleTitle') }
        </Title>
        <Title className={ classes.subtitle } order={3}>
          { pwaT('incompatibleSubtitle') }
        </Title>
      </header>
      <PwaInstallPromptIncompatible />
    </main>
  )

  return (
    <main className={ classes.main }>
      <header className={ classes.header }>
        <Title order={1}>
          { pwaT('installingPwaTitle') }
        </Title>
        <Title className={ classes.subtitle } order={3}>
          { pwaT('installingPwaSubtitle') }
        </Title>
      </header>
      {
        isIncompatibleBrowser(typeof browser.name !== 'undefined' ? browser.name : '') ?
          <Alert
            title={ pwaT('incompatibleBrowserTitle') }
            color='red'
            icon={ <IoAlert /> }
          >
            <Trans 
              i18nKey='pwa:incompatibleBrowserText'
              values={{ browser: browser.name }}
            />
          </Alert> :
        os.name?.toLocaleLowerCase() === 'android' ?
          <PwaInstallPromptAndroid /> :
        os.name?.toLocaleLowerCase() === 'ios' && validIos(browser.name!) ?
          <PwaInstallPromptIos /> :
          <Alert
            title={ pwaT('incompatibleBrowserTitle') }
            color='red'
            icon={ <IoAlert /> }
          >
            <Trans 
              i18nKey='pwa:incompatibleBrowserText'
              values={{ browser: browser.name }}
            />
          </Alert>
      }
    </main>
  )
};

export default PwaInstallPrompt;