import type { ExtensionCountryInfoRequest } from './ExtensionCountryInfoRequest';
import type { ExtensionTimezoneInfoRequest } from './ExtensionTimezoneInfoRequest';
import type { ExtensionLanguageInfoRequest } from './ExtensionLanguageInfoRequest';
import type { ExtensionGreetingLanguageInfoRequest } from './ExtensionGreetingLanguageInfoRequest';
import type { ExtensionFormattingLocaleInfoRequest } from './ExtensionFormattingLocaleInfoRequest';

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
