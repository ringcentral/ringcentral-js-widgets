import { injectable, RcModule } from '@ringcentral-integration/next-core';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import type { ITimezone } from './timezones';
import { STATIC_TIMEZONE_LIST, TIMEZONE_UTC } from './timezones';

dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * StaticTimezoneService
 *
 * A standalone shared timezone service that uses static timezone data.
 * This service does not depend on Auth module and provides timezone utilities
 * based on the static timezone definitions from timezones.ts
 *
 * All timezone data is statically defined and does not require API calls or authentication.
 */
@injectable({
  name: 'StaticTimezoneService',
})
export class StaticTimezoneService extends RcModule {
  private _findTimezoneByNameOrUtc(
    timezoneName?: string | null,
  ): ITimezone | undefined {
    if (!timezoneName) {
      return undefined;
    }

    return (
      STATIC_TIMEZONE_LIST.find((tz) => tz.name === timezoneName) ||
      STATIC_TIMEZONE_LIST.find((tz) => tz.utc.includes(timezoneName))
    );
  }

  get timezonesList(): ITimezone[] {
    return STATIC_TIMEZONE_LIST;
  }

  get defaultTimezone(): ITimezone {
    return TIMEZONE_UTC;
  }

  /**
   * Find a supported system timezone from browser settings without applying fallback.
   *
   * @returns Matched timezone object or undefined if the browser timezone
   * is unavailable or unsupported by the static timezone list
   */
  findSystemTimezone(): ITimezone | undefined {
    try {
      const systemTimezoneName = dayjs.tz.guess();
      if (!systemTimezoneName) {
        return undefined;
      }

      return this._findTimezoneByNameOrUtc(systemTimezoneName);
    } catch (error) {
      this.logger.warn('Failed to find system timezone', error);
      return undefined;
    }
  }

  /**
   * Get system timezone from browser settings
   * Matches the system timezone name with the available static timezone list
   *
   * @param timezones - Optional timezone array to search in. Defaults to STATIC_TIMEZONE_LIST
   * @returns Matched timezone object or undefined if not found
   */
  getSystemTimezone(): ITimezone {
    return this.findSystemTimezone() || TIMEZONE_UTC;
  }

  /**
   * Find timezone by ID from static data
   * @param id - Timezone ID
   * @returns Timezone object or undefined if not found
   */
  getTimezoneById(id: string): ITimezone | undefined {
    return STATIC_TIMEZONE_LIST.find((tz) => tz.id === id);
  }

  /**
   * Find timezone by name from static data
   * @param name - Timezone name (e.g., 'America/New_York')
   * @returns Timezone object or undefined if not found
   */
  getTimezoneByName(name: string): ITimezone | undefined {
    return this._findTimezoneByNameOrUtc(name);
  }
}
