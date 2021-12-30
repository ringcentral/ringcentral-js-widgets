export const supportedLocales: readonly [
  'en-US',
  'en-GB',
  'en-AU',
  'fr-FR',
  'fr-CA',
  'de-DE',
  'it-IT',
  'es-ES',
  'es-419',
  'ja-JP',
  'pt-PT',
  'pt-BR',
  'zh-CN',
  'zh-TW',
  'zh-HK',
  'nl-NL',
  'ko-KR',
];

export type SupportedLocales = typeof supportedLocales[number];
export type SupportedLanguages = typeof supportedLocales extends {
  [index: number]: `${infer E}-${string}`;
}
  ? E
  : never;

export type LocaleCode = string;

export const sourceLocale = 'en-US';
