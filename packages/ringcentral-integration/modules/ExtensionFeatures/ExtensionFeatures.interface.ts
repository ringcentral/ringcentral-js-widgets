import type { Alert } from '../Alert';
import type { Auth } from '../Auth';
import type {
  DataFetcherV2ConsumerBaseDeps,
  DataSourceBaseProps,
} from '../DataFetcherV2';
import type { TabManager } from '../TabManager';
import type { WebSocketSubscription as Subscription } from '../WebSocketSubscription';

export interface ExtensionFeaturesOptions extends DataSourceBaseProps {
  CRMFlag?: string;
}

export interface Deps extends DataFetcherV2ConsumerBaseDeps {
  auth: Auth;
  alert: Alert;
  client: any;
  subscription?: Subscription;
  tabManager?: TabManager;
  extensionFeaturesOptions?: ExtensionFeaturesOptions;
}
