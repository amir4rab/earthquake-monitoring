import i18n from 'i18next';

// importing translations
import enCommon from '../../i18n/en/common.json';
import deCommon from '../../i18n/de/common.json';
import faCommon from '../../i18n/fa/common.json';

import enStates from '../../i18n/en/states.json';
import deStates from '../../i18n/de/states.json';
import faStates from '../../i18n/fa/states.json';

import enState from '../../i18n/en/state.json';
import deState from '../../i18n/de/state.json';
import faState from '../../i18n/fa/state.json';

import enEarthquake from '../../i18n/en/earthquake.json';
import deEarthquake from '../../i18n/de/earthquake.json';
import faEarthquake from '../../i18n/fa/earthquake.json';

import enPwa from '../../i18n/en/pwa.json';
import dePwa from '../../i18n/de/pwa.json';
import faPwa from '../../i18n/fa/pwa.json';

import enNearme from '../../i18n/en/near-me.json';
import deNearme from '../../i18n/de/near-me.json';
import faNearme from '../../i18n/fa/near-me.json';

import enAbout from '../../i18n/en/about.json';
import deAbout from '../../i18n/de/about.json';
import faAbout from '../../i18n/fa/about.json';

import { initReactI18next } from 'react-i18next';
import LangDetector from 'i18next-browser-languagedetector';

export const langs = ['en', 'de', 'fa'];

const resources = {
  en: {
    common: enCommon,
    earthquake: enEarthquake,
    'near-me': enNearme,
    states: enStates,
    state: enState,
    pwa: enPwa,
    about: enAbout
  },
  de: {
    common: deCommon,
    earthquake: deEarthquake,
    'near-me': deNearme,
    states: deStates,
    state: deState,
    pwa: dePwa,
    about: deAbout
  },
  fa: {
    common: faCommon,
    earthquake: faEarthquake,
    'near-me': faNearme,
    states: faStates,
    state: faState,
    pwa: faPwa,
    about: faAbout
  }
};

i18n
  .use(initReactI18next)
  .use(LangDetector)
  .init({
    fallbackLng: 'en',
    supportedLngs: langs,
    cleanCode: true,
    debug: true,
    resources,
    detection: {
      order: ['queryString', 'cookie'],
      caches: ['cookie']
    },
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    }
  });

export default i18n;
