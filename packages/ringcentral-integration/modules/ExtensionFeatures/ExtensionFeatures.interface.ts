import { Alert } from '../Alert';
import { Auth } from '../AuthV2';
import {
  DataFetcherV2ConsumerBaseDeps,
  DataSourceBaseProps,
} from '../DataFetcherV2';
import { Subscription } from '../SubscriptionV2';
import { TabManager } from '../TabManager';

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
