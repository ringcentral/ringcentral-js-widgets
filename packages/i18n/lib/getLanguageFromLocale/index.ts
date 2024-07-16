import { DEFAULT_LOCALE } from '../../constants';

export const languageRexExp = /^([a-z]{2})(-.*)?/;

export const getLanguageFromLocale = (locale: string) => {
  return locale.match(languageRexExp)?.[1] ?? DEFAULT_LOCALE;
};
