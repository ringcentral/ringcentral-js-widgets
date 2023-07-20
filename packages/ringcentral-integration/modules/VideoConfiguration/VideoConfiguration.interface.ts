import type { AppFeatures } from '../AppFeatures';
import type {
  DataFetcherV2ConsumerBaseDeps,
  DataSourceBaseProps,
} from '../DataFetcherV2';
import type { Subscription } from '../Subscription';
import type { TabManager } from '../TabManager';

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
