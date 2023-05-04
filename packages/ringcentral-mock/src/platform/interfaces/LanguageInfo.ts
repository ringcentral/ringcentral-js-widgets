// User interface language data
export interface LanguageInfo {
  /**
   * Internal identifier of a language
   */
  id: string;
  /**
   * Canonical URI of a language
   */
  uri: string;
  /**
   * Indicates whether a language is available as greeting language
   */
  greeting: boolean;
  /**
   * Indicates whether a language is available as formatting locale
   */
  formattingLocale: boolean;
  /**
   * Localization code of a language
   */
  localeCode: string;
  /**
   * Country code according to the ISO standard, see [ISO 3166](https://www.iso.org/iso-3166-country-codes.html)
   */
  isoCode: string;
  /**
   * Official name of a language
   */
  name: string;
  /**
   * Indicates whether a language is available as UI language
   */
  ui: boolean;
}
