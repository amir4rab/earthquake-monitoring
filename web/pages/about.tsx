import type { NextPage } from 'next';
import Head from 'next/head';

// next-translate
import useTranslation from 'next-translate/useTranslation';

import About from '@/components/about';

const AboutPage: NextPage = () => {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>{t('about')}</title>
      </Head>
      <About />
    </>
  );
};

export default AboutPage;
