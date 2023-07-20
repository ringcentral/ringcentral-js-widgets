import type { Alert } from '../Alert';
import type { Auth } from '../Auth';
import type {
  DataFetcherV2ConsumerBaseDeps,
  DataSourceBaseProps,
} from '../DataFetcherV2';
import type { Subscription } from '../Subscription';
import type { TabManager } from '../TabManager';

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
