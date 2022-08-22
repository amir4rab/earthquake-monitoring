import Head from 'next/head';

// components
import HomeComponent from '@/components/home';

// types
import type { GetStaticProps, NextPage } from 'next';
import type {
  ExtendedEarthquakeArray,
  ExtendedEarthquake
} from '@/types/extendedEarthquake';

// utils
import getLatestData from '@/utils/backend/getLatestData';

// next-translate
import useTranslation from 'next-translate/useTranslation';

interface Props {
  latestEarthquakesArr: ExtendedEarthquakeArray;
}

const HomePage: NextPage<Props> = ({ latestEarthquakesArr }) => {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>{t('earthquake-monitoring') + ' - ' + t('latest')}</title>
      </Head>
      <HomeComponent latestEarthquakesArr={latestEarthquakesArr} />
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const data = await getLatestData();

  return {
    props: {
      latestEarthquakesArr: data.map(
        (i) =>
          ({ ...i, date: i.date.valueOf() } as unknown as ExtendedEarthquake)
      )
    }
  };
};

export default HomePage;
