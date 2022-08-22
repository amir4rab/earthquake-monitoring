// next
import type { AppProps } from 'next/app';
import Head from 'next/head';

// mantine provider
import MantineProvider from '@/providers/mantineProvider';

// layout
import Layout from '@/layout';

// next-translate
import useTranslation from 'next-translate/useTranslation';

// providers
import SwrProvider from '@/providers/swrProvider';

// components
import SeoHeader from '@/components/seoHeader';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const { t, lang } = useTranslation('common');

  return (
    <>
      <Head>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
        <SeoHeader
          lang={lang}
          title={t('earthquake-monitoring')}
          subtitle={t('earthquake-monitoring-subtitle')}
        />
      </Head>
      <SwrProvider>
        <MantineProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MantineProvider>
      </SwrProvider>
    </>
  );
}
