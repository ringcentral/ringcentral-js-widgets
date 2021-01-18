import { action, RcModuleV2, state } from '@ringcentral-integration/core';
import I18n, {
  DEFAULT_LOCALE,
  PSEUDO_LOCALE,
} from '@ringcentral-integration/i18n';
import formatMessage from 'format-message';
import detectBrowserLocale from '../../lib/detectBrowserLocale';
import { Module } from '../../lib/di';
import proxify from '../../lib/proxy/proxify';
import { proxyState } from '../../lib/proxy/proxyState';
import { Deps } from './Locale.interface';

@Module({
  name: 'Locale',
  deps: [{ dep: 'LocaleOptions', optional: true }],
})
export class Locale extends RcModuleV2<Deps> {
  constructor(deps: Deps) {
    super({ deps });
    I18n.setDefaultLocale(deps.localeOptions?.defaultLocale ?? DEFAULT_LOCALE);
  }

  get _defaultLocale() {
    return this._deps.localeOptions?.defaultLocale ?? DEFAULT_LOCALE;
  }

  get _detectBrowser() {
    return this._deps.localeOptions?.detectBrowser ?? true;
  }

  get _polling() {
    return this._deps.localeOptions?.polling ?? false;
  }

  get _pollingInterval() {
    return this._deps.localeOptions?.pollingInterval ?? 2000;
  }

  @proxyState(async (that: Locale, locale: string) => {
    await that._setLocale(locale);
  })
  @state
  locale: string = null;

  @state
  debugMode = false;

  @action
  _toggleDebugMode() {
    this.debugMode = !this.debugMode;
    if (this.debugMode) {
      this.setLocale(PSEUDO_LOCALE);
    }
  }

  @action
  _setLocaleSuccess(locale: string) {
    this.locale = locale;
  }

  onInitOnce() {
    if (this._polling) {
      this._syncBrowserLocale();
    }
  }

  async onInit() {
    await this.setLocale(
      this._detectBrowser ? this.browserLocale : this._defaultLocale,
    );
  }

  protected async _syncBrowserLocale() {
    if (!this.debugMode && this.browserLocale !== this.currentLocale) {
      await this.setLocale(this.browserLocale);
    }
    setTimeout(() => this._syncBrowserLocale(), this._pollingInterval);
  }

  protected async _setLocale(locale: string) {
    await I18n.setLocale(locale);
    formatMessage.setup({
      locale:
        this.currentLocale === PSEUDO_LOCALE
          ? DEFAULT_LOCALE
          : this.currentLocale,
    });
  }

  get currentLocale() {
    return this.locale || this._defaultLocale;
  }

  get browserLocale() {
    return detectBrowserLocale(this._defaultLocale);
  }

  @proxify
  async toggleDebugMode() {
    this._toggleDebugMode();
  }

  /**
   *  Sets the desired locale as the current locale. This will also
   *  set all I18n instances to the same locale, as well as set formatMessage to use
   *  the same locale.
   */
  @proxify
  async setLocale(locale: string) {
    try {
      await this._setLocale(locale);
      this._setLocaleSuccess(locale);
    } catch (error) {
      console.log(error);
    }
  }
}
