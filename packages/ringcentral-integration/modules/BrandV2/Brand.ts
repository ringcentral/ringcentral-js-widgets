import { RcModuleV2 } from '@ringcentral-integration/core';
import { camelcase } from './brandHelper';

import { Module } from '../../lib/di';
import { Deps } from './Brand.interface';

@Module({
  name: 'Brand',
  deps: ['BrandConfig', { dep: 'Prefix', optional: true }],
})
export class Brand extends RcModuleV2<Deps> {
  protected _prefix: string = null;
  constructor(deps: Deps) {
    super({
      deps,
    });
    this._prefix = `${this._deps.brandConfig.brandCode}-${camelcase(
      this._deps.brandConfig.application ?? '',
    )}`;
  }

  get prefix() {
    return this._deps.prefix ?? this._prefix;
  }

  get id() {
    return this._deps.brandConfig.id;
  }

  get code() {
    return this._deps.brandConfig.code;
  }

  get name() {
    return this._deps.brandConfig.name;
  }

  get fullName() {
    return this._deps.brandConfig.fullName ?? this._deps.brandConfig.name;
  }

  get shortName() {
    return this._deps.brandConfig.shortName ?? this._deps.brandConfig.name;
  }

  get application() {
    return this._deps.brandConfig.application;
  }

  get appName() {
    return this._deps.brandConfig.appName;
  }

  get brandConfig() {
    return this._deps.brandConfig;
  }
}
