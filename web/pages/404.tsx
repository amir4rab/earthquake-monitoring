import type { NextPage } from 'next';
import Head from 'next/head';

// next-translate
import useTranslation from 'next-translate/useTranslation';

import NotFound from '@/components/error/404';

const AboutPage: NextPage = () => {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>{ t('notFound') }</title>
      </Head>
      <NotFound />
    </>
  )
}

export default AboutPage
