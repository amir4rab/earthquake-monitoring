/** @type {import('next-translate').NextConfig} */

const conf = require('./i18n.base');

module.exports = {
  ...conf,
  loadLocaleFrom: async (lang, ns) => 
    await require(`../i18n/${lang}/${ns}.json`),
}