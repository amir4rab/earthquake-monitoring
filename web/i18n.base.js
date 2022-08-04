/** @type {import('next-translate').NextConfig} */

module.exports = {
  locales: ["en", "de", "fa"],
  defaultLocale: "en",
  pages: {
    "*": [ "common", "earthquake", "states" ],
    "/states/[id]": [ "state" ],
    "/nearme": [ "near-me" ],
    "/download": [ "download" ],
    "/about": [ "about" ]
  }
}