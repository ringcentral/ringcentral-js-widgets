import detectBrowserLocale, {
  getBrowserLocale,
} from '@ringcentral-integration/commons/lib/detectBrowserLocale';
import I18n, {
  DEFAULT_LOCALE,
  formatLocale,
  getAcceptLocaleMap,
  PSEUDO_LOCALE,
} from '@ringcentral-integration/i18n';
import { setDayjsLocale } from '@ringcentral-integration/i18n-dayjs';
import {
  action,
  computed,
  delegate,
  fromWatchValue,
  injectable,
  isSharedWorker,
  optional,
  PortManager,
  RcModule,
  state,
  takeUntilAppDestroy,
} from '@ringcentral-integration/next-core';
import {
  concatMap,
  defer,
  distinctUntilChanged,
  EMPTY,
  filter,
  fromEvent,
  switchMap,
  take,
} from 'rxjs';

import type { BrandConfig } from '../Brand';

import type { LocaleOptions } from './Locale.interface';

@injectable({
  name: 'Locale',
})
export class Locale extends RcModule {
  constructor(
    protected _portManager: PortManager,
    @optional('BrandConfig') protected _brandConfig?: BrandConfig,
    @optional('LocaleOptions') protected _localeOptions?: LocaleOptions,
  ) {
    super();
    I18n.setDefaultLocale(this.defaultLocale);
    I18n.setGetTranslateLocale(() => this.currentLocale);

    if (this._portManager.shared) {
      this._portManager.onClient(() => {
        this._listenServerToClientLocaleLoad();
      });
    }

    if (this._detectBrowser && this._detectBrowser !== 'once') {
      if (this._portManager.shared) {
        this._portManager.onMainTab(() => {
          this._listenBrowserLocaleChange();
        });
      } else {
        this._listenBrowserLocaleChange();
      }
    }
  }

  get defaultLocale() {
    return (
      this._localeOptions?.defaultLocale ??
      this._brandConfig?.defaultLocale ??
      DEFAULT_LOCALE
    );
  }

  protected get _detectBrowser() {
    return this._localeOptions?.detectBrowser ?? true;
  }

  @computed
  get supportedLocales() {
    return (
      this._localeOptions?.supportedLocales ??
      this._brandConfig?.supportedLocales ?? [this.defaultLocale]
    );
  }

  @computed
  get acceptLocaleMap() {
    return getAcceptLocaleMap(this.supportedLocales);
  }

  @computed
  get initLocale() {
    const initLocale = this._detectBrowser
      ? this.browserLocale
      : this.defaultLocale;

    return initLocale;
  }

  @state
  locale: string | null = null;

  @state
  clientLocales: Record<string, string | null> = {};

  @action
  _setClientLocaleSuccess(clientId: string, locale: string | null) {
    this.clientLocales[clientId] = locale;
  }

  get clientLocale() {
    if (!this._portManager.clientId) return null;
    return this.clientLocales[this._portManager.clientId];
  }

  @delegate('server')
  async setClientLocaleSuccess(clientId: string, locale: string | null) {
    if (this.clientLocales[clientId] !== locale) {
      this._setClientLocaleSuccess(clientId, locale);
    }
  }

  @state
  debugMode = false;

  @action
  _toggleDebugMode() {
    this.debugMode = !this.debugMode;
    // TODO: refactor without side effect.
    if (this.debugMode) {
      this.setLocale(PSEUDO_LOCALE, false);
    }
  }

  @action
  _setLocaleSuccess(locale: string) {
    this.locale = locale;
  }

  override async onInit() {
    const initLocale = this._detectBrowser
      ? this.browserLocale
      : this.defaultLocale;
    this.logger.log('initLocale', initLocale);

    await this.setLocale(initLocale, false);
  }

  private _listenServerToClientLocaleLoad() {
    const initClientLocale$ = defer(() => {
      const initLocale = this.initLocale;

      this.logger.log('client initLocale', initLocale);

      return this._innerSetAndLoadLocale(initLocale);
    }).pipe(
      take(1),
      switchMap((locale) => {
        // set local state async to make we can get the locale client state as soon as possible
        this._setClientLocaleSuccess(this._portManager.clientId!, locale);

        // also sync to server
        return this.setClientLocaleSuccess(this._portManager.clientId!, locale);
      }),
    );

    // wait server ready, then set the locale state to load the locale
    initClientLocale$
      .pipe(
        switchMap(() => this.ready$),
        take(1),
        switchMap(() => fromWatchValue(this, () => this.locale)),
        filter(Boolean),
        concatMap(async (locale) => {
          if (locale !== this.clientLocale) {
            await this._innerSetAndLoadLocale(locale);
            await this.setClientLocaleSuccess(
              this._portManager.clientId!,
              locale,
            );
          }
        }),
        distinctUntilChanged(),
      )
      .subscribe();
  }

  private async _listenBrowserLocaleChange() {
    // shared worker not support languagechange event
    if (isSharedWorker) return;
    this.ready$
      .pipe(
        switchMap(() => fromWatchValue(this, () => this.debugMode)),
        switchMap((debugMode) => {
          if (debugMode) return EMPTY;

          this.logger.info('listen browser locale change');
          // https://developer.mozilla.org/en-US/docs/Web/API/Window/languagechange_event
          return fromEvent(globalThis.window, 'languagechange');
        }),
        distinctUntilChanged(),
        switchMap(async () => {
          const browserLocale = this.browserLocale;
          const currentLocale = this.currentLocale;

          this.logger.info('browser locale change', {
            browserLocale: getBrowserLocale(),
            normalizedBrowserLocale: browserLocale,
            currentLocale,
          });

          if (browserLocale !== currentLocale) {
            await this.setLocale(browserLocale, false);
          }
        }),
        takeUntilAppDestroy,
      )
      .subscribe();
  }

  protected async _innerSetAndLoadLocale(locale: string) {
    await I18n.setLocale(locale);
    setDayjsLocale(locale || this.defaultLocale);
    return locale;
  }

  normalizeLocale(_inputLocale: string | null) {
    if (_inputLocale === null) return this.defaultLocale;

    const inputLocale = formatLocale(_inputLocale);

    // Try exact match first, then language-only match
    if (this.acceptLocaleMap.has(inputLocale)) {
      return this.acceptLocaleMap.get(inputLocale)!;
    }

    // Try language-only match
    const languageOnly = inputLocale.split('-')[0];
    if (this.acceptLocaleMap.has(languageOnly)) {
      return this.acceptLocaleMap.get(languageOnly)!;
    }

    return this.defaultLocale;
  }

  get currentLocale(): string {
    return (
      (this._portManager.isClient ? this.clientLocale : this.locale) ??
      this.defaultLocale
    );
  }

  get browserLocale() {
    const locale = detectBrowserLocale(this.defaultLocale);
    return this.normalizeLocale(locale);
  }

  @delegate('server')
  async toggleDebugMode() {
    this._toggleDebugMode();
  }

  /**
   * Sets the desired locale as the current locale.
   *
   * by default that will normalize the locale to the supported locales, if you already normalized the locale, you can set `normalize` to false
   * @param locale - The desired locale to set.
   * @param normalize - Whether to normalize the locale to the supported locales.
   */
  @delegate('server')
  async setLocale(locale: string, normalize = true) {
    try {
      const _locale = normalize ? this.normalizeLocale(locale) : locale;

      await this._innerSetAndLoadLocale(_locale);
      this._setLocaleSuccess(_locale);
    } catch (error) {
      this.logger.error('load locale fail', error);
    }
  }
}
