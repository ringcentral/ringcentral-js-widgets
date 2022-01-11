import {
  action,
  computed,
  RcModuleV2,
  state,
} from '@ringcentral-integration/core';
import { DEFAULT_LOCALE } from '@ringcentral-integration/i18n';

import { camelCase } from '../../lib/camelCase';
import { Module } from '../../lib/di';
import { processI18n } from '../../lib/processI18n';
import { Deps } from './Brand.interface';
import { BrandConfig } from './BrandConfig.interface';
import { processAssets } from './helpers';

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
  protected _prefix: string = null;
  constructor(deps: D) {
    super({
      deps,
    });
    this._prefix = `${this._deps.brandConfig.code}-${camelCase(
      this._deps.brandConfig.application ?? '',
    )}`;
  }

  @state
  dynamicConfig: T = null;

  @action
  setDynamicConfig(config: T) {
    this.dynamicConfig = config;
  }

  @computed((that: Brand<T, D>) => [that._deps.brandConfig])
  get defaultConfig() {
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

  @computed(({ dynamicConfig, _deps: { locale } }: Brand<T, D>) => [
    dynamicConfig,
    locale?.currentLocale,
    locale?.defaultLocale,
  ])
  get brandConfig() {
    return processI18n(
      this.dynamicConfig ?? this.defaultConfig,
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
