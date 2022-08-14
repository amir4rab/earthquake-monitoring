import { useEffect, useState } from 'react';

// mantine
import { createStyles, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

// hooks
import useUa from '@/hooks/useUa';

// types
import type { DetectBrowserSupportResult } from './utils';

// subcomponents
import PwaInstallPromptIncompatible from './subcomponents/incompatible';
import PwaInstallPromptIos from './subcomponents/ios';
import PwaInstallPromptAndroid from './subcomponents/android';
import PwaInstallPromptChrome from './subcomponents/chrome';

// react-i18next
import { useTranslation } from 'react-i18next';

// utils
import { detectBrowserSupport } from './utils';

// components
import LoadingDisplay from '../loadingDisplay';
import LangSelector from '../langSelector';

// react router dom
import { useNavigate } from 'react-router-dom';

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
  },
  footer: {
    marginTop: t.spacing.xl * 4,
    display: 'flex', 
    justifyContent: 'flex-start'
  }
}));

const PwaInstallPrompt = () => {
  const { classes } = useStyles();
  const { os, browser } = useUa();
  
  const [ browserInfo, setBrowserInfo ] = useState< DetectBrowserSupportResult | null >(null);
  
  const isInstalled = useMediaQuery('(display-mode: standalone)');

  const navigate = useNavigate();

  const { t: pwaT, i18n } = useTranslation('pwa');

  useEffect(() => {
    if ( browserInfo === null && typeof window !== 'undefined' ) {
      setBrowserInfo(detectBrowserSupport(browser, os));
    }
  }, [ browserInfo ])

  useEffect(() => {
    if ( isInstalled ) navigate('/pwa-home')
  }, [ isInstalled ])

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
        browserInfo === null ?
        <LoadingDisplay /> :
        ( browserInfo.os === 'ios' && browserInfo.supported ) ? 
        <PwaInstallPromptIos lang={ i18n.language }/> :
        ( browserInfo.os === 'android' && browserInfo.supported ) ? 
        <PwaInstallPromptAndroid lang={ i18n.language } /> :
        browserInfo.supported ?
        <PwaInstallPromptChrome lang={ i18n.language }/>: 
        <PwaInstallPromptIncompatible browser={ typeof browser.name !== 'undefined' ? browser.name : '' } />
      }
      <footer className={ classes.footer }>
        <LangSelector />
      </footer>
    </main>
  )
};

export default PwaInstallPrompt;