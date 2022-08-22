import type { NextPage } from 'next';
import Head from 'next/head';

import States from '@/components/states';

// next-translate
import useTranslation from 'next-translate/useTranslation';

const StatesPage: NextPage = () => {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>{t('states')}</title>
      </Head>
      <States />
    </>
  );
};

export default StatesPage;
