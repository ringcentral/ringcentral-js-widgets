import { Alert } from '../Alert';
import { Auth } from '../Auth';
import {
  DataFetcherV2ConsumerBaseDeps,
  DataSourceBaseProps,
} from '../DataFetcherV2';
import { Subscription } from '../Subscription';
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
