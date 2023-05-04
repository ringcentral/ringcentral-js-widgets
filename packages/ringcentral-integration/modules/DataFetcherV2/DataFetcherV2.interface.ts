import { Auth } from '../Auth';
import { SleepDetector } from '../SleepDetector';
import { Storage } from '../Storage';
import { TabManager } from '../TabManager';

export interface DataFetcherV2Options {
  //
}

export interface Deps {
  auth: Auth;
  sleepDetector: SleepDetector;
  storage: Storage;
  tabManager?: TabManager;
  dataFetcherV2Options?: DataFetcherV2Options;
}

export interface DataSourceBaseProps {
  ttl?: number;
  disableCache?: boolean;
  polling?: boolean;
  timeToRetry?: number;
  retryIntervals?: number[];
  pollingInterval?: number;
}

export interface DataSourceProps<T> extends DataSourceBaseProps {
  key: string;
  cleanOnReset?: boolean;
  fetchFunction(): Promise<T>;
  readyCheckFunction?(): boolean;
  permissionCheckFunction?(): boolean;
}
