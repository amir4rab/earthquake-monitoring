/** @type {import('next-translate').NextConfig} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const conf = require('./i18n.base');

module.exports = {
  ...conf,
  loadLocaleFrom: async (lang, ns) =>
    await require(`../i18n/${lang}/${ns}.json`)
};
