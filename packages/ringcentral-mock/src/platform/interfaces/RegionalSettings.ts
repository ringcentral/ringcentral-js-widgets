import { CountryInfo } from './CountryInfo';
import { TimezoneInfo } from './TimezoneInfo';
import { RegionalLanguageInfo } from './RegionalLanguageInfo';
import { GreetingLanguageInfo } from './GreetingLanguageInfo';
import { FormattingLocaleInfo } from './FormattingLocaleInfo';

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
