import type { CountryInfo } from './CountryInfo';
import type { FormattingLocaleInfo } from './FormattingLocaleInfo';
import type { GreetingLanguageInfo } from './GreetingLanguageInfo';
import type { RegionalLanguageInfo } from './RegionalLanguageInfo';
import type { TimezoneInfo } from './TimezoneInfo';

// Regional data (timezone, home country, language) of an extension/account. The default is Company (Auto-Receptionist) settings
export interface RegionalSettings {
  /**
   */
  homeCountry: CountryInfo;
  /**
   */
  timezone: TimezoneInfo;
  /**
   */
  language: RegionalLanguageInfo;
  /**
   */
  greetingLanguage: GreetingLanguageInfo;
  /**
   */
  formattingLocale: FormattingLocaleInfo;
  /**
   * Time format setting. The default value is '12h' = ['12h', '24h']
   */
  timeFormat: '12h' | '24h';
}
