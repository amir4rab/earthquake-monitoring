/** @type {import('next-translate').NextConfig} */
module.exports = {
  locales: ["en", "de", "fa"],
  defaultLocale: "en",
  loadLocaleFrom: async (lang, ns) => 
    await require(`../i18n/${lang}/${ns}.json`),
  pages: {
    "*": [ "common", "earthquake", "states" ],
    "/states/[id]": [ "state" ],
    "/nearme": [ "near-me" ]
  }
}