import { ReactNode, useEffect } from 'react'

// mantine components
import { MantineProvider as MantineOriginalProvider, ColorSchemeProvider, ColorScheme, Global, useMantineTheme, createEmotionCache } from '@mantine/core';

// mantine hooks
import { useLocalStorage } from '@mantine/hooks';

import rtlPlugin from 'stylis-plugin-rtl';
import { useTranslation } from 'react-i18next';
import MantineSpotlight from '../mantineSpotlight';

const rtlCache = createEmotionCache({
  key: 'mantine-rtl',
  stylisPlugins: [rtlPlugin],
});

interface Props {
  children: ReactNode;
}
const MantineProvider = ({ children }: Props) => {
  const t = useMantineTheme();
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'dark',
    getInitialValueInEffect: true,
  });
  const { i18n } = useTranslation();

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

    
  useEffect(() => {
    document.getElementsByTagName('html')[0].setAttribute('dir', i18n.language === 'fa' ? 'rtl' : 'ltr')
  }, [ i18n.language ])

  return (
    <ColorSchemeProvider 
      colorScheme={ colorScheme } 
      toggleColorScheme={ toggleColorScheme }
    >
      <MantineOriginalProvider 
        withGlobalStyles 
        withNormalizeCSS
        theme={{ primaryColor: 'blue', colorScheme: colorScheme, dir: i18n.language === 'fa' ? 'rtl' : 'ltr' }} 
        emotionCache={ i18n.language === 'fa' ? rtlCache : undefined }
      >
        <Global 
          styles={{
            ['*, *::before, *::after']: {
              boxSizing: 'border-box',
              padding: 0,
              margin: 0,
              scrollBehavior: 'smooth',
              scrollbarWidth: 'thin',
            },
            [ 'html::-webkit-scrollbar' ]: {
              width: '.5rem',
              height: 'auto',
              overflow: 'hidden'
            },
            ['html::-webkit-scrollbar-track']: {
              backgroundColor: 'transparent'
            },
            ['html::-webkit-scrollbar-thumb']: {
              backgroundColor: t.colorScheme === 'dark' ?  t.colors.dark[4] : t.colors.gray[4],
              borderRadius: t.radius.xs,
            },
            ['html::-webkit-scrollbar-thumb:hover']: {
              backgroundColor: t.colorScheme === 'dark' ?  t.colors.dark[3] : t.colors.gray[5],
            }
          }}
        />
        <MantineSpotlight>
          { children }
        </MantineSpotlight>
      </MantineOriginalProvider>
    </ColorSchemeProvider>
  )
}

export default MantineProvider;