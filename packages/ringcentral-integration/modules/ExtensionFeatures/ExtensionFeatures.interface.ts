import {
  DataFetcherV2ConsumerBaseDeps,
  DataSourceBaseProps,
} from '../DataFetcherV2';
import { Subscription } from '../SubscriptionV2';
import { TabManager } from '../TabManagerV2';

export interface ExtensionFeaturesOptions extends DataSourceBaseProps {
  CRMFlag?: string;
}

export interface Deps extends DataFetcherV2ConsumerBaseDeps {
  client: any;
  subscription?: Subscription;
  tabManager?: TabManager;
  extensionFeaturesOptions?: ExtensionFeaturesOptions;
}
