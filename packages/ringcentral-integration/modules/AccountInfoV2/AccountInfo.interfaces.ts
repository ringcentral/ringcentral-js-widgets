import { Alert } from '../AlertV2';
import { Auth } from '../AuthV2';
import {
  DataFetcherV2ConsumerBaseDeps,
  DataSourceBaseProps,
} from '../DataFetcherV2';
import { ExtensionFeatures } from '../ExtensionFeatures';

export interface Deps extends DataFetcherV2ConsumerBaseDeps {
  alert: Alert;
  auth: Auth;
  client: any;
  extensionFeatures: ExtensionFeatures;
  accountInfoOptions?: AccountInfoOptions;
}

export interface AccountInfoOptions extends DataSourceBaseProps {}
