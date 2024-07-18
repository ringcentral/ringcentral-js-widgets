import type { ExtensionCountryInfoRequest } from './ExtensionCountryInfoRequest';
import type { ExtensionFormattingLocaleInfoRequest } from './ExtensionFormattingLocaleInfoRequest';
import type { ExtensionGreetingLanguageInfoRequest } from './ExtensionGreetingLanguageInfoRequest';
import type { ExtensionLanguageInfoRequest } from './ExtensionLanguageInfoRequest';
import type { ExtensionTimezoneInfoRequest } from './ExtensionTimezoneInfoRequest';

export interface ExtensionRegionalSettingRequest {
  /**
   */
  homeCountry: ExtensionCountryInfoRequest;
  /**
   */
  timezone: ExtensionTimezoneInfoRequest;
  /**
   */
  language: ExtensionLanguageInfoRequest;
  /**
   */
  greetingLanguage: ExtensionGreetingLanguageInfoRequest;
  /**
   */
  formattingLocale: ExtensionFormattingLocaleInfoRequest;
  /**
   * Time format setting
   * Default: 12h
   */
  timeFormat: '12h' | '24h';
}
