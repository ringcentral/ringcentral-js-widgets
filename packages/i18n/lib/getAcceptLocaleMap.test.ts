import { supportedLocales } from '@ringcentral-integration/locale-settings';

import formatLocale from './formatLocale';
import { getAcceptLocaleMap } from './getAcceptLocaleMap';

describe('getAcceptLocaleMap', () => {
  it('should create a map with exact matches for all supported locales', () => {
    const supportedLocales = ['en-US', 'fr-FR', 'es-ES'];
    const map = getAcceptLocaleMap(supportedLocales);

    supportedLocales.forEach((locale) => {
      const formattedLocale = formatLocale(locale);
      expect(map.get(formattedLocale)).toBe(formattedLocale);
    });
  });

  it('should create language-only matches when not already set', () => {
    const supportedLocales = ['en-US', 'fr-FR', 'es-ES'];
    const map = getAcceptLocaleMap(supportedLocales);

    expect(map.get('en')).toBe('en-US');
    expect(map.get('fr')).toBe('fr-FR');
    expect(map.get('es')).toBe('es-ES');
  });

  it('should use the first locale when multiple locales share the same language', () => {
    const supportedLocales = ['en-US', 'en-GB', 'fr-FR', 'fr-CA'];
    const map = getAcceptLocaleMap(supportedLocales);

    expect(map.get('en')).toBe('en-US');
    expect(map.get('fr')).toBe('fr-FR');
  });

  it('should handle mixed case and delimiter formats in input', () => {
    const supportedLocales = ['EN_us', 'fr-fr'];
    const map = getAcceptLocaleMap(supportedLocales);

    expect(map.get('en-US')).toBe('en-US');
    expect(map.get('fr-FR')).toBe('fr-FR');
    expect(map.get('en')).toBe('en-US');
    expect(map.get('fr')).toBe('fr-FR');
  });

  it('should return an empty map for empty input', () => {
    const map = getAcceptLocaleMap([]);
    expect(map.size).toBe(0);
  });

  it('snapshot for the map', () => {
    const map = getAcceptLocaleMap(supportedLocales);

    expect(map).toMatchInlineSnapshot(`
      Map {
        "en-US" => "en-US",
        "en" => "en-US",
        "en-GB" => "en-GB",
        "en-AU" => "en-AU",
        "fr-FR" => "fr-FR",
        "fr" => "fr-FR",
        "fr-CA" => "fr-CA",
        "de-DE" => "de-DE",
        "de" => "de-DE",
        "it-IT" => "it-IT",
        "it" => "it-IT",
        "es-419" => "es-419",
        "es" => "es-419",
        "es-ES" => "es-ES",
        "ja-JP" => "ja-JP",
        "ja" => "ja-JP",
        "pt-PT" => "pt-PT",
        "pt" => "pt-PT",
        "pt-BR" => "pt-BR",
        "zh-CN" => "zh-CN",
        "zh" => "zh-CN",
        "zh-TW" => "zh-TW",
        "zh-HK" => "zh-HK",
        "nl-NL" => "nl-NL",
        "nl" => "nl-NL",
        "ko-KR" => "ko-KR",
        "ko" => "ko-KR",
        "fi-FI" => "fi-FI",
        "fi" => "fi-FI",
      }
    `);
  });
});
