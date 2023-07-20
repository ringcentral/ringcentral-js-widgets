import type { RolesTimezoneResource } from './RolesTimezoneResource';
import type { RolesCountryResource } from './RolesCountryResource';
import type { RolesLanguageResource } from './RolesLanguageResource';
import type { CurrencyResource } from './CurrencyResource';

export interface RolesRegionalSettingsResource {
  /**
   */
  timezone: RolesTimezoneResource;
  /**
   */
  homeCountry: RolesCountryResource;
  /**
   */
  language: RolesLanguageResource;
  /**
   */
  greetingLanguage: RolesLanguageResource;
  /**
   */
  formattingLocale: RolesLanguageResource;
  /**
   */
  timeFormat: '12h' | '24h';
  /**
   */
  currency: CurrencyResource;
}
