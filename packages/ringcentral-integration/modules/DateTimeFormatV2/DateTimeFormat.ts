import { RcModuleV2 } from '@ringcentral-integration/core';
import { Module } from '../../lib/di';
import getIntlDateTimeFormatter, {
  DateTimeFormatter,
} from '../../lib/getIntlDateTimeFormatter';
import {
  AddFormatterOptions,
  Deps,
  FormatDateTimeOptions,
  FormatOptions,
} from './DateTimeFormat.interface';

@Module({
  name: 'DateTimeFormat',
  deps: ['Locale', { dep: 'DateTimeFormatOptions', optional: true }],
})
export class DateTimeFormat extends RcModuleV2<Deps> {
  public _formatters: Record<string, DateTimeFormatter> = {};
  protected _defaultFormatter?: DateTimeFormatter;

  constructor(deps: Deps) {
    super({
      deps,
    });
  }

  onInit() {
    if (!this._defaultFormatter) {
      this._defaultFormatter = getIntlDateTimeFormatter();
    }
  }

  onReset() {
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
    locale = this._deps.locale.currentLocale,
    type,
  }: FormatDateTimeOptions) {
    if (name && typeof this._formatters[name] === 'function') {
      return this._formatters[name]({
        utcTimestamp,
        locale,
        type,
      });
    }
    return this._defaultFormatter({
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
