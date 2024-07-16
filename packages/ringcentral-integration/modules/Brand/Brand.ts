import {
  action,
  computed,
  RcModuleV2,
  state,
  watch,
} from '@ringcentral-integration/core';
import { DEFAULT_LOCALE } from '@ringcentral-integration/i18n';

import { Module } from '../../lib/di';
import { processI18n } from '../../lib/processI18n';

import type { BrandThemeMap, Deps } from './Brand.interface';
import type { BrandConfig } from './BrandConfig.interface';
import { processAssets } from './processAssets';

@Module({
  name: 'Brand',
  deps: [
    'BrandConfig',
    'Locale',
    { dep: 'Prefix', optional: true },
    { dep: 'BrandConfigOptions', optional: true },
  ],
})
export class Brand<
  T extends BrandConfig = BrandConfig,
  D extends Deps<T> = Deps<T>,
> extends RcModuleV2<D> {
  protected _prefix: string | null = null;
  constructor(deps: D) {
    super({
      deps,
    });
    this._prefix = `${this._deps.brandConfig.code}-${
      this._deps.brandConfig.application ?? ''
    }`;

    this.bindUpdateDocumentVariables();
  }

  @state
  protected _dynamicConfig: T | null = null;

  @action
  setDynamicConfig(config: T) {
    this._dynamicConfig = config;
  }

  @state
  themeMap: BrandThemeMap = {
    default: [],
    light: [],
    dark: [],
    contrast: [],
  };

  @action
  setThemeMap(val: BrandThemeMap) {
    this.themeMap = val;
  }

  private bindUpdateDocumentVariables() {
    if (!global.document) return;

    const updateDocumentVariables = () => {
      const check = () => JSON.stringify(this.brandConfig.styleVariable);
      let updateVal = check();
      this.updateDocumentVariables();

      watch(this, check, (val) => {
        if (val === updateVal) return;
        updateVal = val;
        this.updateDocumentVariables();
      });
    };

    // * in old arch chrome extension content page, need to wait a tick, otherwise the watch event will not get any update
    Promise.resolve().then(updateDocumentVariables);
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
  @computed((that: Brand<T, D>) => [
    that._dynamicConfig,
    that._deps.locale?.currentLocale,
    that._deps.locale?.defaultLocale,
  ])
  get dynamicConfig() {
    return (
      this._dynamicConfig &&
      processI18n(
        this._dynamicConfig,
        this._deps.locale?.currentLocale ?? DEFAULT_LOCALE,
        this._deps.locale?.defaultLocale ?? DEFAULT_LOCALE,
      )
    );
  }

  /**
   * default brand config with assets processed
   */
  @computed((that: Brand<T, D>) => [that._deps.brandConfig])
  protected get _defaultConfig() {
    const brandConfig = this._deps.brandConfig;

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
        this._deps.brandConfigOptions?.assetOrigin || window.location.origin,
      ),
    };
  }

  /**
   * default brand config with assets and i18n processed using en-US
   */
  @computed((that: Brand<T, D>) => [that._defaultConfig])
  get defaultConfig() {
    return processI18n(this._defaultConfig);
  }

  /**
   * Generic brand config accessor that returns dynamic config if available, and defaults
   * to default config. The result is assets and i18n processed with current Locale.
   */
  @computed((that: Brand<T, D>) => [
    that._defaultConfig,
    that._dynamicConfig,
    that._deps.locale?.currentLocale,
    that._deps.locale?.defaultLocale,
  ])
  get brandConfig() {
    return processI18n(
      this._dynamicConfig ?? this._defaultConfig,
      this._deps.locale?.currentLocale ?? DEFAULT_LOCALE,
      this._deps.locale?.defaultLocale ?? DEFAULT_LOCALE,
    );
  }

  get prefix() {
    return this._deps.prefix ?? this._prefix;
  }

  get id() {
    return this.brandConfig.id;
  }

  get code() {
    return this.brandConfig.code;
  }

  get name() {
    return this.brandConfig.name;
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
