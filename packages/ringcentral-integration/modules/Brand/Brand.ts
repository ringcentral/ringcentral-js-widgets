import { action, RcModuleV2, state } from '@ringcentral-integration/core';
import { camelCase } from '../../lib/camelCase';

import { Module } from '../../lib/di';
import { BrandConfig, Deps } from './Brand.interface';

@Module({
  name: 'Brand',
  deps: ['BrandConfig', { dep: 'Prefix', optional: true }],
})
export class Brand<
  T extends BrandConfig = BrandConfig,
  D extends Deps<T> = Deps<T>
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

  get defaultConfig() {
    return this._deps.brandConfig;
  }

  get brandConfig() {
    return this.dynamicConfig ?? this.defaultConfig;
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

  get fullName() {
    return this.brandConfig.fullName ?? this.brandConfig.name;
  }

  get shortName() {
    return this.brandConfig.shortName ?? this.brandConfig.name;
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

  get appName() {
    return this.brandConfig.appName;
  }

  get rcvTeleconference() {
    return this.brandConfig.rcvTeleconference;
  }
}
