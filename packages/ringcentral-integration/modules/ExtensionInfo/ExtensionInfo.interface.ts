import { Alert } from '../Alert';
import { Auth } from '../Auth';
import {
  DataFetcherV2ConsumerBaseDeps,
  DataSourceBaseProps,
} from '../DataFetcherV2';
import { ExtensionFeatures } from '../ExtensionFeatures';
import { Subscription } from '../Subscription';
import { TabManager } from '../TabManager';

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
