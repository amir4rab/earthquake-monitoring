import type { NextPage } from 'next';
import Head from 'next/head';

// next-translate
import useTranslation from 'next-translate/useTranslation';

const AboutPage: NextPage = () => {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>{ t('about') }</title>
      </Head>
      {/* <AboutPageComponent /> */}
    </>
  )
}

export default AboutPage
