import type {
  DateTimeFormatter,
  DateTimeFormatterParams,
} from '@ringcentral-integration/commons/lib/getIntlDateTimeFormatter';

interface NameOptions {
  name?: string;
}

export interface AddFormatterOptions extends NameOptions {
  formatter: DateTimeFormatter;
}

export type FormatDateTimeOptions = NameOptions & DateTimeFormatterParams;

export type FormatOptions = Pick<
  FormatDateTimeOptions,
  Exclude<keyof FormatDateTimeOptions, 'type'>
>;

export interface DateTimeFormatOptions {}
