import type { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';

// components
import NearMe from '@/components/nearme';

// type
import type { ExtendedEarthquake, ExtendedEarthquakeArray } from '@/types/extendedEarthquake';

// utils
import getLatestData from '@/utils/backend/getLatestData';

// next-translate
import useTranslation from 'next-translate/useTranslation';

interface Props {
  latestEarthquakesArr: ExtendedEarthquakeArray
}
const NearMePage: NextPage< Props > = ({ latestEarthquakesArr }) => {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>{ t('near-me') }</title>
      </Head>
      <NearMe latestEarthquakesArr={ latestEarthquakesArr }/>
    </>
  )
};

export const getStaticProps: GetStaticProps<Props> = async () => {

  const data = await getLatestData();
  
  return {
    props: {
      latestEarthquakesArr: data.map( i => (({ ...i, date: i.date.valueOf() } as unknown ) as ExtendedEarthquake))
    }
  }
}

export default NearMePage
