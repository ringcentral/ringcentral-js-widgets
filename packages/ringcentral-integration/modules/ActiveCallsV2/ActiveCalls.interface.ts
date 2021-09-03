import {
  DataFetcherV2ConsumerBaseDeps,
  DataSourceBaseProps,
} from '../DataFetcherV2';
import { AppFeatures } from '../AppFeatures';
import { Subscription } from '../SubscriptionV2';
import { TabManager } from '../TabManager';

export interface ActiveCallsOptions extends DataSourceBaseProps {
  fetchDelay?: number;
}

export interface Deps extends DataFetcherV2ConsumerBaseDeps {
  client: any;
  appFeatures: AppFeatures;
  subscription: Subscription;
  tabManager?: TabManager;
  activeCallsOptions?: ActiveCallsOptions;
}
