module.exports = {
  // https://www.i18next.com/overview/configuration-options#logging
  debug: false, // process.env.NODE_ENV === 'development',
  i18n: {
    locales: ['en', 'vi', 'ge', 'zh', 'es', 'de'],
    defaultLocale: 'en',
    // localeDetection: false,
  },
  localePath:
    typeof window === 'undefined'
      ? require('path').resolve('./public/locales')
      : '/locales',
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};
