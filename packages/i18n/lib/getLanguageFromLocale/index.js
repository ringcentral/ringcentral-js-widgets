
export const languageRexExp = /^([a-z]{2})-.*/;

export const getLanguageFromLocale = (locale) => {
  return locale.match(languageRexExp)?.[1] ?? null;
};
