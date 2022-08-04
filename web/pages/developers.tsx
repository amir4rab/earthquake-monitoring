import type { NextPage } from 'next';
import Head from 'next/head';

// next-translate
import useTranslation from 'next-translate/useTranslation';

import Developers from '@/components/developers';

const DevelopersPage: NextPage = () => {
  const { t } = useTranslation('common')

  return (
    <>
      <Head>
        <title>{ t('developers') }</title>
      </Head>
      <Developers />
    </>
  )
}

export default DevelopersPage
