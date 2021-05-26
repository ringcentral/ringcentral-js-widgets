import { Alert } from '../AlertV2';
import { Auth } from '../AuthV2';
import {
  DataFetcherV2ConsumerBaseDeps,
  DataSourceBaseProps,
} from '../DataFetcherV2';
import { ExtensionFeatures } from '../ExtensionFeatures';
import { Subscription } from '../SubscriptionV2';
import { TabManager } from '../TabManagerV2';

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
