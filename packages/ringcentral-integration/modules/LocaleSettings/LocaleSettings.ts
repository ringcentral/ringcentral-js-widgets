import {
  action,
  globalStorage,
  RcModuleV2,
  state,
} from '@ringcentral-integration/core';
import { DEFAULT_LOCALE } from '@ringcentral-integration/i18n';

import { Module } from '../../lib/di';
import { proxify } from '../../lib/proxy/proxify';
import type { Deps } from './LocaleSettings.interface';

@Module({
  name: 'LocaleSettings',
  deps: [
    'GlobalStorage',
    'Locale',
    { dep: 'LocaleSettingsOptions', optional: true },
  ],
})
export class LocaleSettings extends RcModuleV2<Deps> {
  protected _supportedLocales: string[];
  public supportedLocales: string[];

  constructor(deps: Deps) {
    super({
      deps,
      enableGlobalCache: true,
      storageKey: 'LocaleSettings',
    });
    this._supportedLocales = this._deps.localeSettingsOptions
      ?.supportedLocales ?? [DEFAULT_LOCALE];
    this.supportedLocales = this._supportedLocales.slice().sort();
  }

  @globalStorage
  @state
  savedLocale: string = null;

  @action
  protected _saveLocale(locale: string) {
    this.savedLocale = locale;
  }

  override async onInit() {
    if (!this.savedLocale) {
      this.saveLocale(this._deps.locale.currentLocale);
    } else if (this.savedLocale !== this._deps.locale.currentLocale) {
      await this._deps.locale.setLocale(this.savedLocale);
    }
  }

  @proxify
  async saveLocale(locale: string) {
    await this._deps.locale.setLocale(locale);
    this._saveLocale(locale);
  }
}
