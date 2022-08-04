import type { NextPage } from 'next';
import Head from 'next/head';

// next-translate
import useTranslation from 'next-translate/useTranslation';

import Download from '@/components/download';

const DownloadPage: NextPage = () => {
  const { t } = useTranslation('common')

  return (
    <>
      <Head>
        <title>{ t('download') }</title>
      </Head>
      <Download />
    </>
  )
}

export default DownloadPage
