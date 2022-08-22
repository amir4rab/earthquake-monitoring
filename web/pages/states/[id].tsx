// next
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';

// states data
import statesGeoData from '@/shared-data/states-geo-location';

// types
import useTranslation from 'next-translate/useTranslation';

// components
import State, { StateInterface } from '@/components/state';

const StatePage: NextPage<StateInterface> = ({ stateData }) => {
  const { t } = useTranslation('states');

  return (
    <>
      <Head>
        <title>{t(stateData.id)}</title>
      </Head>
      <State stateName={t(stateData.id)} stateData={stateData} />
    </>
  );
};

export const getStaticProps: GetStaticProps<StateInterface> = async (
  context
) => {
  try {
    if (
      typeof context === 'undefined' ||
      typeof context.params === 'undefined' ||
      typeof context.params.id !== 'string'
    )
      return {
        notFound: true
      };
    const stateId = context.params.id as string;
    const geoLocationData = statesGeoData[stateId];

    return {
      props: {
        stateData: {
          ...geoLocationData,
          id: stateId
        },
        stateName: ''
      }
    };
  } catch (err) {
    console.error(err);

    return {
      notFound: true
    };
  }
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const keys = Object.keys(statesGeoData);

  const paths =
    typeof locales === 'undefined'
      ? keys.map((id) => ({ params: { id: id + '' } }))
      : keys.flatMap((id) => {
          return [
            { params: { id: id + '' } },
            ...locales.map((locale) => ({ params: { id: id + '' }, locale }))
          ];
        });

  return {
    paths,
    fallback: process.env.NODE_ENV === 'development' ? 'blocking' : false
  };
};

export default StatePage;
