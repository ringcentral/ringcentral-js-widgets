import { GlobalStorage } from '../GlobalStorageV2';
import { Locale } from '../LocaleV2';

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
