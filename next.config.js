/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");

module.exports = {
  i18n,
  reactStrictMode: true,
  output: "standalone",
  compiler: {
    styledComponents: true,
  },
};
