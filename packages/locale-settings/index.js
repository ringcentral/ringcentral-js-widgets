const supportedLocales = [
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
];

const translationLocales = [...supportedLocales, 'fi-FI'];

module.exports = {
  supportedLocales,
  translationLocales,
  sourceLocale: 'en-US',
};
