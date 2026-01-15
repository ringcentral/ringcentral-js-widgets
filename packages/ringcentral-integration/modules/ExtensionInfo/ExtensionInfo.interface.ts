import type { Alert } from '../Alert';
import type { Auth } from '../Auth';
import type {
  DataFetcherV2ConsumerBaseDeps,
  DataSourceBaseProps,
} from '../DataFetcherV2';
import type { ExtensionFeatures } from '../ExtensionFeatures';
import type { TabManager } from '../TabManager';
import type { WebSocketSubscription as Subscription } from '../WebSocketSubscription';

export interface ExtensionInfoOptions extends DataSourceBaseProps {
  isMultipleSiteEnabled?: boolean;
}

export interface Deps extends DataFetcherV2ConsumerBaseDeps {
  auth: Auth;
  client: any;
  subscription?: Subscription;
  alert: Alert;
  tabManager?: TabManager;
  extensionInfoOptions?: ExtensionInfoOptions;
  extensionFeatures: ExtensionFeatures;
}

export interface RemappedServiceInfo {
  featureName: string;
  enabled: boolean;
  reason?: string;
}
