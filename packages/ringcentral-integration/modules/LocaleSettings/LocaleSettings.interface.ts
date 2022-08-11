import { GlobalStorage } from '../GlobalStorage';
import { Locale } from '../Locale';

export interface LocaleSettingsOptions {
  /**
   * A list of supported Locales, the default value is ['en-US'].
   */
  supportedLocales?: string[];
}

export interface Deps {
  globalStorage: GlobalStorage;
  locale: Locale;
  localeSettingsOptions?: LocaleSettingsOptions;
}
