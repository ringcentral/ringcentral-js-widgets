// ringcentral-js-widgets/locale-settings/index.js
import dayjs from 'dayjs';

export const dayjsLanguagesMap = {
  'en-US': 'en',
  'de-DE': 'de',
  'en-AU': 'en-au',
  'en-GB': 'en-gb',
  'es-419': 'es-do',
  'es-ES': 'es',
  'fr-CA': 'fr-ca',
  'fr-FR': 'fr',
  'it-IT': 'it',
  'ja-JP': 'ja',
  'pt-BR': 'pt-br',
  'pt-PT': 'pt',
  'zh-CN': 'zh-cn',
  'zh-HK': 'zh-hk',
  'zh-TW': 'zh-tw',
  'nl-NL': 'nl',
  'ko-KR': 'ko',
  'fi-FI': 'fi',
};

export const setDayjsLocale = (locale: string) => {
  const dayjsLocale = dayjsLanguagesMap[locale as never];
  dayjs.locale(dayjsLocale || locale!);
};
