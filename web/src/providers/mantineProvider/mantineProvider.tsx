import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

// mantine components
import {
  MantineProvider as MantineOriginalProvider,
  ColorSchemeProvider,
  ColorScheme,
  Global
} from '@mantine/styles';

// mantine hooks
import { useLocalStorage } from '@mantine/hooks';
import useTranslation from 'next-translate/useTranslation';

// components
const RouterTransition = dynamic(() => import('./routerTransition'), {
  suspense: true,
  ssr: false
});
// import MantineSpotlight from '../mantineSpotlight';
const MantineSpotlight = dynamic(() => import('../mantineSpotlight'), {
  suspense: true,
  ssr: false
});

interface Props {
  children: JSX.Element | JSX.Element[];
}
const MantineProvider = ({ children }: Props) => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'dark',
    getInitialValueInEffect: true
  });
  const { lang } = useTranslation();

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}>
      <MantineOriginalProvider
        theme={{ colorScheme, dir: lang === 'fa' ? 'rtl' : 'ltr' }}
        withGlobalStyles
        withNormalizeCSS>
        <Global
          styles={(t) => ({
            '*, *::after, *::before': {
              padding: 0,
              margin: 0,
              boxSizing: 'border-box'
            },
            body: {
              minHeight: '90vh',
              scrollBehavior: 'smooth',
              scrollbarWidth: 'thin'
            },
            ['html::-webkit-scrollbar']: {
              width: '.5rem',
              height: 'auto',
              overflow: 'hidden'
            },
            ['html::-webkit-scrollbar-track']: {
              backgroundColor: 'transparent'
            },
            ['html::-webkit-scrollbar-thumb']: {
              backgroundColor:
                t.colorScheme === 'dark' ? t.colors.dark[4] : t.colors.gray[4],
              borderRadius: t.radius.xs
            },
            ['html::-webkit-scrollbar-thumb:hover']: {
              backgroundColor:
                t.colorScheme === 'dark' ? t.colors.dark[3] : t.colors.gray[5]
            }
          })}
        />
        <Suspense>
          <RouterTransition />
          <MantineSpotlight>{children}</MantineSpotlight>
        </Suspense>
      </MantineOriginalProvider>
    </ColorSchemeProvider>
  );
};

export default MantineProvider;
