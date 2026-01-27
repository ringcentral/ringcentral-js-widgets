import type ITimezone from '@rc-ex/core/lib/definitions/GetTimezoneInfoResponse';
import type ITimezoneList from '@rc-ex/core/lib/definitions/GetTimezoneListResponse';
import {
  action,
  computed,
  injectable,
  RcModule,
  state,
  storage,
  StoragePlugin,
} from '@ringcentral-integration/next-core';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import { Client } from '../Client';
import { ExtensionInfo } from '../ExtensionInfo';

import { DEFAULT_TIMEZONE } from './constants';

const CACHE_TTL = 60 * 60e3;

dayjs.extend(utc);
dayjs.extend(timezone);

@injectable({
  name: 'Timezone',
})
export class Timezone extends RcModule {
  constructor(
    private _client: Client,
    private _extensionInfo: ExtensionInfo,
    private _storage: StoragePlugin,
  ) {
    super();
    this._storage.enable(this);
  }

  @storage
  @state
  timezones: ITimezone[] = [];

  @storage
  @state
  cacheExpiredIn: number | null = null;

  @action
  private _updateTimezones(timezones: ITimezone[]) {
    this.timezones = timezones;
    this.cacheExpiredIn = new Date().getTime() + CACHE_TTL;
  }

  override async onInit() {
    if (this.shouldUpdateTimezones) {
      await this._initTimezones();
    }
  }

  private async _initTimezones() {
    const { records = [] }: ITimezoneList = await this._client
      .dictionary()
      .timezone()
      .list();
    this._updateTimezones(records);
  }

  get shouldUpdateTimezones() {
    return !this.cacheExpiredIn || this.cacheExpiredIn < Date.now();
  }

  /**
   * Gets the user's timezone.
   * The function follows this priority order:
   * 1. First, try to get the timezone from the system's computer settings.
   * 2. If the system timezone is not available in the supported list of timezones (rc tz),
   *    then fallback to the timezone set in the user's settings.
   *
   *  The user's timezone, either from the system or from their settings.
   */
  getUserTimezone() {
    const result =
      this.getSystemTimezone() ||
      this.getUserSettingTimezone() ||
      DEFAULT_TIMEZONE;

    if (result.id) return result;

    this.logger.info('timezone id is empty');

    return DEFAULT_TIMEZONE;
  }

  getUserSettingTimezone(timezones = this.timezones) {
    const result = timezones.find(
      (timezone) =>
        timezone.name ===
        this._extensionInfo?.data?.regionalSettings?.timezone?.name,
    );
    return result;
  }

  getSystemTimezone(timezones = this.timezones): ITimezone | undefined {
    const systemTimezoneName = dayjs.tz.guess();
    const systemTimezone = timezones.find(
      (timezone) => timezone.name === systemTimezoneName,
    );
    return systemTimezone;
  }
}
