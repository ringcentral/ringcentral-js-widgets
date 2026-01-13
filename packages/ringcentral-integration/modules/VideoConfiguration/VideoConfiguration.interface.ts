import type { AppFeatures } from '../AppFeatures';
import type {
  DataFetcherV2ConsumerBaseDeps,
  DataSourceBaseProps,
} from '../DataFetcherV2';
import type { TabManager } from '../TabManager';
import type { WebSocketSubscription as Subscription } from '../WebSocketSubscription';

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
