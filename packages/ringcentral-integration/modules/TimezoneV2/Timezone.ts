import {
  GetTimezoneListResponse as ITimezoneList,
  GetTimezoneInfoResponse as ITimezone,
} from '@rc-ex/core/definitions';
import {
  action,
  RcModuleV2,
  state,
  storage,
  computed,
} from '@ringcentral-integration/core';
import { Module } from '../../lib/di';
import proxify from '../../lib/proxy/proxify';
import { Deps } from './Timezone.interface';

const CACHE_TTL = 60 * 60e3;

@Module({
  name: 'Timezone',
  deps: ['Client', 'Storage', { dep: 'TimezoneOptions', optional: true }],
})
export class Timezone extends RcModuleV2<Deps> {
  protected _localeTimezone: ITimezone;

  constructor(deps: Deps) {
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
  cacheExpiredIn: number = null;

  @action
  protected _updateCacheExpiredIn() {
    this.cacheExpiredIn = new Date().getTime() + CACHE_TTL;
  }

  @action
  protected _updateTimezones(timezones: ITimezone[]) {
    this.timezones = timezones;
  }

  protected async onInit() {
    if (this.shouldUpdateTimezones) {
      await this._initTimezones();
      this.updateCacheExpiredIn();
    }
  }

  @proxify
  protected async _initTimezones() {
    const {
      records = [],
    }: ITimezoneList = await this._deps.client.dictionary().timezone().list();
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
