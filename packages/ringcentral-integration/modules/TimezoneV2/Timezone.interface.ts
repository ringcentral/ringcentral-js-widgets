import { Auth } from '../AuthV2';
import { Storage } from '../StorageV2';

export interface TimezoneOptions {}

export interface Deps {
  client: any;
  storage: Storage;
  timezoneOptions?: TimezoneOptions;
}
