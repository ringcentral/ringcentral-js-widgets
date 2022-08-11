import { Storage } from '../Storage';

export interface TimezoneOptions {}

export interface Deps {
  client: any;
  storage: Storage;
  timezoneOptions?: TimezoneOptions;
}
