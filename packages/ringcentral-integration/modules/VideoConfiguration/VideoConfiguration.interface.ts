import { AppFeatures } from '../AppFeatures';
import {
  DataFetcherV2ConsumerBaseDeps,
  DataSourceBaseProps,
} from '../DataFetcherV2';
import { Subscription } from '../SubscriptionV2';
import { TabManager } from '../TabManager';

export interface VideoConfigurationOptions extends DataSourceBaseProps {
  fetchDelay?: number;
}

export interface Deps extends DataFetcherV2ConsumerBaseDeps {
  client: any;
  appFeatures: AppFeatures;
  subscription: Subscription;
  tabManager: TabManager;
  videoConfigurationOptions?: VideoConfigurationOptions;
}
