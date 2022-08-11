import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';

// next-translate
import useTranslation from 'next-translate/useTranslation';

// component
import Download from '@/components/download';

// utils
import getApplications, { GhRelease } from '@/utils/backend/getApplications';

interface Props {
  data: GhRelease | null;
}

const DownloadPage: NextPage<Props> = ( props ) => {
  const { t } = useTranslation('common')

  return (
    <>
      <Head>
        <title>{ t('download') }</title>
      </Head>
      <Download { ...props }/>
    </>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {

  const data = await getApplications();
  
  return {
    props: {
      data
    },
    revalidate: 60
  }
}

export default DownloadPage
