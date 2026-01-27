import { DEFAULT_LOCALE } from '@ringcentral-integration/i18n';
import { processI18n } from '@ringcentral-integration/i18n/lib/processI18n';
import {
  action,
  computed,
  fromWatchValue,
  inject,
  injectable,
  optional,
  RcModule,
  state,
  takeUntilAppDestroy,
} from '@ringcentral-integration/next-core';
import { distinctUntilChanged, tap } from 'rxjs';

import { Locale } from '../Locale';

import type { BrandConfigOptions, SuiBrandThemeMap } from './Brand.interface';
import type { BrandConfig } from './BrandConfig.interface';
import { processAssets } from './processAssets';

@injectable({
  name: 'Brand',
})
export class Brand<T extends BrandConfig = BrandConfig> extends RcModule {
  protected _defaultPrefix = `${this._brandConfig.code}-${
    this._brandConfig.application ?? ''
  }`;

  constructor(
    @inject('BrandConfig') protected _brandConfig: BrandConfig,
    protected _locale: Locale,
    @optional('Prefix') protected _prefix?: string,
    @optional('BrandConfigOptions')
    protected _brandConfigOptions?: BrandConfigOptions,
  ) {
    super();

    this.bindUpdateDocumentVariables();
  }

  @state
  protected _dynamicConfig: T | null = null;

  @action
  setDynamicConfig(config: T) {
    this._dynamicConfig = config;
  }

  @state
  suiThemeMap: SuiBrandThemeMap = {
    default: [],
    light: [],
    dark: [],
    contrast: [],
  };

  @action
  setSuiThemeMap(val: SuiBrandThemeMap) {
    this.suiThemeMap = val;
  }

  private bindUpdateDocumentVariables() {
    if (!global.document) return;

    const obs$ = fromWatchValue(this, () =>
      JSON.stringify(this.brandConfig.styleVariable),
    ).pipe(
      distinctUntilChanged(),
      tap(() => this.updateDocumentVariables()),
      takeUntilAppDestroy,
    );

    obs$.subscribe();
  }

  private updateDocumentVariables() {
    // apply that style variable to global css variable
    Object.entries(this.brandConfig.styleVariable ?? {}).forEach(
      ([key, value]) => {
        document.documentElement.style.setProperty(`--${key}`, `${value}`);
      },
    );
  }

  /**
   * dynamic brand config with i18n processed with currentLocale
   */
  @computed((that: Brand<T>) => [
    that._dynamicConfig,
    that._locale?.currentLocale,
    that._locale?.defaultLocale,
  ])
  get dynamicConfig() {
    return (
      this._dynamicConfig &&
      processI18n(
        this._dynamicConfig,
        this._locale?.currentLocale ?? DEFAULT_LOCALE,
        this._locale?.defaultLocale ?? DEFAULT_LOCALE,
      )
    );
  }

  /**
   * default brand config with assets processed
   */
  @computed((that: Brand<T>) => [that._brandConfig])
  protected get _defaultConfig() {
    const brandConfig = this._brandConfig;

    if (!brandConfig?.assets) return brandConfig;

    /**
     * use current window location.origin as origin
     * to avoid app inject into others page meet resource path issue
     * like chrome extension content page
     */
    return {
      ...brandConfig,
      assets: processAssets(
        brandConfig.assets,
        this._brandConfigOptions?.assetOrigin || global.location.origin,
      ),
    };
  }

  /**
   * default brand config with assets and i18n processed using en-US
   */
  @computed((that: Brand<T>) => [that._defaultConfig])
  get defaultConfig() {
    return processI18n(this._defaultConfig) as T;
  }

  /**
   * Generic brand config accessor that returns dynamic config if available, and defaults
   * to default config. The result is assets and i18n processed with current Locale.
   */
  @computed((that: Brand<T>) => [
    that._defaultConfig,
    that._dynamicConfig,
    that._locale?.currentLocale,
    that._locale?.defaultLocale,
  ])
  get brandConfig() {
    return processI18n(
      this._dynamicConfig ?? this._defaultConfig,
      this._locale?.currentLocale ?? DEFAULT_LOCALE,
      this._locale?.defaultLocale ?? DEFAULT_LOCALE,
    ) as T;
  }

  get prefix() {
    return this._prefix ?? this._defaultPrefix;
  }

  get id() {
    return this.brandConfig.id;
  }

  get code() {
    return this.brandConfig.code;
  }

  get name() {
    return this.brandConfig.name as string;
  }

  get shortName() {
    return this.brandConfig.shortName ?? this.brandConfig.name;
  }

  get appName() {
    return this.brandConfig.appName;
  }

  get shortAppName() {
    return this.brandConfig.shortAppName;
  }

  get rcvProductName() {
    return this.brandConfig.rcvProductName;
  }

  get rcvE2EESupportUrl() {
    return this.brandConfig.rcvE2EESupportUrl;
  }

  get application() {
    return this.brandConfig.application;
  }

  get rcvTeleconference() {
    return this.brandConfig.rcvTeleconference;
  }

  get assets() {
    return this.brandConfig.assets;
  }
}
