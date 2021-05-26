import {
  DataFetcherV2ConsumerBaseDeps,
  DataSourceBaseProps,
} from '../DataFetcherV2';
import { ExtensionFeatures } from '../ExtensionFeatures';
import { Subscription } from '../SubscriptionV2';
import { TabManager } from '../TabManagerV2';

export interface ActiveCallsOptions extends DataSourceBaseProps {
  fetchDelay?: number;
}

export interface Deps extends DataFetcherV2ConsumerBaseDeps {
  client: any;
  extensionFeatures: ExtensionFeatures;
  subscription: Subscription;
  tabManager?: TabManager;
  activeCallsOptions?: ActiveCallsOptions;
}
