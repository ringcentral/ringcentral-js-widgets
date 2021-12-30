import formatMessage from 'format-message';

import {
  action,
  computed,
  RcModuleV2,
  state,
} from '@ringcentral-integration/core';
import I18n, {
  DEFAULT_LOCALE,
  PSEUDO_LOCALE,
} from '@ringcentral-integration/i18n';
import formatLocale from '@ringcentral-integration/i18n/lib/formatLocale';

import detectBrowserLocale from '../../lib/detectBrowserLocale';
import { Module } from '../../lib/di';
import { proxify } from '../../lib/proxy/proxify';
import { Deps } from './Locale.interface';

@Module({
  name: 'Locale',
  deps: [
    {
      dep: 'BrandConfig',
      optional: true,
    },
    {
      dep: 'LocaleOptions',
      optional: true,
    },
  ],
})
export class Locale extends RcModuleV2<Deps> {
  constructor(deps: Deps) {
    super({ deps });
    I18n.setDefaultLocale(this.defaultLocale);
  }

  get defaultLocale() {
    return (
      this._deps.localeOptions?.defaultLocale ??
      this._deps.brandConfig?.defaultLocale ??
      DEFAULT_LOCALE
    );
  }

  protected get _detectBrowser() {
    return this._deps.localeOptions?.detectBrowser ?? true;
  }

  protected get _polling() {
    return this._deps.localeOptions?.polling ?? false;
  }

  protected get _pollingInterval() {
    return this._deps.localeOptions?.pollingInterval ?? 2000;
  }

  @computed(({ defaultLocale }: Locale) => [defaultLocale])
  get supportedLocales() {
    return (
      this._deps.localeOptions?.supportedLocales ??
      this._deps.brandConfig?.supportedLocales ?? [this.defaultLocale]
    );
  }

  @state
  locale: string = null;

  @state
  proxyLocale: string = null;

  @action
  _setProxyLocaleSuccess(locale: string) {
    this.proxyLocale = locale;
  }

  @proxify
  async setProxyLocaleSuccess(locale: string) {
    this._setProxyLocaleSuccess(locale);
  }

  @state
  debugMode = false;

  @action
  _toggleDebugMode() {
    this.debugMode = !this.debugMode;
    // TODO: refactor without side effect.
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

  async initializeProxy() {
    let setLocalePromise: Promise<void>;
    await this._setLocale(this.currentLocale);
    this.setProxyLocaleSuccess(this.currentLocale);
    this.store.subscribe(async () => {
      if (this.locale !== this.proxyLocale && !setLocalePromise) {
        setLocalePromise = this._setLocale(this.locale);
        await setLocalePromise;
        this.setProxyLocaleSuccess(this.locale);
        setLocalePromise = null;
      }
    });
  }

  async onInit() {
    await this.setLocale(
      this._detectBrowser ? this.browserLocale : this.defaultLocale,
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

  normalizeLocale(inputLocale: string) {
    const locale = formatLocale(inputLocale);

    const target = this.supportedLocales
      .map((item) => formatLocale(item))
      .find((item) => item === locale || item.split('-')[0] === locale);
    return target ?? this.defaultLocale;
  }

  get currentLocale() {
    return (
      (this._transport ? this.proxyLocale : this.locale) ?? this.defaultLocale
    );
  }

  get browserLocale() {
    return detectBrowserLocale(this.defaultLocale);
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

export default Locale;
