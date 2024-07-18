import type ITimezone from '@rc-ex/core/lib/definitions/GetTimezoneInfoResponse';
import type ITimezoneList from '@rc-ex/core/lib/definitions/GetTimezoneListResponse';
import {
  action,
  computed,
  RcModuleV2,
  state,
  storage,
} from '@ringcentral-integration/core';

import { Module } from '../../lib/di';
import { proxify } from '../../lib/proxy/proxify';

import type { Deps } from './Timezone.interface';

const CACHE_TTL = 60 * 60e3;

@Module({
  name: 'Timezone',
  deps: ['Client', 'Storage', { dep: 'TimezoneOptions', optional: true }],
})
export class Timezone<T extends Deps = Deps> extends RcModuleV2<T> {
  protected _localeTimezone?: ITimezone;

  constructor(deps: T) {
    super({
      deps,
      enableCache: true,
      storageKey: 'Timezone',
    });
  }

  @storage
  @state
  timezones: ITimezone[] = [];

  @storage
  @state
  cacheExpiredIn: number | null = null;

  @action
  protected _updateCacheExpiredIn() {
    this.cacheExpiredIn = new Date().getTime() + CACHE_TTL;
  }

  @action
  protected _updateTimezones(timezones: ITimezone[]) {
    this.timezones = timezones;
  }

  protected override async onInit() {
    if (this.shouldUpdateTimezones) {
      await this._initTimezones();
      this.updateCacheExpiredIn();
    }
  }

  @proxify
  protected async _initTimezones() {
    const { records = [] }: ITimezoneList = await this._deps.client
      .dictionary()
      .timezone()
      .list();
    this.updateTimezones(records);
  }

  @proxify
  async updateTimezones(timezones: ITimezone[]) {
    this._updateTimezones(timezones);
  }

  @proxify
  async updateCacheExpiredIn() {
    this._updateCacheExpiredIn();
  }

  @computed(({ _localeTimezone, timezones }: Timezone) => [
    _localeTimezone,
    timezones,
  ])
  get localeTimezone() {
    if (!this._localeTimezone) {
      const bias = String(-new Date().getTimezoneOffset());
      this._localeTimezone = this.timezones.find(
        (timezone) => timezone.bias === bias,
      );
    }
    return this._localeTimezone;
  }

  get shouldUpdateTimezones() {
    return !this.cacheExpiredIn || this.cacheExpiredIn < Date.now();
  }
}
