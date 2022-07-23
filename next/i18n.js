module.exports = {
  locales: ["en", "de", "fa"],
  defaultLocale: "fa",
  loadLocaleFrom: async (lang, ns) => 
    await require(`../i18n/${lang}/${ns}.json`),
  pages: {
    "*": [ "common" ]
  }
}