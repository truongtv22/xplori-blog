import merge from 'lodash.merge';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { getLocaleTrans } from '@/services/api';

export default async (locale) => {
  const localeTrans = await getLocaleTrans(locale);
  const translation = await serverSideTranslations(locale);

  if (translation._nextI18Next) {
    // merge(translation._nextI18Next.initialI18nStore[locale].common, localeTrans);
  }

  return translation;
};
