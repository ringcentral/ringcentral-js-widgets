import type { CountryInfo } from './CountryInfo';
import type { CurrencyInfo } from './CurrencyInfo';
import type { FormattingLocaleInfo } from './FormattingLocaleInfo';
import type { GreetingLanguageInfo } from './GreetingLanguageInfo';
import type { RegionalLanguageInfo } from './RegionalLanguageInfo';
import type { TimezoneInfo } from './TimezoneInfo';

// Account level region data (web service Auto-Receptionist settings)
export interface AccountRegionalSettings {
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
  /**
   */
  currency: CurrencyInfo;
}
