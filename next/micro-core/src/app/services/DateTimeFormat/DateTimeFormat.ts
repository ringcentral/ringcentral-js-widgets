import type { DateTimeFormatter } from '@ringcentral-integration/commons/lib/getIntlDateTimeFormatter';
import getIntlDateTimeFormatter from '@ringcentral-integration/commons/lib/getIntlDateTimeFormatter';
import {
  injectable,
  optional,
  PortManager,
  RcModule,
  subscribe,
} from '@ringcentral-integration/next-core';

import { Locale } from '../Locale';

import type {
  AddFormatterOptions,
  DateTimeFormatOptions,
  FormatDateTimeOptions,
  FormatOptions,
} from './DateTimeFormat.interface';

@injectable({
  name: 'DateTimeFormat',
})
export class DateTimeFormat extends RcModule {
  public _formatters: Record<string, DateTimeFormatter> = {};
  protected _defaultFormatter?: DateTimeFormatter;

  constructor(
    protected _locale: Locale,
    protected _portManager: PortManager,
    @optional('DateTimeFormatOptions')
    protected _dateTimeFormatOptions?: DateTimeFormatOptions,
  ) {
    super();
    this._portManager.onClient(() => {
      return subscribe(this, () => {
        this.setDefaultFormatter();
      });
    });
  }

  setDefaultFormatter() {
    if (!this._defaultFormatter) {
      this._defaultFormatter = getIntlDateTimeFormatter();
    }
  }

  override onInit() {
    this.setDefaultFormatter();
  }

  override onReset() {
    this._formatters = {};
  }

  addFormatter({ name, formatter }: AddFormatterOptions) {
    if (!name) {
      throw new Error('`name` property cannot be empty.');
    }
    if (this._formatters[name]) {
      throw new Error(
        `A formatter with the same name: ${name} already exists.`,
      );
    }
    if (typeof formatter !== 'function') {
      throw new Error('formatter must be a function.');
    }
    this._formatters[name] = formatter;
  }

  formatDateTime({
    name,
    utcTimestamp,
    locale = this._locale.currentLocale,
    type,
  }: Partial<FormatDateTimeOptions>) {
    if (name && typeof this._formatters[name] === 'function') {
      return this._formatters[name]({
        utcTimestamp,
        locale,
        type,
      });
    }
    return this._defaultFormatter?.({
      utcTimestamp,
      locale,
      type,
    });
  }

  formatDate({ name, utcTimestamp, locale }: FormatOptions) {
    return this.formatDateTime({
      name,
      utcTimestamp,
      locale,
      type: 'date',
    });
  }

  formatTime({ name, utcTimestamp, locale }: FormatOptions) {
    return this.formatDateTime({
      name,
      utcTimestamp,
      locale,
      type: 'time',
    });
  }
}
