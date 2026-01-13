export type SupportedLocales = (typeof supportedLocales)[number];
export type SupportedLanguages = typeof supportedLocales extends {
  [index: number]: `${infer E}-${string}`;
}
  ? E
  : never;

export type LocaleCode = string;

export const supportedLocales = [
  'en-US',
  'en-GB',
  'en-AU',
  'fr-FR',
  'fr-CA',
  'de-DE',
  'it-IT',
  'es-419',
  'es-ES',
  'ja-JP',
  'pt-PT',
  'pt-BR',
  'zh-CN',
  'zh-TW',
  'zh-HK',
  'nl-NL',
  'ko-KR',
  'fi-FI',
];

export const translationLocales = supportedLocales;

export default {
  supportedLocales,
  translationLocales,
  sourceLocale: 'en-US',
};
