import { AppProps } from 'next/app';
import Head from 'next/head';

// mantine provider
import MantineProvider from '@/providers/mantineProvider';

// next-seo
import { DefaultSeo } from 'next-seo';

// layout
import Layout from '@/layout';
import useTranslation from 'next-translate/useTranslation';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const { t } = useTranslation('common')

  return (
    <>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <DefaultSeo 
        defaultTitle={ t('earthquake-monitoring') }
      />
      <MantineProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MantineProvider>
    </>
  );
}